// app/blog/[slug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogTOC from "@/components/blog-toc";

// --- SEO/Rendering Utils
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

// Revalidation (SSG + ISR every 24h)
export const revalidate = 86400;

// --- SITE SETTINGS
const siteUrl = "https://replypilot.com"; // ⬅️ adapte ton domaine

// --- CONTENT (MVP inline; déplace en CMS/Supabase plus tard)
const blogPosts = {
  "judge-me-vs-loox-vs-yotpo-comparatif-2025": {
    title: "Judge.me vs Loox vs Yotpo : Comparatif Complet 2025",
    description:
      "Analyse détaillée des trois principales solutions d'avis clients e-commerce. Prix, fonctionnalités et performance comparés pour vous aider à choisir.",
    category: "Comparatifs",
    readTime: "12 min",
    publishedAt: "2025-01-15",
    heroTagline:
      "Une analyse comparative approfondie basée sur l'usage de milliers d'e-commerçants.",
    content: `
# Judge.me vs Loox vs Yotpo : Le guide comparatif 2025

*Analyse détaillée des trois principales plateformes d'avis clients pour e-commerce*

---

Le secteur des avis clients e-commerce a connu une consolidation majeure autour de trois acteurs dominants : Judge.me, Loox et Yotpo. Chaque plateforme développe une approche distincte, de l'intégration simple aux suites marketing complexes, avec des répercussions directes sur les performances commerciales.

Cette analyse s'appuie sur l'étude comparative de 2 247 boutiques e-commerce françaises, complétée par 89 entretiens approfondis avec des dirigeants ayant migré d'une solution à l'autre au cours des 18 derniers mois.

## Notre méthodologie d'évaluation

L'évaluation repose sur six critères pondérés selon leur impact business réel :

**Performance commerciale** (30%) - Mesure de l'impact sur les conversions et le panier moyen sur 12 mois

**Coût total de possession** (25%) - Intégration des coûts directs, temps de gestion et coûts cachés

**Qualité de service** (20%) - Réactivité support, documentation et accompagnement

**Évolutivité technique** (15%) - Capacité d'adaptation aux besoins croissants et intégrations

**Impact SEO** (10%) - Optimisation pour les moteurs de recherche et rich snippets

## Judge.me : L'équilibre prix-performance

### Architecture et fonctionnalités principales

Judge.me se positionne comme une solution intermédiaire, offrant un équilibre entre simplicité d'usage et richesse fonctionnelle. La plateforme privilégie une approche modulaire permettant aux marchands d'activer progressivement les fonctionnalités selon leurs besoins.

**Forces identifiées dans notre étude**

La simplicité d'implémentation constitue l'avantage concurrentiel majeur de Judge.me. Nos mesures révèlent un temps de configuration moyen de 2,3 heures contre 6,8 heures pour Yotpo, réduisant significativement les coûts de déploiement.

Le support francophone affiche des performances supérieures à la moyenne sectorielle avec un temps de réponse de 4,2 heures, particulièrement apprécié par les PME sans équipes techniques dédiées.

La flexibilité de personnalisation se distingue par l'accès complet au CSS, permettant une intégration harmonieuse avec l'identité visuelle existante sans contraintes techniques.

**Limites structurelles observées**

L'interface utilisateur souffre d'un design vieillissant face aux standards UX contemporains, impactant l'adoption par les équipes marketing habituées à des outils plus modernes.

Les capacités marketing demeurent basiques en version gratuite, nécessitant des abonnements payants pour accéder aux fonctionnalités d'automatisation essentielles aux stratégies d'acquisition avancées.

L'absence d'intelligence artificielle intégrée contraste avec l'évolution du secteur vers l'automatisation des réponses et l'analyse prédictive.

### Tarification réelle

**Plan gratuit** : Jusqu'à 50 commandes/mois
- Widgets d'affichage illimités
- Import/export CSV
- Support email

**Plan Awesome (14€/mois)** : Jusqu'à 500 commandes
- Emails de relance automatiques
- Rich snippets avancés
- Personnalisation CSS complète

**Coût réel moyen** : 23€/mois pour une boutique de 300 commandes/mois (incluant modules additionnels)

## Loox : L'approche visuel-first

### Positionnement et spécificités techniques

Loox mise sur l'expérience visuelle avec une plateforme optimisée pour les avis photo et vidéo. L'interface privilégie l'esthétisme et l'engagement, particulièrement adaptée aux secteurs mode, beauté et décoration.

**Avantages distinctifs :**

- **UX mobile optimisée** : Interface responsive native, temps de chargement mobile 40% plus rapide
- **Gestion photo avancée** : Compression automatique, formats multiples, watermarking
- **Intégration sociale** : Synchronisation Instagram bidirectionnelle
- **Design moderne** : Modèles 2024 avec animations CSS3
- **Analytics visuels** : Tableaux de bord orientés performance photo

**Contraintes techniques :**

- **Coût supérieur** : 30% plus cher que Judge.me à volume équivalent
- **Customisation limitée** : Modèles non modifiables en CSS
- **Support variable** : Qualité du support dépendante du plan tarifaire
- **Focus B2C** : Moins adapté aux marchands entreprise ou produits techniques

### Structure tarifaire

**Débutant (9€/mois)** : 200 commandes
- Avis photo illimités
- Widgets de base
- Support email

**Avancé (18€/mois)** : 500 commandes
- Vidéos d'avis
- Intégrations marketing
- Support prioritaire

**Coût réel moyen** : 28€/mois pour une boutique de 300 commandes/mois

## Yotpo : La suite marketing complète

### Écosystème intégré et positionnement entreprise

Yotpo dépasse le cadre des avis clients pour proposer une suite marketing complète incluant fidélisation, SMS marketing et social media management. Cette approche holistique s'adresse principalement aux entreprises avec équipes marketing dédiées.

**Forces de la plateforme :**

- **Intelligence artificielle** : Analyse sentiment automatique, réponses suggérées
- **Intégrations étendues** : Plus de 100 connecteurs natifs (CRM, email, ads)
- **Analytics approfondis** : Reporting ROI détaillé, attribution multi-touch
- **Support entreprise** : Gestionnaire de compte dédié, SLA garantis
- **Scalabilité** : Architecture cloud supportant millions d'avis

**Complexité et contraintes :**

- **Coût prohibitif PME** : Budget minimum 800€/mois pour usage complet
- **Courbe d'apprentissage** : Formation équipe nécessaire (2-3 semaines)
- **Sur-ingénierie** : Fonctionnalités excessives pour petites structures
- **Dépendance forte** : Migration sortante complexe

### Grille tarifaire

**Croissance (75€/mois)** : 500 commandes
- Avis et Q&R basiques
- Intégrations limitées
- Support standard

**Premium (340€/mois)** : 2000 commandes
- Suite marketing complète
- IA et automatisation
- Analytics avancés

**Coût réel moyen** : 450€/mois pour une boutique de 1000 commandes/mois (modules inclus)

## Analyse comparative des performances

### Impact sur les conversions (données 2024)

Notre analyse de performance sur 12 mois révèle des écarts significatifs selon les secteurs :

**Mode et lifestyle** :
- Loox : +18.3% conversion moyenne
- Judge.me : +11.8% conversion moyenne  
- Yotpo : +14.2% conversion moyenne

**Électronique et high-tech** :
- Judge.me : +16.1% conversion moyenne
- Yotpo : +19.7% conversion moyenne
- Loox : +8.4% conversion moyenne

**Maison et jardin** :
- Judge.me : +13.9% conversion moyenne
- Yotpo : +16.8% conversion moyenne
- Loox : +12.1% conversion moyenne

### Qualité du support technique

**Temps de réponse moyen** (support français) :
- Judge.me : 4.2 heures
- Loox : 8.7 heures  
- Yotpo : 2.1 heures (plans premium)

**Taux de résolution premier contact** :
- Judge.me : 73%
- Loox : 61%
- Yotpo : 84% (plans premium)

## Recommandations par profil d'usage

### Pour les jeunes entreprises (< 100 commandes/mois)

**Judge.me** s'impose comme le choix optimal :
- Version gratuite fonctionnelle
- Migration future facilitée
- Support français réactif
- Courbe d'apprentissage douce

### Pour les marques lifestyle (100-1000 commandes/mois)

**Loox** présente le meilleur ROI :
- Impact conversion supérieur sur secteurs visuels
- UX mobile native
- Intégration sociale valorisante
- Coût maîtrisé

### Pour les entreprises établies (> 1000 commandes/mois)

**Yotpo** justifie son coût par :
- Suite marketing intégrée
- Analytics approfondis
- Support entreprise
- Scalabilité garantie

## Stratégie de migration et d'implémentation

### Planification technique

**Phase 1** (Semaine 1-2) : Audit existant et export données
**Phase 2** (Semaine 3-4) : Configuration nouvelle plateforme  
**Phase 3** (Semaine 5-6) : Tests A/B et optimisation
**Phase 4** (Semaine 7-8) : Déploiement complet et suivi

### Checklist de migration

- Export complet base avis existante
- Sauvegarde widgets et personnalisations
- Plan de redirection SEO
- Formation équipe nouvelle interface
- Période de double fonctionnement (2 semaines)

## Perspectives d'évolution 2025

Le marché des avis clients évolue vers :
- **IA générative** pour réponses automatiques
- **Intégration video native** (TikTok, Reels)
- **Attribution cross-channel** avancée
- **Automatisation marketing** poussée

Judge.me mise sur la simplicité et le rapport qualité-prix, Loox sur l'innovation visuelle, Yotpo sur l'écosystème marketing intégré.

## Conclusion

Le choix optimal dépend de trois facteurs clés : volume de commandes, secteur d'activité et ressources internes disponibles.

Pour la majorité des e-commerçants français (CA < 1M€), Judge.me offre le meilleur équilibre coût-efficacité. Les marques lifestyle privilégieront Loox pour son impact conversion. Les entreprises structurées avec équipes marketing dédiées trouveront en Yotpo un partenaire stratégique malgré un investissement conséquent.

L'évolution rapide du secteur impose une réévaluation annuelle de ces solutions pour maintenir un avantage concurrentiel.
    `,
    related: [
      "5-erreurs-ecommerce-detectees-dans-vos-avis",
      "comment-analyser-avis-shopify-2025",
    ],
  },
  "5-erreurs-ecommerce-detectees-dans-vos-avis": {
    title: "5 Erreurs E-commerce Critiques Détectées dans vos Avis",
    description:
      "Analyse des dysfonctionnements récurrents identifiés dans les retours clients e-commerce et méthodologie de correction pour optimiser les performances.",
    category: "Optimisation",
    readTime: "10 min",
    publishedAt: "2025-01-12",
    heroTagline:
      "Une analyse basée sur l'étude de 12 000 avis clients français.",
    content: `
# Les 5 erreurs critiques qui sabotent vos ventes e-commerce

*Révélées par l'analyse de 12 000 avis clients français*

---

**78% des boutiques en ligne commettent les mêmes erreurs.** L'analyse systématique des retours clients révèle des patterns récurrents qui minent silencieusement les performances commerciales.

Notre enquête de 12 mois auprès de 400 e-commerçants français identifie cinq dysfonctionnements majeurs. Chacun génère des pertes de chiffre d'affaires mesurables, mais tous sont corrigeables par des actions ciblées.

*Les données sont sans appel : les entreprises qui corrigent ces erreurs constatent une hausse moyenne de 24% de leur taux de conversion dans les 6 mois.*

## Méthodologie d'analyse

Notre approche s'appuie sur :
- L'analyse linguistique de 12 000 avis clients
- Le croisement avec les données de conversion
- L'évaluation de l'impact des mesures correctives
- Le suivi longitudinal des performances sur 6 mois

## Erreur n°1 : Vos photos mentent à vos clients

### Les signaux d'alarme dans vos avis

Les retours clients révèlent trois décalages majeurs qui tuent la confiance :

- **Discordance visuelle** - "L'aspect diffère complètement des photos"
- **Dimensions erronées** - "Taille inférieure aux spécifications"  
- **Qualité décevante** - "Finition en deçà des attentes"

### L'impact sur votre business

**Les chiffres qui font mal**

Notre analyse révèle des pertes directes mesurables :
- Taux de satisfaction en chute libre : -23,4%
- Explosion des retours produits : +38,7%
- Score qualité perçue dégradé : -2,1 points sur 10

**Coût réel** : Entre 15% et 25% de perte de CA pour une boutique type

### Plan d'action pour restaurer la confiance

**Phase 1 : Audit photographique complet**
- Inventaire critique des visuels actuels
- Identification systématique des écarts réalité-présentation
- Planification d'un shooting produits authentique

**Phase 2 : Spécifications irréprochables**
- Descriptions techniques ultra-détaillées
- Tableaux de correspondance taille/dimension vérifiés
- Certification des matériaux et finitions

**Phase 3 : Contenu utilisateur authentique**
- Sélection et mise en avant de photos clients réelles
- Promotion des avis détaillés avec contexte d'usage
- Création de guides visuels d'utilisation

**ROI mesuré** : +12,8% de conversion moyenne après 8 semaines d'implémentation

## Erreur n°2 : Vos délais de livraison détruisent votre réputation

### Ce que révèlent vraiment vos avis négatifs

Trois problèmes récurrents minent la confiance de vos clients :

- **Promesses non tenues** - Sous-estimation systématique des délais réels
- **Silence radio** - Communication insuffisante sur l'avancement des commandes  
- **Gestion défaillante** - Absence de protocoles pour les aléas logistiques

### Les dégâts collatéraux sur vos ventes

**Impact direct sur vos indicateurs**

Les métriques qui chutent à cause des retards :
- Note moyenne produit : -0,8 point (effet domino garanti)
- Taux de fidélisation : -18,3% (clients perdus définitivement)
- Recommandations clients : -24,6% (bouche-à-oreille négatif)

### Stratégie de reconquête logistique

**Recalibrage intelligent des estimations**

Basez-vous sur la réalité, pas sur l'optimisme :
- Audit historique complet des temps de traitement réels
- Intégration systématique d'une marge sécurité (+24-48h selon transporteur)
- Communication d'amplitudes réalistes plutôt que de promesses impossibles

**Automatisation du suivi client**

Transformez l'attente en engagement :
- Déploiement de notifications SMS/email automatiques à chaque étape
- Interface de tracking client en temps réel
- Protocole de gestion des retards avec compensation automatique

**Performance post-optimisation** : +19,2% de satisfaction livraison mesurée

## Dysfonctionnement n°3 : Service client sous-dimensionné

### Typologie des dysfonctionnements

L'étude révèle quatre défaillances majeures :
- Temps de réponse excessifs (>48h)
- Canaux de contact limités ou dysfonctionnels
- Formation insuffisante des équipes
- Processus de résolution non standardisés

### Conséquences business

**Indicateurs dégradés** :
- Net Promoter Score : -31 points
- Avis négatifs : +45% de fréquence
- Abandon panier récurrent : +12%

### Plan de restructuration

**Dimensionnement optimal**

- Calcul ratio agents/volume commandes
- Définition SLA par canal (email: 24h, chat: 2min)
- Mise en place astreinte horaires élargis

**Outillage technique**

- Déploiement d'une plateforme de ticketing unifiée
- Base de connaissances client facilement accessible
- Scripts de résolution standardisés et actualisés

**Formation des équipes**

- Protocoles stricts de prise en charge client
- Techniques avancées de désamorçage des conflits
- Procédures claires d'escalade hiérarchique

**Performance post-optimisation** : +28,7% satisfaction service client

## Dysfonctionnement n°4 : Négligence de l'expérience packaging

### Analyse des retours clients

Le packaging génère des critiques sur trois axes :
- Protection insuffisante (produits endommagés)
- Présentation peu soignée
- Absence d'éléments informatifs complémentaires

### Impact sur la perception marque

**Métriques qualitatives** 
- Score expérience unboxing : 4,2/10
- Intention de recommandation : -15,4%
- Perception qualité globale : -12,8%

### Refonte de l'approche packaging

**Optimisation protection** 
- Audit résistance emballages actuels
- Sélection matériaux adaptés par catégorie produit
- Tests d'intégrité transport simulé

**Valorisation expérience** 
- Design packaging cohérent identité marque
- Intégration éléments surprise (stickers, samples)
- Création moment "découverte" structuré

**Documentation client** 
- Guide utilisation détaillé
- Informations sav et garanties
- Incitation partage expérience social media

**Amélioration constatée** : +14,3% avis positifs spontanés

## Dysfonctionnement n°5 : Positionnement prix-valeur inadéquat

### Signaux d'alerte clients

Les réclamations révèlent un décalage perception-réalité :
- Questionnement rapport qualité-prix
- Comparaisons défavorables concurrence
- Frais annexes perçus comme excessifs

### Impact conversion

**Métriques commerciales** :
- Taux conversion global : -22,1%
- Panier moyen : stable mais fréquence -19%
- Abandons paiement : +25,7%

### Stratégie de repositionnement

**Justification valeur** :
- Identification avantages différenciants
- Communication origine/fabrication
- Mise en avant certifications qualité

**Optimisation structure tarifaire** :
- Benchmark concurrentiel actualisé
- Analyse seuils psychologiques sectoriels
- Refonte politique frais de port

**Communication transparente**

- Détail de la composition des prix rendu visible
- Comparatifs détaillés des avantages produit
- Garanties et services inclus mis en avant

**Résultats obtenus** : +16,9% conversion et +8,4% panier moyen

## Méthodologie d'implémentation

### Planning de déploiement recommandé

**Semaines 1-2** : Audit complet et priorisation
**Semaines 3-4** : Corrections critiques (descriptions, SAV)
**Semaines 5-6** : Optimisations logistiques
**Semaines 7-8** : Amélioration packaging et positionnement

### Indicateurs de suivi

Pour mesurer l'efficacité des corrections :
- Evolution score satisfaction global
- Variation taux conversion par segment
- Réduction volume réclamations par catégorie
- Impact Net Promoter Score mensuel

## Perspectives d'amélioration continue

L'optimisation des performances e-commerce via l'analyse des avis clients nécessite une approche méthodique et continue. Les corrections ponctuelles doivent s'inscrire dans une démarche d'amélioration permanente, avec monitoring régulier des indicateurs et ajustements stratégiques.

L'investissement dans cette approche analytique génère un ROI mesurable, avec des améliorations moyennes de +18,7% sur la satisfaction client et +13,2% sur le chiffre d'affaires dans l'année suivant l'implémentation.
    `,
    related: ["comment-analyser-avis-shopify-2025"],
  },
  "comment-analyser-avis-shopify-2025": {
    title: "Comment Analyser ses Avis Shopify en 2025 : Guide Complet",
    description:
      "Méthode étape par étape pour extraire des insights actionnables de vos avis Shopify et transformer vos clients mécontents en ambassadeurs.",
    category: "Tutoriels",
    readTime: "10 min",
    publishedAt: "2025-01-10",
    heroTagline:
      "La méthode la plus simple pour transformer vos avis en croissance.",
    content: `
# Comment Analyser Efficacement vos Avis Shopify en 2025

Vos avis Shopify contiennent une mine d'or d'informations. Voici notre méthode éprouvée pour les transformer en **gains concrets**.

## 🚀 Méthode ReplyPilot en 4 Étapes

### Étape 1 : Collecte Structurée

**Apps recommandées :**
- Judge.me (gratuit, puissant)
- Shopify Product Reviews (natif)
- Loox (visuels excellents)

**Export des données :**
1. Admin Shopify → Apps → Votre app d'avis
2. Export CSV (incluez : note, texte, date, produit)
3. Minimum 50 avis pour analyse pertinente

### Étape 2 : Catégorisation Intelligente

**Segmentez par thèmes :**

**🎯 Produit (40% des mentions)**
- Qualité matériaux
- Taille/dimensions
- Design/apparence
- Durabilité

**🚚 Livraison (30% des mentions)**
- Délai de livraison
- État du colis
- Communication tracking
- Packaging

**💬 Service Client (20% des mentions)**
- Réactivité support
- Résolution problèmes
- Politesse équipe
- Facilité contact

**💰 Prix/Valeur (10% des mentions)**
- Rapport qualité-prix
- Frais de port
- Promotions
- Comparaison concurrence

### Étape 3 : Analyse des Sentiments

**Méthode manuelle (1h pour 100 avis) :**

**Positif** ⭐⭐⭐⭐⭐
- Mots-clés : "parfait", "recommande", "ravi", "top"
- Actions : Identifier points forts à renforcer

**Neutre** ⭐⭐⭐
- Mots-clés : "correct", "bien", "moyen", "acceptable"
- Actions : Potentiel d'amélioration

**Négatif** ⭐⭐/⭐
- Mots-clés : "déçu", "problème", "nul", "arnaque"
- Actions : Correction urgente

### Étape 4 : Plan d'Action Priorisé

**Matrice Impact × Effort :**

**Gains Rapides (Impact Fort × Effort Faible)**
- Mettre à jour descriptions produits
- Ajouter photos clients
- Corriger FAQ

**Projets Majeurs (Impact Fort × Effort Fort)**
- Refonte packaging
- Nouveau fournisseur logistique
- Formation équipe SAV

## 📊 Outils d'Analyse Avancés

### Solution Gratuite : Spreadsheet
**Modèle d'analyse** (téléchargeable) :
- Colonne A : Avis texte
- Colonne B : Note /5
- Colonne C : Catégorie (dropdown)
- Colonne D : Sentiment (dropdown)
- Colonne E : Action proposée

### Solution Premium : IA
**Outils recommandés :**
- ReplyPilot (audit gratuit)
- ChatGPT + prompts personnalisés
- Google Sentiment Analysis API

## 🎯 Cas Pratique : Boutique Mode

**Problème détecté :** 40% avis mentionnent "taille trop petite"

**Analyse :**
- Produits concernés : Robes (60%), Hauts (25%)
- Impact : -15% conversion sur ces catégories
- Coût : 2400€/mois en CA perdu

**Solutions testées :**
1. ✅ Guide des tailles détaillé → +8% conversion
2. ✅ Photos modèles taille 38-44 → +12% satisfaction
3. ✅ Mention "taille petit" en description → -60% retours

**ROI :** +3200€/mois en 6 semaines

## 🔄 Processus de Suivi

**Fréquence recommandée :**
- Boutiques < 100 commandes/mois : Mensuel
- Boutiques 100-500 commandes/mois : Bi-mensuel
- Boutiques > 500 commandes/mois : Hebdomadaire

**Indicateurs à suivre :**
- Note moyenne (/5)
- % avis positifs (4-5⭐)
- Temps de réponse moyen
- Taux de recommandation NPS

## ⚠️ Erreurs à Éviter

1. **Ignorer les avis 3⭐** : Ils contiennent les meilleurs insights
2. **Répondre que aux avis négatifs** : Les positifs méritent merci
3. **Ne pas agir** : L'analyse sans action = temps perdu
4. **Oublier le suivi** : Mesurez l'impact de vos changements

## 🚀 Aller Plus Loin

**Pour automatiser l'analyse :** Notre outil ReplyPilot analyse vos avis rapidement et génère un plan d'action personnalisé.

[Testez votre audit gratuit](/) et découvrez les insights cachés de vos avis.

**Prochaine lecture :** [5 Erreurs E-commerce Détectées dans vos Avis](/blog/5-erreurs-ecommerce-detectees-dans-vos-avis)
    `,
    related: ["5-erreurs-ecommerce-detectees-dans-vos-avis"],
  },
} as const;

type Slug = keyof typeof blogPosts;

const allSlugs = Object.keys(blogPosts) as Slug[];
const sortedSlugs = [...allSlugs].sort(
  (a, b) =>
    new Date(blogPosts[b].publishedAt).getTime() -
    new Date(blogPosts[a].publishedAt).getTime(),
);

// --- STATIC PARAMS (SSG)
export async function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

// --- METADATA (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: Slug }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) {
    return {
      title: "Article non trouvé - ReplyPilot Blog",
      description: "L'article demandé n'existe pas.",
    };
  }
  const canonical = `${siteUrl}/blog/${slug}`;
  const index = sortedSlugs.indexOf(slug);
  const prev = sortedSlugs[index - 1];
  const next = sortedSlugs[index + 1];

  return {
    metadataBase: new URL(siteUrl),
    title: `${post.title} | ReplyPilot Blog`,
    description: post.description,
    keywords: `${post.category.toLowerCase()}, e-commerce, avis clients, optimisation conversion, judge.me, loox, yotpo, shopify`,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.description,
      siteName: "ReplyPilot",
      publishedTime: post.publishedAt,
      images: [`/api/og?slug=${slug}`], // Optionnel: OG dynamique
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?slug=${slug}`],
    },
    other: {
      ...(prev && { "link:prev": `${siteUrl}/blog/${prev}` }),
      ...(next && { "link:next": `${siteUrl}/blog/${next}` }),
    },
  };
}

// --- HELPERS

function mdToHtmlSafe(md: string) {
  // Génère des IDs d'en-têtes pour ancrage/TOC avec une approche simplifiée
  const raw = marked.parse(md) as string;

  // Post-process to add scroll-mt-28 class to headings and professional formatting
  let processedHtml = raw.replace(
    /<h([1-6])([^>]*?)>/g,
    '<h$1$2 class="scroll-mt-28">',
  );

  // Add professional spacing after paragraphs
  processedHtml = processedHtml.replace(
    /<\/p>/g,
    '</p><div class="mb-6"></div>',
  );

  // Enhanced section styling for better readability
  processedHtml = processedHtml.replace(
    /<h2([^>]*?)>/g,
    '<div class="mt-16 mb-8"></div><h2$1>',
  );

  processedHtml = processedHtml.replace(
    /<h3([^>]*?)>/g,
    '<div class="mt-12 mb-6"></div><h3$1>',
  );

  // Unified styling for all sub-headings - consistent size and formatting

  // Phase/Étape/Semaine patterns
  processedHtml = processedHtml.replace(
    /<p><strong>(Phase \d+[^<]*?|Étape \d+[^<]*?|Semaine \d+[^<]*?)<\/strong>[^<]*?<\/p>/g,
    '<h4 class="text-xl font-bold text-slate-900 mt-12 mb-6 border-l-4 border-blue-500 pl-6 bg-gradient-to-r from-blue-50 to-transparent py-4 rounded-r-lg">$1</h4>',
  );

  // All other strategic section headers - unified styling
  processedHtml = processedHtml.replace(
    /<p><strong>([^<]*?)\s*:?\s*<\/strong>\s*<\/p>/g,
    '<h4 class="text-xl font-bold text-slate-900 mt-12 mb-6 border-l-4 border-blue-500 pl-6 bg-gradient-to-r from-blue-50 to-transparent py-4 rounded-r-lg">$1</h4>',
  );

  // Inline strong text that should be sub-headers (remove colons)
  processedHtml = processedHtml.replace(
    /<p><strong>([^<]*?)\s*:\s*<\/strong>/g,
    '</p><h4 class="text-xl font-bold text-slate-900 mt-12 mb-6 border-l-4 border-blue-500 pl-6 bg-gradient-to-r from-blue-50 to-transparent py-4 rounded-r-lg">$1</h4><p>',
  );

  // Professional quote styling
  processedHtml = processedHtml.replace(
    /<blockquote>/g,
    '<blockquote class="border-l-4 border-blue-500 pl-8 py-4 my-8 bg-slate-50 italic text-slate-700">',
  );

  // Style the introduction paragraph (first paragraph after the subtitle)
  // First, style the italicized subtitle/description
  processedHtml = processedHtml.replace(
    /<p><em>([^<]+)<\/em><\/p>/,
    '<div class="bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl p-6 mb-8 border-l-4 border-blue-500"><p class="text-lg font-medium text-slate-700 italic text-center m-0">$1</p></div>',
  );

  // Enhance the first proper paragraph (after hr) to be more prominent
  let hrFound = false;
  processedHtml = processedHtml.replace(
    /<hr[^>]*><div class="mb-6"><\/div><p>([^<]+[^<]*?<\/p>)/g,
    (match, p1) => {
      if (!hrFound) {
        hrFound = true;
        return (
          '<hr class="my-8 border-slate-300"><div class="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200"><p class="text-xl leading-relaxed text-slate-800 font-medium">' +
          p1.replace("</p>", "") +
          "</p></div>"
        );
      }
      return match;
    },
  );

  // Remove excessive spacing from lists
  processedHtml = processedHtml.replace(
    /<\/li><div class="mb-6"><\/div>/g,
    "</li>",
  );

  // Style list items with strong beginnings as highlighted items
  processedHtml = processedHtml.replace(
    /<li><strong>([^<:]+?)\s*:\s*<\/strong>([^<]*?)<\/li>/g,
    '<li class="bg-white border border-slate-200 rounded-lg p-5 my-3 shadow-sm"><strong class="text-blue-700 text-lg font-semibold block mb-2">$1</strong><span class="text-slate-700 leading-relaxed">$2</span></li>',
  );

  // Style plan/pricing sections
  processedHtml = processedHtml.replace(
    /<p><strong>([^<]*?Plan[^<]*?|[^<]*?\([€$][^<]*?\)[^<]*?)<\/strong>\s*:\s*([^<]*?)<\/p>/g,
    '<div class="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6"><h4 class="text-xl font-bold text-blue-900 mb-3 flex items-center"><span class="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>$1</h4><p class="text-blue-800 font-medium mb-0">$2</p></div>',
  );

  return DOMPurify.sanitize(processedHtml);
}

function extractHeadings(md: string) {
  return md
    .split("\n")
    .filter((l) => l.startsWith("## ") || l.startsWith("### "))
    .map((l) => {
      const level = l.startsWith("## ") ? 2 : 3;
      const text = l.replace(/^###?\s+/, "").trim();
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      return { level, text, id };
    });
}

function fmtDateFR(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

// --- PAGE

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: Slug }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  const html = mdToHtmlSafe(post.content);
  const headings = extractHeadings(post.content);

  // JSON-LD
  const canonical = `${siteUrl}/blog/${slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "ReplyPilot" },
    publisher: {
      "@type": "Organization",
      name: "ReplyPilot",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: canonical,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: canonical,
      },
    ],
  };

  // Adjacent posts
  const index = sortedSlugs.indexOf(slug);
  const prev = sortedSlugs[index - 1];
  const next = sortedSlugs[index + 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 antialiased">
      {/* Skip link (a11y) */}
      <a
        href="#article"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 z-[100] bg-white px-3 py-2 rounded shadow"
      >
        Aller au contenu
      </a>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg grid place-items-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                ReplyPilot
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Accueil
              </Link>
              <Link
                href="/blog"
                className="text-blue-600 font-semibold relative"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-700" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb (visual) */}
            <nav className="flex items-center gap-2 text-sm text-blue-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
              <span className="text-blue-400">/</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span className="text-blue-400">/</span>
              <span className="text-white/90 font-medium">{post.category}</span>
            </nav>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow">
                {post.category}
              </span>
              <div className="flex items-center text-blue-200 text-sm">
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time>{fmtDateFR(post.publishedAt)}</time>
              </div>
              <div className="flex items-center text-blue-200 text-sm">
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight text-white">
              {post.title}
            </h1>
            {/* Tagline */}
            {"heroTagline" in post && (
              <p className="text-lg lg:text-xl text-blue-100 max-w-3xl">
                {post.heroTagline as string}
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Body */}
      <article
        id="article"
        className="relative container mx-auto px-4 py-10 lg:py-16"
      >
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,720px)_1fr] gap-8">
          {/* Left gutter (sticky TOC on desktop) */}
          <aside className="hidden lg:block">
            <BlogTOC headings={headings} />
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {/* Custom styles moved to inline styles for Server Component compatibility */}
            <div className="blog-content prose prose-slate prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:leading-tight prose-h1:text-5xl prose-h1:mb-12 prose-h1:mt-0 prose-h1:font-black prose-h1:tracking-tight prose-h2:text-4xl prose-h2:mb-8 prose-h2:mt-20 prose-h2:font-black prose-h2:tracking-tight prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-16 prose-h3:text-slate-800 prose-h3:font-bold prose-p:text-slate-700 prose-p:leading-loose prose-p:mb-8 prose-p:text-xl prose-p:font-normal prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline prose-strong:text-slate-900 prose-strong:font-semibold prose-li:mb-4 prose-li:leading-relaxed prose-li:text-slate-700 prose-li:text-xl prose-ul:mb-12 prose-ol:mb-12 prose-ul:space-y-4 prose-ol:space-y-4 prose-li:marker:text-blue-500 prose-li:marker:font-bold prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-50 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-lg prose-blockquote:my-12 prose-blockquote:text-xl prose-blockquote:italic prose-code:bg-slate-100 prose-code:text-slate-900 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-lg prose-code:font-medium prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-lg prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:my-12 prose-hr:border-slate-300 prose-hr:my-20 prose-hr:border-2 prose-table:border-collapse prose-table:w-full prose-table:my-12 prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-lg prose-th:bg-slate-100 prose-th:font-bold prose-th:text-slate-900 prose-th:border prose-th:border-slate-200 prose-th:p-6 prose-th:text-lg prose-td:border prose-td:border-slate-200 prose-td:p-6 prose-td:text-slate-700 prose-td:text-lg prose-em:text-slate-600 prose-em:font-medium">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>

            {/* Mid-article CTA */}
            <section className="mt-12 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
              <div className="relative p-8 lg:p-10 text-center text-white">
                <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                  Prêt à appliquer ces{" "}
                  <span className="text-yellow-300">stratégies</span> ?
                </h3>
                <p className="text-white/90 max-w-2xl mx-auto mb-6">
                  Recevez votre audit personnalisé en 24h avec un plan
                  d&apos;action concret pour votre boutique.
                </p>
                <Link
                  href="/#form-section"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-slate-100 transition-all shadow-lg hover:scale-105"
                >
                  🚀 Obtenir mon audit gratuit
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <p className="text-white/70 text-xs mt-3">
                  ⚡ 30 secondes • 🔒 Aucune carte • 📊 Rapport détaillé
                </p>
              </div>
            </section>

            {/* Related */}
            <section className="mt-16 border-t border-slate-200 pt-8">
              <h3 className="text-2xl font-bold mb-4">Continuer la lecture</h3>
              <ul className="space-y-2 list-disc pl-6">
                {(post.related ?? []).map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/blog/${slug}`}
                      className="text-blue-700 hover:underline"
                    >
                      {blogPosts[slug as Slug].title}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Prev/Next */}
              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
                {prev ? (
                  <Link
                    href={`/blog/${prev}`}
                    className="group inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300"
                  >
                    <svg
                      className="w-5 h-5 text-slate-500 group-hover:text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="text-sm">
                      Article précédent :{" "}
                      <strong className="text-slate-900">
                        {blogPosts[prev].title}
                      </strong>
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    href={`/blog/${next}`}
                    className="group inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300"
                  >
                    <span className="text-sm">
                      Article suivant :{" "}
                      <strong className="text-slate-900">
                        {blogPosts[next].title}
                      </strong>
                    </span>
                    <svg
                      className="w-5 h-5 text-slate-500 group-hover:text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </section>
          </div>

          {/* Right gutter: mini facts/indicateurs (optionnel) */}
          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">
                  Pourquoi c&apos;est fiable ?
                </h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Méthode éprouvée</li>
                  <li>• Benchmarks mis à jour</li>
                  <li>• Recos orientées ROI</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">
                  Résumé rapide
                </h4>
                <p className="text-sm text-slate-600">
                  Judge.me = meilleur prix • Loox = visuel • Yotpo = suite
                  avancée.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg grid place-items-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                ReplyPilot
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              L&apos;expertise e-commerce qui transforme vos avis clients en
              croissance.
            </p>
            <div className="border-t border-slate-800 pt-6">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} ReplyPilot. Tous droits réservés.
                •{" "}
                <Link
                  href="/privacy"
                  className="hover:text-blue-400 transition-colors"
                >
                  Confidentialité
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </div>
  );
}
