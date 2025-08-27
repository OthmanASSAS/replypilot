# Roadmap: Site Analyzer

Ce document détaille la roadmap pour la création du projet "Site Analyzer", un outil d'analyse de site web automatisé.

## PHASE 1 - NETTOYAGE & FONDATIONS (1-2 jours)

1.  **✅ Supprimer les dossiers obsolètes** : Nettoyage des fichiers des anciens projets "ReplyPilot" et "Review Analytics".
2.  **Créer le nouveau schéma Prisma pour Site Analyzer** : Définir le modèle de données pour les analyses.
3.  **Mettre à jour les variables d'environnement** : Préparer le fichier `.env.local` pour les nouvelles clés API (Supabase, Stripe, OpenAI, Resend).
4.  **Installer les nouvelles dépendances nécessaires** : `puppeteer`, `resend`, `stripe`, etc.

## PHASE 2 - MVP CORE (1 semaine)

5.  **Créer la landing page avec formulaire URL + email** : Une page simple pour capturer l'input de l'utilisateur.
6.  **Développer l'API d'analyse de site (/api/analyze)** : L'endpoint principal qui orchestrera le scraping et l'analyse.
7.  **Implémenter le web scraping basique** : Utiliser Puppeteer pour extraire le titre, les méta-descriptions, et les H1 d'une page.
8.  **Créer le template mini-rapport PDF** : Un template simple (avec `jsPDF` ou une librairie similaire) pour présenter les premiers résultats.
9.  **Intégrer l'envoi d'email automatique** : Utiliser Resend pour envoyer le mini-rapport PDF à l'utilisateur.

## PHASE 3 - MONÉTISATION (3-4 jours)

10. **Intégrer Stripe pour rapport complet** : Mettre en place le paiement pour l'upsell.
11. **Créer le template rapport premium** : Un rapport plus détaillé avec des analyses plus poussées.
12. **Développer le dashboard utilisateur** : Un espace où l'utilisateur peut retrouver l'historique de ses analyses et télécharger ses rapports.

## PHASE 4 - TESTS & OPTIMISATION (2-3 jours)

13. **Tester avec vrais sites web** : Valider le scraper et l'analyseur sur une variété de sites.
14. **Optimiser le funnel de conversion** : A/B tester les emails et les call-to-actions.
15. **Déploiement et monitoring** : Mettre en place le monitoring des erreurs (Sentry) et des performances.
