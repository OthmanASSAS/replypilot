// filepath:docs/ai/TASK.md

# Tâche en cours

## Contexte
Pour garantir la robustesse et la fiabilité de l'application, nous devons commencer par mettre en place des tests automatisés.

## Objectif
Mettre en place les tests unitaires pour les fonctions utilitaires et les logiques métier.

## Critères d’acceptation
- Les tests unitaires couvrent les fonctions utilitaires et les services critiques.
- Les tests unitaires sont exécutables via `pnpm test:unit`.
- Tous les tests unitaires passent.

---

# ✅ Tâches Terminées

## ~~Objectif : Mettre en place les tests unitaires pour `src/lib/prisma.ts`~~ (Terminé)
- ~~Le fichier `src/lib/prisma.test.ts` est créé.~~
- ~~Le test de base pour l'instance PrismaClient passe.~~
- ~~Le test du singleton passe.~~
- ~~Le test de l'appel de méthode `findMany` passe.~~

## ~~Objectif : Évaluer la qualité des réponses générées par l'IA et ajuster le prompt si nécessaire.~~ (Terminé)
- ~~Définir une méthode d'évaluation (manuelle ou automatisée).~~
- ~~Évaluer un échantillon de réponses générées.~~
- ~~Identifier les points faibles du prompt actuel.~~
- ~~Proposer des améliorations au prompt.~~

---

# ✅ Tâches Terminées

## ~~Objectif : Implémenter la sauvegarde des modifications d'une suggestion sans publication.~~ (Terminé)
- ~~Un bouton "Sauvegarder" est disponible en mode édition.~~
- ~~Cliquer sur "Sauvegarder" met à jour la suggestion dans la base de données (champ `response` de l'avis).~~
- ~~La suggestion sauvegardée est affichée à la place de la suggestion originale.~~
- ~~La suggestion sauvegardée n'est pas automatiquement publiée sur Shopify.~~

## ~~Objectif : Ajouter une fonctionnalité d'édition pour les réponses suggérées par l'IA~~ (Terminé)
- ~~Un champ de texte éditable apparaît lorsque l'utilisateur clique sur une suggestion de réponse.~~
- ~~L'utilisateur peut modifier le texte de la suggestion.~~
- ~~Le bouton "Publier" utilise le texte modifié.~~

## ~~Objectif : Afficher l'historique des réponses pour chaque avis sur la page d'accueil~~ (Terminé)
- ~~Pour chaque avis, afficher la réponse générée par l'IA (si elle existe).~~
- ~~Si une réponse a été publiée, l'indiquer clairement.~~

## ~~Objectif : Implémenter la fonctionnalité de publication d'une réponse sur Shopify~~ (Terminé)
- ~~Un endpoint `POST /api/reviews/{reviewId}/publish` est créé.~~
- ~~Il prend l'ID de l'avis et la réponse à publier en paramètre.~~
- ~~Il simule la publication sur Shopify (pour l'instant, pas de vraie intégration Shopify).~~
- ~~Il met à jour le champ `response` de l'avis dans la base de données.~~

## ~~Objectif : Créer un endpoint de suggestion de réponse IA~~ (Terminé)
- ~~Un endpoint `POST /api/reviews/{reviewId}/suggest` est créé.~~
- ~~Il prend l'ID de l'avis en paramètre.~~
- ~~Il retourne un objet JSON avec une propriété `suggestion`.~~
- ~~La suggestion est une chaîne de caractères non vide.~~

## ~~Objectif : Afficher les avis sur la page d'accueil~~ (Terminé)
- ~~La page d'accueil (`src/app/page.tsx`) fait un appel à notre endpoint `GET /api/reviews`.~~
- ~~Les avis sont affichés sous forme de liste.~~
- ~~Chaque élément de la liste affiche au minimum le contenu (`content`) et la note (`rating`).~~

## ~~Objectif : Corriger /api/reviews~~ (Terminé)
- ~~GET /api/reviews retourne un JSON avec les reviews.~~
- ~~Mise en place d'un script de seed avec les données de `sample.csv`.~~
- ~~Correction du bug d'import via la page `/upload`.~~


---

# ✅ Tâches Terminées

## ~~Objectif : Mettre en place les tests unitaires pour `src/lib/prisma.ts`~~ (Terminé)
- ~~Le fichier `src/lib/prisma.test.ts` est créé.~~
- ~~Le test de base pour l'instance PrismaClient passe.~~

## ~~Objectif : Évaluer la qualité des réponses générées par l'IA et ajuster le prompt si nécessaire.~~ (Terminé)
- ~~Définir une méthode d'évaluation (manuelle ou automatisée).~~
- ~~Évaluer un échantillon de réponses générées.~~
- ~~Identifier les points faibles du prompt actuel.~~
- ~~Proposer des améliorations au prompt.~~

---

# ✅ Tâches Terminées

## ~~Objectif : Évaluer la qualité des réponses générées par l'IA et ajuster le prompt si nécessaire.~~ (Terminé)
- ~~Définir une méthode d'évaluation (manuelle ou automatisée).~~
- ~~Évaluer un échantillon de réponses générées.~~
- ~~Identifier les points faibles du prompt actuel.~~
- ~~Proposer des améliorations au prompt.~~

## ~~Objectif : Implémenter la sauvegarde des modifications d'une suggestion sans publication.~~ (Terminé)
- ~~Un bouton "Sauvegarder" est disponible en mode édition.~~
- ~~Cliquer sur "Sauvegarder" met à jour la suggestion dans la base de données (champ `response` de l'avis).~~
- ~~La suggestion sauvegardée est affichée à la place de la suggestion originale.~~
- ~~La suggestion sauvegardée n'est pas automatiquement publiée sur Shopify.~~

## ~~Objectif : Ajouter une fonctionnalité d'édition pour les réponses suggérées par l'IA~~ (Terminé)
- ~~Un champ de texte éditable apparaît lorsque l'utilisateur clique sur une suggestion de réponse.~~
- ~~L'utilisateur peut modifier le texte de la suggestion.~~
- ~~Le bouton "Publier" utilise le texte modifié.~~

## ~~Objectif : Afficher l'historique des réponses pour chaque avis sur la page d'accueil~~ (Terminé)
- ~~Pour chaque avis, afficher la réponse générée par l'IA (si elle existe).~~
- ~~Si une réponse a été publiée, l'indiquer clairement.~~

## ~~Objectif : Implémenter la fonctionnalité de publication d'une réponse sur Shopify~~ (Terminé)
- ~~Un endpoint `POST /api/reviews/{reviewId}/publish` est créé.~~
- ~~Il prend l'ID de l'avis et la réponse à publier en paramètre.~~
- ~~Il simule la publication sur Shopify (pour l'instant, pas de vraie intégration Shopify).~~
- ~~Il met à jour le champ `response` de l'avis dans la base de données.~~

## ~~Objectif : Créer un endpoint de suggestion de réponse IA~~ (Terminé)
- ~~Un endpoint `POST /api/reviews/{reviewId}/suggest` est créé.~~
- ~~Il prend l'ID de l'avis en paramètre.~~
- ~~Il retourne un objet JSON avec une propriété `suggestion`.~~
- ~~La suggestion est une chaîne de caractères non vide.~~

## ~~Objectif : Afficher les avis sur la page d'accueil~~ (Terminé)
- ~~La page d'accueil (`src/app/page.tsx`) fait un appel à notre endpoint `GET /api/reviews`.~~
- ~~Les avis sont affichés sous forme de liste.~~
- ~~Chaque élément de la liste affiche au minimum le contenu (`content`) et la note (`rating`).~~

## ~~Objectif : Corriger /api/reviews~~ (Terminé)
- ~~GET /api/reviews retourne un JSON avec les reviews.~~
- ~~Mise en place d'un script de seed avec les données de `sample.csv`.~~
- ~~Correction du bug d'import via la page `/upload`.~~

