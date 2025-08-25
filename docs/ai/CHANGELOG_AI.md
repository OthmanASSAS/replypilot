// filepath:docs/ai/CHANGELOG_AI.md

# Changelog IA

### 2025-08-25 (soir) – FIX & SEED
- **Fix**: Correction de la route `POST /api/reviews` qui empêchait l'import des CSV.
- **Fix**: Correction de l'import du client Prisma (`import { prisma } from ...`).
- **Feature**: Mise en place d'un script de seed (`prisma/seed.ts`) pour peupler la DB depuis un CSV.
- **Infra**: Ajout des scripts `db:seed` et configuration de `prisma.seed` dans `package.json`.

### 2025-08-25 – Bootstrap Contexte IA
- Création des fichiers docs/ai/*
- Définition des objectifs business & techniques
- Ajout des invariants, architecture, coding standards, stratégie de test
- Première tâche définie : corriger /api/reviews
