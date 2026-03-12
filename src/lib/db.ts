import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Configuration Prisma sécurisée
 * - Logging désactivé en production
 * - Requêtes préparées (prévention SQL injection)
 */
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    // ✅ Désactiver les logs en production pour:
    // 1. Éviter la fuite de données sensibles
    // 2. Améliorer les performances
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn']
      : ['error'],
    // ✅ Activer les paramètres de sécurité
    // Les requêtes préparées sont activées par défaut avec Prisma
    // ce qui protège contre les injections SQL
  })

// ✅ Éviter les connexions multiples en développement (hot reload)
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

/**
 * Fonction utilitaire pour exécuter des requêtes de manière sécurisée
 * avec gestion d'erreur et timeout
 */
export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  options?: { timeout?: number }
): Promise<T> {
  const timeout = options?.timeout ?? 5000; // 5 secondes par défaut
  
  try {
    const result = await Promise.race([
      queryFn(),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), timeout)
      ),
    ]);
    return result;
  } catch (error) {
    // Log sécurisé sans données sensibles
    if (process.env.NODE_ENV === 'development') {
      console.error('[DB] Query error:', error);
    }
    throw error;
  }
}

/**
 * Fermer proprement la connexion à l'arrêt de l'application
 */
if (process.env.NODE_ENV === 'production') {
  process.on('beforeExit', async () => {
    await db.$disconnect();
  });
}
