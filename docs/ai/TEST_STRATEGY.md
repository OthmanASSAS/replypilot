// filepath:docs/ai/TEST_STRATEGY.md

# Stratégie de test

## Unit (Vitest)
- Fonctions utilitaires
- Services (ex: génération réponse IA)

## Intégration (Vitest)
- API routes (reviews, auth)
- DB avec Prisma

## React (RTL)
- Composants critiques : ReviewList, Dashboard
- Avec jsdom + jest-dom

## E2E (Playwright)
- 1 smoke test par flow critique :
  - Connexion Shopify
  - Affichage des avis
  - Génération d’une réponse IA

## Tests gardiens
- Auth Shopify
- Génération IA correcte
- Sauvegarde en DB
- Dashboard affiche bien les réponses