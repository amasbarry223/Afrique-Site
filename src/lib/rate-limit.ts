/**
 * Rate Limiter pour protection contre les abus
 * Utilise un stockage en mémoire (pour production, utiliser Redis)
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitConfig {
  /** Nombre maximum de requêtes par fenêtre */
  maxRequests: number;
  /** Durée de la fenêtre en millisecondes */
  windowMs: number;
  /** Message d'erreur personnalisé */
  message?: string;
}

// Stockage en mémoire (pour production, utiliser Redis)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Nettoyage périodique des entrées expirées
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Nettoyage toutes les minutes

/**
 * Vérifie si une IP a dépassé la limite de requêtes
 * @param identifier - IP ou identifiant unique
 * @param config - Configuration du rate limit
 * @returns Objet avec le résultat et les headers
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): {
  success: boolean;
  remaining: number;
  resetTime: number;
  message?: string;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Si pas d'entrée ou fenêtre expirée, créer nouvelle entrée
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }

  // Si limite atteinte
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      message: config.message || "Trop de requêtes. Veuillez réessayer plus tard.",
    };
  }

  // Incrémenter le compteur
  entry.count++;
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Extrait l'IP du client de manière sécurisée
 * Gère les proxies et headers X-Forwarded-For
 */
export function getClientIp(request: Request): string {
  // Vérifier les headers de proxy (dans l'ordre de priorité)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Prendre la première IP (client original)
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    // Valider que c'est une IP valide
    const clientIp = ips[0];
    if (clientIp && isValidIp(clientIp)) {
      return clientIp;
    }
  }

  // Fallback sur X-Real-IP
  const realIp = request.headers.get('x-real-ip');
  if (realIp && isValidIp(realIp)) {
    return realIp;
  }

  // Dernier recours
  return 'unknown';
}

/**
 * Valide le format d'une adresse IP
 */
function isValidIp(ip: string): boolean {
  // IPv4
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6 simplifié
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * Configuration prédéfinie pour les endpoints courants
 */
export const RATE_LIMITS = {
  // Formulaire de contact: 5 requêtes / 15 minutes
  CONTACT: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    message: "Trop de messages envoyés. Veuillez attendre 15 minutes avant de réessayer.",
  },
  // API générale: 100 requêtes / minute
  API: {
    maxRequests: 100,
    windowMs: 60 * 1000,
  },
  // Authentification: 5 tentatives / 15 minutes
  AUTH: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    message: "Trop de tentatives de connexion. Compte temporairement bloqué.",
  },
} as const;
