// filepath:docs/ai/CURRENT_STATE.md

# État actuel - POST PIVOT

## 🔄 PIVOT EFFECTUÉ
**ReplyPilot** (réponses IA aux avis) → **Review Analytics** (analyse d'avis → rapports PDF payants)

## 🏗️ Infrastructure existante réutilisable
- **✅ Next.js 15 + TypeScript**: Base solide pour l'upload et l'analyse
- **✅ Prisma + DB**: Peut stocker analyses et rapports générés
- **✅ Groq API**: Réutilisable pour l'analyse sentiment et génération insights
- **✅ Tests unitaires**: Framework de test en place (21/21 passent) - **PUPPETEER MOCKS FIXÉS**
- **✅ Variables d'environnement**: Gestion sécurisée des API keys
- **✅ Puppeteer intégré**: Pour scraping et analyse de sites web

## 📋 À développer pour Review Analytics
- **📁 Interface upload CSV**: Drag & drop avec validation multi-formats
- **🔍 Parser CSV avancé**: Support Judge.me, Shopify, Google exports
- **🤖 Engine d'analyse IA**: Sentiment, keywords, themes, pain points
- **📄 Générateur PDF**: Rapports structurés avec insights business
- **💳 Intégration Stripe**: Paiement 19€/rapport avec checkout
- **👤 Dashboard utilisateur**: Historique et téléchargements

## ⚡ Prochaines étapes immédiates
1. **🎨 Refonte UI complète**: Page d'accueil → Upload CSV
2. **📁 Développer upload CSV**: Interface + validation
3. **💳 Setup Stripe**: Checkout + webhooks
4. **🤖 MVP analyse IA**: Sentiment analysis basique
5. **📄 Template PDF**: Structure rapport minimum viable

## 🎯 Objectif Phase 1
**MVP fonctionnel en 2 semaines** :
- Upload CSV ✅ Paiement ✅ Analyse IA basique ✅ PDF download

## 💰 Nouvelles décisions techniques
- **✅ Pricing**: 19€/rapport fixe (Stripe)
- **✅ Formats supportés**: CSV (Judge.me, Shopify, Google Reviews)
- **✅ Output**: PDF professionnel avec insights + actions
- **✅ Target**: PME e-commerce (50-500 avis/mois)

---

## 🐛 PROBLÈMES RÉSOLUS & SOLUTIONS

### **Problème Puppeteer Mock avec Vitest (Août 2025)**
**Erreur**: `ReferenceError: Cannot access 'mockPuppeteer' before initialization`

**Cause**: Vitest hoisting des mocks - les variables définies avant `vi.mock()` ne sont pas accessibles dans le factory

**❌ Code problématique**:
```typescript
const mockPuppeteer = { launch: vi.fn() };
vi.mock("puppeteer", () => ({ default: mockPuppeteer })); // ❌ Erreur hoisting
```

**✅ Solution finale**:
```typescript
// Mock simple sans références externes
vi.mock("puppeteer", () => ({
  default: { launch: vi.fn() },
}));

// Configuration dynamique dans les tests
beforeEach(async () => {
  const puppeteer = await vi.importMock("puppeteer") as any;
  puppeteer.default.launch.mockResolvedValue(mockBrowser);
});
```

**Résultat**: 21/21 tests passent ✅

### **Bonnes pratiques Vitest + Puppeteer**
1. **Jamais de variables** dans les factory mocks (hoisting)
2. **Utiliser `vi.importMock()`** pour configuration dynamique
3. **Mocks simples** dans le factory, configuration dans `beforeEach`
4. **Tests async** quand on utilise `vi.importMock()`
