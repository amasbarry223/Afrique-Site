import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware de sécurité pour IAS
 * Applique les protections de base sur toutes les requêtes
 */

// Routes qui nécessitent une protection particulière
const PROTECTED_ROUTES = ['/api/contact', '/api/auth'];
const PUBLIC_ROUTES = ['/', '/services', '/contact', '/mentions-legales', '/mission'];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;
  
  // Récupérer le User-Agent une seule fois
  const userAgent = request.headers.get('user-agent') || '';

  // ============================================
  // HEADERS DE SÉCURITÉ ADDITIONNELS
  // ============================================
  
  // Cache control pour les API
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
  }

  // ============================================
  // PROTECTION DES ROUTES PROTÉGÉES
  // ============================================
  
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    // Vérifier le Content-Type pour les POST
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        return new NextResponse(
          JSON.stringify({ error: 'Content-Type must be application/json' }),
          { 
            status: 415,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Vérifier la présence d'un User-Agent (bloque les bots basiques)
    if (!userAgent || userAgent.length < 10) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid request' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  // ============================================
  // DÉTECTION D'ATTAQUES BASIQUES
  // ============================================
  
  // Vérifier les paramètres de query suspects
  const searchParams = request.nextUrl.searchParams;
  for (const [key, value] of searchParams.entries()) {
    // Détection de path traversal
    if (value.includes('..') || value.includes('~')) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid parameter' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Détection de scripts dans les paramètres
    if (/<script|javascript:|on\w+=/i.test(value)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid parameter' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  // ============================================
  // LOGS DE SÉCURITÉ (en développement)
  // ============================================
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[MIDDLEWARE] ${request.method} ${pathname}`, {
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: userAgent.substring(0, 50),
    });
  }

  return response;
}

/**
 * Configuration du matcher
 * Applique le middleware à toutes les routes sauf les fichiers statiques
 */
export const config = {
  matcher: [
    /*
     * Matcher toutes les routes sauf:
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation images)
     * - favicon.ico
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
