// filepath:docs/ai/ARCHITECTURE.md

# Architecture

## Vue d’ensemble
- Frontend : Next.js (App Router) + Tailwind + shadcn/ui
- Backend : Next.js API routes (ou server actions) + Prisma
- DB : SQLite (local, via Prisma) pour le développement. Cible : PostgreSQL (Supabase) en production.
- Auth : Shopify OAuth (connexion boutique)
- AI : Claude/Gemini pour générer réponses automatiques
- Tests : Vitest + RTL + Playwright

## Flux principal
1. Marchand connecte sa boutique via Shopify OAuth.
2. ReplyPilot récupère les avis via l’API Shopify.
3. Génération IA → propose une réponse personnalisée.
4. Réponse sauvegardée en DB (status : pending).
5. Admin peut valider/modifier/refuser → publication sur Shopify.

## Dossiers clés
- `src/app/api/*` → routes API (reviews, auth…)
- `src/components/*` → UI réutilisable
- `src/lib/prisma.ts` → accès DB
- `docs/ai/*` → contexte persistant IA

## Variables d’environnement (NOMS uniquement)
- DATABASE_URL
- SHOPIFY_CLIENT_ID
- SHOPIFY_CLIENT_SECRET
- NEXTAUTH_SECRET
- OPENAI/ANTHROPIC/GEMINI_KEY