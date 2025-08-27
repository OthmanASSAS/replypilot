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

## 📝 Notes de Développement

- **Toujours tester** les mocks Puppeteer avant commit
- **Timeout généreux** pour les tests de scraping (30s+)
- **Cleanup** obligatoire des ressources Puppeteer
- **Error handling** robuste pour les failures réseau
- **Rate limiting** sur les endpoints d'analyse

Ces solutions sont testées et validées dans le projet Site Analyzer.