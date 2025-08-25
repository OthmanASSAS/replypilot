// filepath:docs/ai/CODING_STANDARDS.md

# Coding Standards

- Noms explicites pour fichiers/fonctions.
- ≤ 250 lignes/fichier (factoriser sinon).
- Imports ordonnés (externes → internes).
- Exports nommés (pas de default export pour libs).
- Tests : style Given/When/Then.
- Commits : Conventional Commits (feat:, fix:, chore:…).
- Script unique : `pnpm verify` (typecheck + lint + tests).