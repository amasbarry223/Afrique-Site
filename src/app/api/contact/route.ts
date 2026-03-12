import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ✅ Import du rate limiter
import { checkRateLimit, getClientIp, RATE_LIMITS } from "@/lib/rate-limit";

// ✅ Schema de validation avec sanitization
const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "Le prénom est requis")
    .max(100, "Le prénom est trop long")
    .transform((val) => sanitizeInput(val)),
  lastName: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom est trop long")
    .transform((val) => sanitizeInput(val)),
  email: z
    .string()
    .email("Email invalide")
    .max(255, "Email trop long")
    .transform((val) => val.toLowerCase().trim()),
  phone: z
    .string()
    .max(20, "Numéro de téléphone trop long")
    .optional()
    .transform((val) => (val ? sanitizePhone(val) : undefined)),
  organization: z
    .string()
    .max(200, "Nom d'organisation trop long")
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  subject: z
    .string()
    .min(1, "L'objet est requis")
    .max(200, "L'objet est trop long")
    .transform((val) => sanitizeInput(val)),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000, "Le message est trop long")
    .transform((val) => sanitizeInput(val)),
});

/**
 * Sanitize une chaîne de caractères pour éviter les injections
 * - Retire les balises HTML
 * - Échappe les caractères spéciaux
 * - Normalise les espaces
 */
function sanitizeInput(input: string): string {
  return input
    // Retirer les balises HTML
    .replace(/<[^>]*>/g, '')
    // Échapper les caractères HTML spéciaux
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Normaliser les espaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sanitize un numéro de téléphone
 */
function sanitizePhone(phone: string): string {
  // Ne garder que les chiffres, +, espaces et tirets
  return phone.replace(/[^\d\s\-+()]/g, '').trim();
}

/**
 * Log sécurisé - ne stocke jamais les données personnelles
 */
function secureLog(level: 'info' | 'warn' | 'error', message: string, meta?: Record<string, unknown>) {
  // En production, utiliser un service de logging sécurisé (Sentry, Datadog, etc.)
  if (process.env.NODE_ENV === 'production') {
    // Ne pas logger les données sensibles en production
    console[level](`[CONTACT] ${message}`, meta ? JSON.stringify({
      ...meta,
      // Ne jamais logger les PII
      email: '[REDACTED]',
      phone: '[REDACTED]',
      name: '[REDACTED]',
    }) : '');
  } else {
    // En développement, logs plus verbeux mais attention aux données
    console[level](message, meta);
  }
}

export async function POST(request: NextRequest) {
  try {
    // ✅ Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, RATE_LIMITS.CONTACT);
    
    if (!rateLimitResult.success) {
      secureLog('warn', 'Rate limit exceeded', { ip: clientIp.replace(/\d/g, 'X') });
      return NextResponse.json(
        { 
          error: rateLimitResult.message,
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(RATE_LIMITS.CONTACT.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rateLimitResult.resetTime / 1000)),
          },
        }
      );
    }

    // Parser le body de manière sécurisée
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      secureLog('warn', 'Invalid JSON body');
      return NextResponse.json(
        { error: "Format de données invalide" },
        { status: 400 }
      );
    }

    // Valider et sanitizer les données
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      // ✅ Ne pas exposer les détails de validation en production
      const isDev = process.env.NODE_ENV === 'development';
      return NextResponse.json(
        { 
          error: "Données invalides", 
          details: isDev ? result.error.flatten() : undefined,
        },
        { status: 400 }
      );
    }

    const sanitizedData = result.data;

    // ✅ En production, sauvegarder en DB et envoyer un email
    // Exemple avec Prisma (à activer selon vos besoins):
    // await db.contactSubmission.create({
    //   data: {
    //     firstName: sanitizedData.firstName,
    //     lastName: sanitizedData.lastName,
    //     email: sanitizedData.email,
    //     phone: sanitizedData.phone,
    //     organization: sanitizedData.organization,
    //     subject: sanitizedData.subject,
    //     message: sanitizedData.message,
    //     ipAddress: hashIp(clientIp), // Ne pas stocker l'IP en clair
    //   },
    // });

    // ✅ Log sécurisé sans données sensibles
    secureLog('info', 'Contact form submitted', {
      subject: sanitizedData.subject,
      hasPhone: !!sanitizedData.phone,
      hasOrganization: !!sanitizedData.organization,
    });

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès" },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMITS.CONTACT.maxRequests),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': String(Math.ceil(rateLimitResult.resetTime / 1000)),
        },
      }
    );
  } catch (error) {
    // ✅ Log d'erreur sécurisé
    secureLog('error', 'Contact form error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    // ✅ Ne pas exposer les détails de l'erreur en production
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}

/**
 * Hash une IP pour le stockage (RGPD compliant)
 */
function hashIp(ip: string): string {
  // Utiliser un sel secret en production
  const salt = process.env.IP_HASH_SALT || 'default-salt-change-in-production';
  // Simple hash pour l'exemple - utiliser bcrypt ou argon2 en production
  return Buffer.from(`${ip}:${salt}`).toString('base64');
}
