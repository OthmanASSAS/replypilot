// filepath:docs/ai/CHANGELOG_AI.md

# Changelog IA

### 2025-08-26 – SITE ANALYZER MVP COMPLET

- **Feature**: API `/api/analyze` avec scraping Puppeteer fonctionnel
- **Feature**: Utilisation de Chrome local pour meilleures performances
- **Feature**: Tests unitaires Vitest complets (21 tests passés)
- **Feature**: Helper functions exportées pour testing (`isValidUrl`, `generateAnalysisId`)
- **Tech**: Résolution des problèmes de mocking Puppeteer avec `vi.importMock()`
- **Doc**: Documentation technique complète dans `TECHNICAL_SOLUTIONS.md`

### 2025-08-25 (soir) – PUBLISH TO JUDGE.ME

- **Feature**: Implémentation de la publication des réponses directement sur Judge.me.
- **Feature**: Création d'un endpoint `POST /api/judgeme/reviews/[id]/reply` qui appelle l'API Judge.me.
- **Feature**: Mise à jour du front-end pour appeler le nouvel endpoint de publication.

### 2025-08-25 (soir) – JUDGE.ME API

- **Feature**: Connexion à l'API Judge.me pour récupérer les avis.
- **Feature**: Création d'un endpoint proxy `/api/judgeme/reviews` pour encapsuler l'appel à l'API externe.
- **Feature**: Création d'une page de test `/reviews` pour afficher les avis récupérés depuis Judge.me.

### 2025-08-25 (soir) – FIX & SEED

- **Fix**: Correction de la route `POST /api/reviews` qui empêchait l'import des CSV.
- **Fix**: Correction de l'import du client Prisma (`import { prisma } from ...`).
- **Feature**: Mise en place d'un script de seed (`prisma/seed.ts`) pour peupler la DB depuis un CSV.
- **Infra**: Ajout des scripts `db:seed` et configuration de `prisma.seed` dans `package.json`.

### 2025-08-25 – Bootstrap Contexte IA

- Création des fichiers docs/ai/\*
- Définition des objectifs business & techniques
- Ajout des invariants, architecture, coding standards, stratégie de test
- Première tâche définie : corriger /api/reviews
