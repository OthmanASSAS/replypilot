// filepath:docs/ai/INVARIANTS.md

# Invariants (non négociables)

- TypeScript strict + ESLint + Prettier.
- Pas de secrets en clair → uniquement via variables d’environnement.
- Sécurité : cookies HttpOnly, validation Zod, auth OAuth Shopify.
- Respect des contrats API (Shopify, internes).
- Tests gardiens obligatoires :
  - Auth Shopify
  - Génération correcte de réponse IA
  - Sauvegarde en DB
  - Affichage sur dashboard
- Accessibilité minimale (a11y).
- Pas de breaking change public sans :
  - Mise à jour des tests
  - Note dans CHANGELOG_AI.md