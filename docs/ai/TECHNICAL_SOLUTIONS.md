# Solutions Techniques - Site Analyzer

## 🧪 Testing & Mocking

### **Puppeteer + Vitest Mock Configuration**

**Problème fréquent** : Erreur `ReferenceError: Cannot access 'mockPuppeteer' before initialization`

**Cause** : Vitest hoisting - les mocks sont déplacés en haut du fichier, mais les variables sont dans leur position originale.

**Solution pattern** :

```typescript
// ❌ NE PAS FAIRE - Variables dans factory mock
const mockPuppeteer = { launch: vi.fn() };
vi.mock("puppeteer", () => ({ default: mockPuppeteer }));

// ✅ FAIRE - Factory simple + configuration dynamique
vi.mock("puppeteer", () => ({
  default: { launch: vi.fn() },
}));

describe("Tests", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Configuration dynamique des mocks
    const puppeteer = await vi.importMock("puppeteer") as any;
    
    const mockPage = {
      goto: vi.fn().mockResolvedValue(null),
      evaluate: vi.fn().mockResolvedValue(mockData),
      close: vi.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: vi.fn().mockResolvedValue(mockPage),
      close: vi.fn().mockResolvedValue(null),
    };

    puppeteer.default.launch.mockResolvedValue(mockBrowser);
  });
  
  it("test avec mock puppeteer", async () => {
    // Test logic here
  });
  
  it("test erreur puppeteer", async () => {
    // Override mock pour ce test spécifique
    const puppeteer = await vi.importMock("puppeteer") as any;
    puppeteer.default.launch.mockRejectedValueOnce(new Error("Failed"));
    
    // Test error handling
  });
});
```

**Points clés** :
1. Factory mock **simple** sans références externes
2. Configuration **dynamique** avec `vi.importMock()`
3. Tests **async** obligatoires avec cette approche
4. **Override** possible par test avec `vi.importMock()`

---

## 🕷️ Web Scraping avec Puppeteer

### **Configuration Puppeteer Production**

```typescript
const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage', // Important pour les serveurs
  ]
});
```

### **Pattern de Scraping Sécurisé**

```typescript
async function scrapePage(url: string) {
  let browser;
  let page;
  
  try {
    browser = await puppeteer.launch(config);
    page = await browser.newPage();
    
    // Timeout et navigation
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    const data = await page.evaluate(() => {
      return {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content,
        // etc.
      };
    });
    
    return data;
    
  } catch (error) {
    console.error('Scraping failed:', error);
    throw new Error('Failed to analyze website');
    
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
  }
}
```

---

## ⚡ Next.js 15 App Router

### **API Route Pattern**

```typescript
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validation
    if (!body.url || !body.email) {
      return NextResponse.json(
        { error: 'URL and email are required' },
        { status: 400 }
      );
    }
    
    // Logic here
    const result = await processRequest(body);
    
    return NextResponse.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method to analyze a website",
    example: {
      url: "https://example.com",
      email: "user@example.com"
    }
  });
}
```

---

## 🧪 Commandes de Test Utiles

```bash
# Tests unitaires
pnpm test:unit

# Tests React components
pnpm test:react

# Tests E2E
pnpm test:e2e

# Tous les tests + lint + typecheck
pnpm verify

# Tests en mode watch
pnpm test:unit -- --watch

# Coverage
pnpm test:unit -- --coverage
```

---

---

## 🐛 PROBLÈMES RÉSOLUS & SOLUTIONS DÉTAILLÉES

### **1. Problème Puppeteer Mock avec Vitest (27/08/2025)**

**🔴 Erreur initiale**: 
```
ReferenceError: Cannot access 'mockPuppeteer' before initialization
```

**📋 Contexte du problème**:
- Tests unitaires pour l'API `/api/analyze` qui utilise Puppeteer pour scraper les sites
- Vitest hoisting des `vi.mock()` calls au début du fichier
- Variables définies avant `vi.mock()` ne sont pas accessibles dans le factory

**❌ Code problématique original**:
```typescript
// Variables définies avant le mock
const mockPage = {
  goto: vi.fn(),
  evaluate: vi.fn(),
  close: vi.fn(),
};

const mockBrowser = {
  newPage: vi.fn(),
  close: vi.fn(),
};

const mockPuppeteer = {
  launch: vi.fn(),
};

// ❌ ERREUR: mockPuppeteer n'est pas accessible dans le factory
vi.mock("puppeteer", () => ({
  default: mockPuppeteer, // ReferenceError ici
}));
```

**🔄 Tentatives de résolution**:
1. **Tentative 1** - Réorganiser les variables : Échec, même erreur
2. **Tentative 2** - Factory function simple : Partiellement fonctionnel
3. **Tentative 3** - Configuration dynamique : ✅ **SOLUTION FINALE**

**✅ Solution finale complète**:
```typescript
// 1. Mock factory SIMPLE sans références externes
vi.mock("puppeteer", () => ({
  default: {
    launch: vi.fn(), // Mock simple, configuration dans beforeEach
  },
}));

describe("API Analyze", () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // 2. Import dynamique du mock pour configuration
    const puppeteer = (await vi.importMock("puppeteer")) as {
      default: { launch: ReturnType<typeof vi.fn> };
    };
    
    // 3. Configuration des mocks à l'exécution
    const mockPage = {
      goto: vi.fn().mockResolvedValue(null),
      evaluate: vi.fn().mockResolvedValue({
        title: "Test Title",
        metaDescription: "Test Description", 
        h1: ["Test H1"],
        h2: ["Test H2"],
        imageCount: 5,
        language: "en",
      }),
      close: vi.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: vi.fn().mockResolvedValue(mockPage),
      close: vi.fn().mockResolvedValue(null),
    };

    puppeteer.default.launch.mockResolvedValue(mockBrowser);
  });
  
  // 4. Override pour tests spécifiques (erreurs)
  it("should handle puppeteer errors gracefully", async () => {
    const puppeteer = (await vi.importMock("puppeteer")) as {
      default: { launch: ReturnType<typeof vi.fn> };
    };
    puppeteer.default.launch.mockRejectedValueOnce(
      new Error("Puppeteer failed")
    );
    
    // Test error handling...
  });
});
```

**📊 Résultat**: 21/21 tests passent ✅

---

### **2. Erreurs ESLint de Production (27/08/2025)**

**🔴 Erreurs rencontrées lors du commit**:
```
✖ 14 problems (13 errors, 1 warning)

/Users/oassas/Projets/replypilot/src/app/api/analyze/route.test.ts
   20:59  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  107:61  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/oassas/Projets/replypilot/src/app/page.tsx
   36:14   warning  'error' is defined but never used                                @typescript-eslint/no-unused-vars
  146:53   error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
  186:53   error    `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities
  186:107  error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
```

**✅ Solutions appliquées**:

**A. Types `any` remplacés par des types stricts**:
```typescript
// ❌ Avant
const puppeteer = (await vi.importMock("puppeteer")) as any;

// ✅ Après  
const puppeteer = (await vi.importMock("puppeteer")) as {
  default: { launch: ReturnType<typeof vi.fn> };
};
```

**B. Variables inutilisées supprimées**:
```typescript
// ❌ Avant
} catch (error) {
  alert('Une erreur est survenue...');

// ✅ Après
} catch {
  alert('Une erreur est survenue...');
```

**C. Entités JSX échappées**:
```typescript
// ❌ Avant
<p>"Le rapport a identifié des problèmes que mon agence n'avait pas vu"</p>

// ✅ Après
<p>&ldquo;Le rapport a identifié des problèmes que mon agence n&rsquo;avait pas vu&rdquo;</p>
```

---

### **3. Erreurs TypeScript de Compilation (27/08/2025)**

**🔴 Erreur**: 
```
.next/types/validator.ts(52,39): error TS2306: File '/Users/oassas/Projets/replypilot/src/app/dashboard/page.tsx' is not a module.
```

**📋 Cause**: Fichiers vides créés mais sans exports

**✅ Solution**: Ajout d'exports minimaux
```typescript
// src/app/dashboard/page.tsx
export default function Dashboard() {
  return <div>Dashboard - Coming soon</div>;
}

// src/app/api/email/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Email API - Not implemented' });
}

// src/app/api/payment/route.ts  
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Payment API - Not implemented' });
}
```

---

### **4. Erreur Environment Variables dans Tests**

**🔴 Erreur**:
```
src/lib/prisma.test.ts(30,17): error TS2540: Cannot assign to 'NODE_ENV' because it is a read-only property.
```

**✅ Solution**: Utiliser `vi.stubEnv()` au lieu d'assignation directe
```typescript
// ❌ Avant
afterEach(() => {
  process.env.NODE_ENV = originalNodeEnv;
});

// ✅ Après
afterEach(() => {
  if (originalNodeEnv !== undefined) {
    vi.stubEnv('NODE_ENV', originalNodeEnv);
  }
});
```

---

### **5. Problèmes Testing Library avec Vitest (27/08/2025)**

**🔴 Erreur initiale**:
```
Error: Missing "./extend-expect" specifier in "@testing-library/jest-dom" package
```

**📋 Contexte du problème**:
- Ajout de nouveaux tests React pour page `/report`
- Setup Test incorrect : tentative d'importer Jest DOM avec syntaxe Jest
- Vitest nécessite une syntaxe différente pour Testing Library

**❌ Code problématique**:
```typescript
// setupTests.ts - INCORRECT pour Vitest
import "@testing-library/jest-dom/extend-expect";
```

**✅ Solution**:
```typescript
// setupTests.ts - CORRECT pour Vitest
import "@testing-library/jest-dom/vitest";
```

**📊 Résultat**: Setup corrigé, tous tests passent ✅

---

### **6. Tests React avec HTML Multi-éléments (27/08/2025)**

**🔴 Erreur**:
```
TestingLibraryElementError: Unable to find an element with the text: Temps de chargement : 1234ms. 
This could be because the text is broken up by multiple elements.
```

**📋 Cause**: HTML sépare le texte en plusieurs éléments
```html
<p>
  <strong>Temps de chargement :</strong> 1234ms
</p>
```

**❌ Test problématique**:
```typescript
// Cherche le texte complet ensemble
expect(screen.getByText("Temps de chargement : 1234ms")).toBeInTheDocument();
```

**✅ Solution**: Tests séparés pour chaque partie
```typescript
// Test chaque élément séparément
expect(screen.getByText("Temps de chargement :")).toBeInTheDocument();
expect(screen.getByText("1234ms")).toBeInTheDocument();
```

**📊 Résultat**: Tests React fonctionnels ✅

---

### **7. Configuration Vitest Reporter (27/08/2025)**

**🔴 Warning persistant**:
```
DEPRECATED 'basic' reporter is deprecated and will be removed in Vitest v3.
```

**📋 Cause**: Configuration obsolète dans `package.json` et `vitest.config.mjs`

**❌ Configuration obsolète**:
```json
// package.json
"test:unit": "vitest run --reporter=basic"
```

**✅ Solution**: Configuration moderne
```json
// package.json  
"test:unit": "vitest run"

// vitest.config.mjs
test: {
  reporters: [["default", { summary: false }]]
}
```

**📊 Résultat**: Aucun warning, output propre ✅

---

### **8. Variables inutilisées dans Tests Mock (27/08/2025)**

**🔴 ESLint warning**:
```
'_input' is defined but never used  @typescript-eslint/no-unused-vars
'_init' is defined but never used   @typescript-eslint/no-unused-vars
```

**📋 Contexte**: Mock de `global.fetch` avec paramètres non utilisés

**❌ Mock avec paramètres nommés**:
```typescript
global.fetch = vi.fn((_input: RequestInfo | URL, _init?: RequestInit) => // Warning ici
```

**✅ Solution**: Supprimer paramètres inutiles
```typescript
global.fetch = vi.fn(() => // Pas de paramètres = pas de warning
```

**📊 Résultat**: ESLint clean, 0 warnings ✅

---

### **9. Tests E2E Manquants Bloquant CI (27/08/2025)**

**🔴 Erreur**:
```
Error: No tests found.
Make sure that arguments are regular expressions matching test files.
```

**📋 Cause**: Script `verify` inclut tests E2E non implémentés

**❌ Configuration avec tests manquants**:
```json
"verify": "pnpm typecheck && pnpm lint && pnpm test:unit && pnpm test:react && pnpm test:e2e"
```

**✅ Solution temporaire**: Retirer E2E de verify
```json
"verify": "pnpm typecheck && pnpm lint && pnpm test:unit && pnpm test:react"
```

**📊 Résultat**: CI passe, E2E à implémenter plus tard ✅

---

## **🎯 Leçons Apprises & Bonnes Pratiques**

### **Vitest + Puppeteer**
1. **Factory mocks simples** - Jamais de variables externes
2. **Configuration dynamique** avec `vi.importMock()`
3. **Types stricts** plutôt que `any`
4. **Tests async** obligatoires avec imports dynamiques

### **Testing Library + Vitest Setup**
1. **Import correct** - `@testing-library/jest-dom/vitest` pas `/extend-expect`
2. **Tests séparés** - Si HTML sépare texte en éléments multiples
3. **Configuration moderne** - Plus de reporter `basic`
4. **Mocks propres** - Éviter paramètres inutilisés dans vi.fn()

### **Workflow de Développement**
1. **`pnpm verify` avant commit** - Évite les surprises
2. **Fix incrémental** - Une erreur à la fois
3. **Documentation immédiate** - Problèmes & solutions
4. **Tests en continu** - 24/24 ✅ maintenu
5. **Éviter scripts avec dépendances manquantes** - Configurer verify progressivement

### **ESLint/TypeScript en Production**
1. **Entités JSX échappées** - `&rsquo;` au lieu de `'`
2. **Variables utilisées** - Pas de catch(error) ou paramètres mock inutilisés
3. **Exports obligatoires** - Même pour les stubs
4. **Environment mocking** - `vi.stubEnv()` pour Vitest
5. **Configuration progressive** - Implémenter E2E après unité/React

---

## ⚠️ **CE QU'IL FAUT ÉVITER À L'AVENIR**

### **🚫 Erreurs de Configuration Testing**
```typescript
// ❌ NE PAS FAIRE - Import Jest avec Vitest
import "@testing-library/jest-dom/extend-expect";

// ❌ NE PAS FAIRE - Reporter deprecated
"test:unit": "vitest run --reporter=basic"

// ❌ NE PAS FAIRE - Scripts avec dépendances manquantes
"verify": "pnpm test:e2e" // Si e2e pas implémenté
```

### **🚫 Erreurs de Tests React**
```typescript
// ❌ NE PAS FAIRE - Chercher texte multi-éléments
expect(screen.getByText("Label : Value")).toBeInTheDocument();

// ❌ NE PAS FAIRE - Paramètres inutilisés dans mocks
global.fetch = vi.fn((_input, _init) => ...); // ESLint warnings
```

### **🚫 Erreurs de Mocks Vitest**
```typescript
// ❌ NE PAS FAIRE - Variables dans factory mock
const mockObj = { fn: vi.fn() };
vi.mock("module", () => ({ default: mockObj })); // Hoisting error

// ❌ NE PAS FAIRE - Types any partout
const mock = await vi.importMock("module") as any; // ESLint error
```

### **🚫 Erreurs de Workflow**
1. **Commit sans verify** - Toujours `pnpm verify` avant commit
2. **Tests incomplets** - Tous les nouveaux composants doivent avoir des tests
3. **Documentation différée** - Documenter les problèmes immédiatement
4. **Configuration monolithique** - Implémenter progressivement (unit → React → E2E)

---

## 📝 Notes de Développement

- **Toujours tester** les mocks Puppeteer avant commit
- **Timeout généreux** pour les tests de scraping (30s+)
- **Cleanup** obligatoire des ressources Puppeteer
- **Error handling** robuste pour les failures réseau
- **Rate limiting** sur les endpoints d'analyse

Ces solutions sont testées et validées dans le projet Site Analyzer.