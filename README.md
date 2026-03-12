# Afrique-Site

Site web moderne pour Afrique, construit avec Next.js, TypeScript et Tailwind CSS.

## Stack

- **Next.js 16** – App Router
- **TypeScript** – Typage statique
- **Tailwind CSS 4** – Styles
- **shadcn/ui** – Composants UI
- **Prisma** – Base de données

## Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` – Serveur de développement (port 3000)
- `npm run build` – Build de production
- `npm run lint` – Vérification ESLint
- `npm run db:push` – Appliquer le schéma Prisma
- `npm run db:generate` – Générer le client Prisma

## Structure

```
src/
├── app/           # Pages et routes (App Router)
├── components/    # Composants React (layout, sections, ui)
├── constants/     # Constantes (navigation, couleurs)
├── data/         # Données (services, témoignages, FAQ)
├── hooks/        # Hooks React
├── lib/          # Utilitaires et config
└── types/        # Types TypeScript
```
