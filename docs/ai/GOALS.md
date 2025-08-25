// filepath:docs/ai/GOALS.md

# ReplyPilot – Objectifs

# 🚀 ReplyPilot – Objectifs & Roadmap

ReplyPilot est à la fois :

1. Un **produit SaaS** pour automatiser les réponses aux avis clients e-commerce.
2. Un **projet pédagogique structuré** pour devenir expert Fullstack, IA et Cloud.

---

## 🌍 Objectifs Business

- **MVP rapide & monétisable**
  - Lancer une première version utilisable en **< 1 mois**.
  - Public cible : **marchands Shopify utilisant Judge.me**.
  - Monétisation immédiate → **29 €/mois (Pro)** = réponses illimitées.

- **Premiers clients payants**
  - Objectif : **10 marchands actifs** le plus vite possible.
  - Éventuellement :
    - **Starter (gratuit/limité)** : 20 réponses/mois.
    - **Enterprise** : multi-shops + SLA.

- **Indicateurs de succès (KPI)**
  - ⏱ **Time-to-first-sale** < 4 semaines.
  - 💰 **MRR cible** : 300 € (10 clients Pro).
  - 📉 **Churn < 10 %** sur les 3 premiers mois.
  - 🤖 **% avis couverts par IA** > 80 %.
  - ⚡ **Temps moyen de réponse divisé par 10**.

---

## 🛠 Objectifs Techniques

- **Stack & standards**
  - Full **TypeScript strict** (Next.js 15 App Router + Node.js).
  - Hébergement **Vercel + Supabase**.
  - API AI : Groq / DeepSeek / OpenAI (fallback).

- **Excellence technique**
  - **DevSecOps by default** : secrets, auth sécurisée, a11y, perf budgets, logs.
  - **Qualité contrôlée** :
    - Vitest (unit/intégration).
    - React Testing Library (UI).
    - Playwright (E2E).
  - **CI/CD fiable** : lint + tests obligatoires → build bloqué si fail.

- **Architecture modulaire**
  - Fichiers ≤ 250 lignes.
  - Découpage clair : `/modules/reviews`, `/modules/replies`, `/modules/shops`.
  - **Server Actions** (Next.js 15).
  - Logs structurés (Pino).

---

## 🎯 Objectifs Pédagogiques (Montée en Compétences)

ReplyPilot doit être le **laboratoire concret** pour progresser dans les domaines suivants :

1. **Fullstack (React, Next.js, Node.js)**
   - Construire UI modernes (shadcn/ui, Tailwind).
   - API côté serveur avec Server Actions.
   - Gestion état : TanStack Query + Zustand.

2. **IA appliquée**
   - Intégration LLM (Groq, OpenAI, DeepSeek).
   - Prompt engineering et RAG (vector DB Supabase).
   - Evaluation automatique (benchmarks qualité réponses).

3. **DevSecOps**
   - Secrets (Vault/Env).
   - Règles CI/CD (GitHub Actions).
   - Scans sécurité (npm audit, Snyk).

4. **FinOps (maîtrise coûts Cloud)**
   - Suivi coûts Vercel/Supabase.
   - Monitoring usage AI (limiter requêtes).
   - Alertes budgets.

5. **Architecture logicielle**
   - Découpage modulaire (domain-driven).
   - Tests en pyramide (unit/int/e2e).
   - Gestion dette technique dès le début.

6. **Architecture Cloud**
   - Déploiement Vercel + Supabase → migrer AWS (Terraform) à terme.
   - Conception multi-tenant SaaS (plusieurs shops).
   - Observabilité (logs, metrics, alerting).

7. **Git & CLI**
   - Gitflow (branches propres, rebase, squash).
   - Scripts npm + alias shell pour automatiser.
   - Gemini CLI pilotée avec fichiers de cadrage.

8. **Algorithmie**
   - Optimiser parsing/tri des avis.
   - Détection automatique de ton/sentiment.
   - Priorisation des réponses (tri par urgence).

---

## 📦 Roadmap Produit

- **Phase 1 – MVP (1er mois)**
  - Intégration Judge.me API.
  - Génération réponses IA.
  - Dashboard simple → Avis + Suggestions.
  - Publication manuelle.

- **Phase 2 – Automatisation**
  - Auto-publish selon règles.
  - Personnalisation du ton (positif, neutre, pro).
  - Multi-shops.

- **Phase 3 – Shopify App Store**
  - Theme App Extension (widget activable).
  - Billing Shopify (Pro 29 €/mois).
  - Dashboard enrichi (stats, temps gagné).

- **Phase 4 – Extension multi-plateformes**
  - Google Reviews, Trustpilot, Amazon.
  - Reporting avancé + auto-tagging.

---

## ✅ Résumé

1. **Business** : viser vite le marché Shopify, pricing clair (29 €/mois).
2. **Technique** : stack moderne, sécurité & qualité natives.
3. **Produit** : commencer petit (Judge.me → IA → Dashboard), enrichir itérativement.
4. **Pédagogie** : ReplyPilot = ton **dojo technique** pour devenir :
   - Expert Fullstack React/Next.js/Node.js
   - Praticien IA appliquée
   - DevSecOps + FinOps conscient
   - Architecte logiciel & cloud
   - Maître Git & CLI
   - Solide en algorithmie

---

📌 **Prochaine étape immédiate (Semaine 1)** :

1. Créer **route `/api/reviews`** mockée.
2. UI Dashboard minimal (liste d’avis).
3. Intégrer **premier LLM** (Groq → réponses automatiques).
4. Déploiement sur Vercel.
