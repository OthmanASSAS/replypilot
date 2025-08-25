// filepath:docs/ai/CURRENT_STATE.md

# État actuel

## Bugs connus
- Route `/api/reviews` retourne 404 (non implémentée).

## Dettes techniques
- Auth Shopify pas encore intégrée.
- Pas encore de gestion centralisée des erreurs.

## Zones fragiles
- Gestion des tokens Shopify.
- Pipeline IA (prompts encore basiques).

## Migrations DB
- Modèle `Review` pas encore défini.

## Décisions en attente
- Choix final du LLM (Claude vs Gemini vs Groq).
- Hosting DB (Supabase vs RDS).