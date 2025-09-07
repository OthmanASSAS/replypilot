// filepath:docs/ai/TEST_STRATEGY.md

# Stratégie de test - Site Analyzer

## Unit Tests Ultra-Rapides (Vitest) ⚡ 1.15s
- **Fonctions utilitaires**: URL validation, helpers
- **Services**: Analyse de sites, scraping d'avis
- **API routes mockées**: `/api/analyze`, `/api/report/[id]`
- **Performance**: Mock complet au lieu d'exécution réelle de Puppeteer

## Intégration (Vitest)
- ~~API routes avec Puppeteer réel~~ → Remplacé par mocks rapides
- Base de données avec Prisma (SQLite local)
- Validation des structures de données

## React Components (RTL)
- **Composants critiques**: 
  - `Home` (formulaire d'analyse)
  - `ReportPage` (affichage des résultats)
- **Avec**: jsdom + jest-dom + React mocks
- **Features testées**: Navigation, affichage des avis scrapés

## E2E (Playwright) - À venir
- 1 smoke test par flow critique :
  - Soumission URL d'analyse
  - Scraping des avis Loox iframe
  - Génération et affichage du rapport

## Tests de Performance
- **Scraping Loox iframe**: 20 avis extraits en <60s
- **Tests unitaires**: 25 tests en 1.15s (vs 15s+ avant)
- **Optimisation**: Mock des API calls lourdes

## Couverture actuelle
- ✅ **Unit**: 25 tests - Validation, API mocking, composants
- ✅ **Scraping**: Tests des sélecteurs multiples Loox
- ✅ **Error handling**: Gestion des timeouts, erreurs réseau
- ⏳ **E2E**: À implémenter pour validation end-to-end

## Architecture de test optimisée
```typescript
// AVANT: Tests lents avec Puppeteer réel
vi.mock("puppeteer", () => ({ default: { launch: vi.fn() }}))

// APRÈS: Mock complet de l'API route
vi.mock("./route", () => ({ POST: vi.fn(), GET: vi.fn() }))
mockPOST.mockResolvedValue({ status: 200, json: () => data })
```