# Configuration Technique - ReplyPilot

## 🚀 Stack Technique Actuelle

### Frontend
- **Next.js 15** avec App Router
- **React 19** avec hooks (useState)
- **TypeScript strict**
- **CSS modules** / Inline styles

### Backend
- **Next.js API Routes**
- **Prisma** + SQLite (développement)
- **Variables d'environnement** sécurisées

### IA & APIs
- **Groq API** (Llama-3.1-8b-instant)
- **Judge.me API** pour récupération d'avis
- **Shopify API** (à venir pour OAuth)

## 🔧 Configuration Actuelle

### Variables d'environnement (.env.local)
```bash
GROQ_API_KEY=gsk_***
JUDGEME_SHOP_DOMAIN=ecom-booster-test.myshopify.com
JUDGEME_PRIVATE_TOKEN=vNNk8***
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Endpoints API Fonctionnels
- `GET /api/judgeme/reviews` - Récupère les avis depuis Judge.me
- `POST /api/reviews/[id]/suggest` - Génère une réponse IA
- `POST /api/reviews/[id]/publish` - Publie une réponse (simulé)

### Structure des Données

**Avis Judge.me (format normalisé)**
```typescript
interface Review {
  id: number;
  rating: number;
  author: string;
  content: string;
  productId: number | null;
  createdAt: string;
}
```

**Réponse IA**
```typescript
interface AIResponse {
  suggestion: string;
}
```

## 🧪 Tests

### Tests Unitaires (Vitest)
```bash
pnpm test:unit  # 10/10 tests passent
```

- Tests pour `/api/reviews/[id]/suggest`
- Tests pour `/api/reviews/[id]/publish` 
- Tests pour `src/lib/prisma.ts`

### Tests React
```bash
pnpm test:react
```

### Tests E2E (Playwright)
```bash
pnpm test:e2e
```

## 📦 Structure des Fichiers

```
src/
├── app/
│   ├── api/
│   │   ├── judgeme/reviews/route.ts    # Proxy Judge.me
│   │   └── reviews/
│   │       └── [id]/
│   │           ├── suggest/route.ts    # Génération IA
│   │           └── publish/route.ts    # Publication
│   └── reviews/
│       ├── page.tsx                    # Page principale
│       └── review-list.tsx             # Composant liste
└── lib/
    └── prisma.ts                       # Client DB
```

## 🔄 Workflow Actuel

1. **Récupération d'avis** : Judge.me API → `/api/judgeme/reviews`
2. **Affichage** : Page `/reviews` avec liste d'avis
3. **Génération IA** : Clic bouton → `/api/reviews/[id]/suggest` → Groq API
4. **Affichage suggestion** : Boîte bleue avec réponse IA
5. **Publication** : À implémenter (prochaine étape)

## 🚧 État de Développement

### ✅ Fonctionnel
- Récupération avis réels Judge.me
- Génération réponses IA personnalisées
- Interface utilisateur responsive
- Tests unitaires complets

### 🔄 En Cours
- Validation/édition des réponses
- Publication sur plateformes

### 📋 À Faire
- OAuth Shopify
- Rate limiting
- Monitoring/logs
- Déploiement production

## 🎯 Métriques de Performance

- **Temps réponse IA** : ~500ms-2s (Groq)
- **Récupération avis** : ~500ms-1s (Judge.me)
- **Compilation Next.js** : ~3.5s (cold start)