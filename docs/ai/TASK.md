// filepath:docs/ai/TASK.md

# Tâche en cours

## Contexte
Maintenant que l'historique des réponses est visible, nous devons permettre à l'utilisateur de modifier une réponse avant de la publier.

## Objectif
Ajouter une fonctionnalité d'édition pour les réponses suggérées par l'IA.

## Critères d’acceptation
- Un champ de texte éditable apparaît lorsque l'utilisateur clique sur une suggestion de réponse.
- L'utilisateur peut modifier le texte de la suggestion.
- Le bouton "Publier" utilise le texte modifié.

---

# ✅ Tâches Terminées

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

