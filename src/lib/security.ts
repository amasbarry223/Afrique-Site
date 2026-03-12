/**
 * Utilitaires de sécurité pour l'application IAS
 * Ces fonctions protègent contre les attaques courantes
 */

/**
 * Sanitize une chaîne de caractères pour affichage HTML sécurisé
 * Protège contre les attaques XSS
 */
export function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#96;',
    '=': '&#x3D;',
  };
  
  return str.replace(/[&<>"'`=/]/g, (char) => htmlEscapes[char] || char);
}

/**
 * Retire toutes les balises HTML d'une chaîne
 */
export function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Sanitize une URL pour éviter les injections javascript:
 */
export function sanitizeUrl(url: string): string | null {
  // Liste blanche des protocoles autorisés
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  
  try {
    const parsedUrl = new URL(url, 'http://localhost');
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      return null;
    }
    return parsedUrl.href;
  } catch {
    return null;
  }
}

/**
 * Valide et sanitize un email
 */
export function sanitizeEmail(email: string): string | null {
  const sanitized = email.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(sanitized) || sanitized.length > 255) {
    return null;
  }
  
  return sanitized;
}

/**
 * Valide un numéro de téléphone international
 */
export function sanitizePhone(phone: string): string | null {
  // Ne garder que les caractères valides
  const cleaned = phone.replace(/[^\d\s\-+()]/g, '').trim();
  
  // Vérifier la longueur (8-20 caractères utiles)
  const digitsOnly = cleaned.replace(/\D/g, '');
  if (digitsOnly.length < 8 || digitsOnly.length > 20) {
    return null;
  }
  
  return cleaned;
}

/**
 * Génère un token CSRF
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time string comparison (protection timing attacks)
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Tronque une chaîne de manière sécurisée
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Détecte si une chaîne contient du contenu potentiellement malveillant
 */
export function detectMaliciousContent(str: string): {
  isMalicious: boolean;
  patterns: string[];
} {
  const patterns: string[] = [];
  
  // Détection de scripts
  if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(str)) {
    patterns.push('script_tag');
  }
  
  // Détection d'event handlers
  if (/on\w+\s*=/gi.test(str)) {
    patterns.push('event_handler');
  }
  
  // Détection de javascript: URLs
  if (/javascript\s*:/gi.test(str)) {
    patterns.push('javascript_url');
  }
  
  // Détection de data: URLs (potentiellement malveillant)
  if (/data\s*:\s*text\/html/gi.test(str)) {
    patterns.push('data_url');
  }
  
  // Détection d'expression SQL basique
  if (/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)/gi.test(str)) {
    patterns.push('sql_keywords');
  }
  
  return {
    isMalicious: patterns.length > 0,
    patterns,
  };
}

/**
 * Crée un identifiant unique sécurisé
 */
export function generateSecureId(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join('');
}

/**
 * Rate limiter simple pour le frontend
 */
export class ClientRateLimiter {
  private attempts: number[] = [];
  private maxAttempts: number;
  private windowMs: number;
  
  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }
  
  canProceed(): boolean {
    const now = Date.now();
    this.attempts = this.attempts.filter((time) => now - time < this.windowMs);
    return this.attempts.length < this.maxAttempts;
  }
  
  recordAttempt(): void {
    this.attempts.push(Date.now());
  }
  
  getRemainingTime(): number {
    if (this.attempts.length === 0) return 0;
    const oldest = Math.min(...this.attempts);
    return Math.max(0, this.windowMs - (Date.now() - oldest));
  }
}
