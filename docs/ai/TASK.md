// filepath:docs/ai/TASK.md

# Tâche en cours

## Contexte
Maintenant que l'IA peut suggérer des réponses, nous devons permettre à l'utilisateur de valider et de publier ces réponses sur Shopify.

## Objectif
Implémenter la fonctionnalité de publication d'une réponse sur Shopify.

## Critères d’acceptation
- Un endpoint `POST /api/reviews/{reviewId}/publish` est créé.
- Il prend l'ID de l'avis et la réponse à publier en paramètre.
- Il simule la publication sur Shopify (pour l'instant, pas de vraie intégration Shopify).
- Il met à jour le champ `response` de l'avis dans la base de données.

## ~~Objectif : Créer un endpoint de suggestion de réponse IA~~ (Terminé)
- ~~Un endpoint `POST /api/reviews/{reviewId}/suggest` est créé.~~
- ~~Il prend l'ID de l'avis en paramètre.~~
- ~~Il retourne un objet JSON avec une propriété `suggestion`.~~
- ~~La suggestion est une chaîne de caractères non vide.~~

---

# ✅ Tâches Terminées

## ~~Objectif : Afficher les avis sur la page d'accueil~~ (Terminé)
- ~~La page d'accueil (`src/app/page.tsx`) fait un appel à notre endpoint `GET /api/reviews`.~~
- ~~Les avis sont affichés sous forme de liste.~~
- ~~Chaque élément de la liste affiche au minimum le contenu (`content`) et la note (`rating`).~~

## ~~Objectif : Corriger /api/reviews~~ (Terminé)
- ~~GET /api/reviews retourne un JSON avec les reviews.~~
- ~~Mise en place d'un script de seed avec les données de `sample.csv`.~~
- ~~Correction du bug d'import via la page `/upload`.~~
