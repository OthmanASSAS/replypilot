// filepath: /Users/oassas/Projets/replypilot/src/lib/groq-analysis.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuration Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export interface Review {
  platform: string;
  author: string;
  rating: number;
  body: string;
}

export interface BusinessAction {
  category: "conversion" | "seo" | "pricing" | "product" | "marketing" | "ux";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string; // Ex: "+23% conversion" ou "+2847€/mois"
  effort: "faible" | "moyen" | "élevé";
  implementation: string; // Comment faire concrètement
  roi_estimate?: string; // ROI estimé si applicable
}

export interface OpportunityInsight {
  type: "new_product" | "bundle" | "seasonal" | "market_expansion" | "pricing";
  title: string;
  description: string;
  evidence: string; // Preuves dans les avis
  revenue_potential: string; // Ex: "25k€/mois potentiel"
  next_steps: string[];
}

export interface CustomerPain {
  pain_point: string;
  frequency: number; // Nombre de mentions
  severity: "critical" | "important" | "minor";
  business_impact: string; // Impact sur le business
  solution: string; // Solution concrète
  examples: string[]; // Extraits d'avis
}

export interface CompetitiveAdvantage {
  advantage: string;
  mentions: number;
  leverage_strategy: string; // Comment exploiter cet avantage
  marketing_angle: string; // Angle marketing suggéré
}

export interface ReviewAnalysis {
  // Stats de base
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    "5": number;
    "4": number;
    "3": number;
    "2": number;
    "1": number;
  };

  // Actions business concrètes (le cœur de la valeur)
  immediate_actions: BusinessAction[]; // Actions ROI immédiat
  growth_opportunities: OpportunityInsight[]; // Opportunités de croissance
  customer_pain_points: CustomerPain[]; // Points de friction à résoudre
  competitive_advantages: CompetitiveAdvantage[]; // Avantages à exploiter

  // Mots-clés pour SEO/Marketing
  power_keywords: string[]; // Mots-clés récurrents pour SEO
  marketing_angles: string[]; // Angles de communication qui fonctionnent

  // Score de confiance des recommandations
  confidence_score: number; // 0-100, basé sur la quantité et qualité des avis
}

function extractJsonFromMarkdown(markdown: string): string | null {
  const match = markdown.match(/```(json)?\n([\s\S]*?)\n```/);
  return match ? match[2] : markdown; // Return the captured group or the original string
}

export async function analyzeReviews(
  reviews: Review[]
): Promise<ReviewAnalysis> {
  console.log("Starting review analysis with Gemini...");

  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not configured");
    throw new Error("GEMINI_API_KEY is not configured");
  }

  if (!reviews || reviews.length === 0) {
    console.log("No reviews provided, returning empty analysis.");
    return getEmptyAnalysis();
  }

  console.log(`Analyzing ${reviews.length} reviews.`);

  // Calculs statistiques de base
  const totalReviews = reviews.length;
  const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = sumRatings / totalReviews;

  const ratingDistribution = reviews.reduce(
    (dist, review) => {
      const rating = String(review.rating) as keyof typeof dist;
      if (rating in dist) {
        dist[rating]++;
      }
      return dist;
    },
    { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 }
  );

  // Score de confiance basé sur la quantité et diversité des avis
  const confidenceScore = Math.min(
    100,
    Math.max(
      20,
      totalReviews * 10 +
        (averageRating >= 4 ? 20 : 0) +
        (totalReviews > 10 ? 20 : 0)
    )
  );

  // Préparer le contexte pour l'IA avec focus business
  const reviewsText = reviews
    .map(
      (review, index) =>
        `Avis ${index + 1} (${review.rating}/5 étoiles) - ${review.platform}:\n"${review.body}"`
    )
    .join("\n\n");

  // APPROCHE HYBRIDE : D'abord extraire les faits, puis analyser
  const factsExtractionPrompt = [
    "Analyse ces avis clients et EXTRAIS UNIQUEMENT les FAITS mentionnés explicitement.",
    "Ne fais AUCUNE interprétation, AUCUNE supposition.",
    "",
    "--- AVIS À ANALYSER ---",
    reviewsText,
    "",
    "EXTRAIS en JSON :",
    "1) Tous les COMPLIMENTS explicites avec citations exactes",
    "2) Tous les PROBLÈMES explicites avec citations exactes",
    "3) Toutes les DEMANDES/SUGGESTIONS explicites avec citations exactes",
    "4) Tous les MOTS-CLÉS positifs récurrents",
    "",
    "Format JSON strict :",
    JSON.stringify({
      compliments: [{ quote: "citation exacte", theme: "qualité matériaux" }],
      problems: [{ quote: "citation exacte", theme: "problème identifié" }],
      requests: [{ quote: "citation exacte", request: "demande du client" }],
      positive_keywords: ["mot1", "mot2"],
    }),
  ].join("\n");

  let extractedFacts;
  try {
    console.log("--- Sending prompt for facts extraction to Gemini ---");

    const factsResult = await model.generateContent([
      {
        text:
          "Tu dois répondre UNIQUEMENT en format JSON valide. " +
          factsExtractionPrompt,
      },
    ]);

    const rawFacts = factsResult.response.text();
    console.log("--- Raw facts response from Gemini ---");
    console.log(rawFacts);

    const jsonFacts = extractJsonFromMarkdown(rawFacts);
    if (!jsonFacts) {
      throw new Error("Could not extract JSON from facts markdown");
    }

    extractedFacts = JSON.parse(jsonFacts);
    console.log("--- Parsed facts ---");
    console.log(JSON.stringify(extractedFacts, null, 2));
  } catch (error) {
    console.error("Error during facts extraction with Gemini:", error);
    return getFallbackAnalysis(
      reviews,
      averageRating,
      totalReviews,
      ratingDistribution,
      confidenceScore
    );
  }

  // Deuxième étape : Génération d'insights basés sur les faits extraits
  const insightsPrompt = [
    "Tu es un consultant e-commerce senior spécialisé dans l’analyse d’avis clients.",
    "Ton objectif est de transformer une liste de faits bruts extraits d'avis en un rapport stratégique clair, structuré et orienté ROI.",
    "",
    "--- FAITS VÉRIFIÉS (Extraits des avis) ---",
    JSON.stringify(extractedFacts, null, 2),
    "",
    "⚠️ Règles strictes :",
    "• Jamais d’hallucination : tout doit être basé sur les faits fournis.",
    "• Toujours justifier chaque recommandation avec une ou plusieurs citations client (evidence_quotes).",
    "• Ajouter un compteur de mentions (mentions_count) basé sur la fréquence dans les avis.",
    "• Style professionnel et concis, pas d’emojis, pas de ton 'IA'.",
    "• Chaque plan doit contenir : quoi faire + comment faire + impact attendu + ROI estimatif.",
    "• Les implémentations doivent être concrètes (ex: sur Shopify, Klaviyo, description produit, visuel, bundle...).",
    "• Si une info n’est pas dans les avis, ne l’invente pas.",
    "",
    "📊 STRUCTURE ATTENDUE DU RAPPORT (Format JSON strict) :",
    JSON.stringify({
      executive_summary: {
        average_rating: "number",
        reviews_used: "number",
        top_strength: "string",
        top_weakness: "string",
        priority_action: "string",
      },
      immediate_actions: [
        {
          category: "conversion|seo|pricing|product|marketing|ux",
          priority: "high|medium|low",
          title: "string",
          description: "string",
          impact: "high|medium|low",
          effort: "faible|moyen|élevé",
          implementation: "étapes concrètes (outil/section, ce qu’on modifie)",
          roi_estimate: "string (ex: '+10-15% conversion')",
          mentions_count: 0,
          evidence_quotes: ["citation exacte 1", "citation exacte 2"],
        },
      ],
      growth_opportunities: [
        {
          type: "new_product|bundle|seasonal|market_expansion|pricing",
          title: "string",
          description: "string",
          revenue_potential: "string",
          next_steps: ["étape 1", "étape 2"],
          mentions_count: 0,
          evidence_quotes: ["...", "..."],
        },
      ],
      customer_pain_points: [
        {
          pain_point: "string",
          frequency: 0,
          severity: "critical|important|minor",
          business_impact: "string",
          solution: "string",
          examples: ["citation exacte", "citation exacte"],
        },
      ],
      competitive_advantages: [
        {
          advantage: "string",
          mentions: 0,
          leverage_strategy: "string",
          marketing_angle: "string",
          evidence_quotes: ["..."],
        },
      ],
      power_keywords: ["mots-clés SEO extraits"],
      marketing_angles: ["Angles de communication"],
      seo_recommendations: {
        recommended_meta_description:
          "≤155 caractères, intégrant 1 bénéfice client + 1 mot-clé",
        h2_suggestions: ["H2 1", "H2 2", "H2 3"],
        long_tail_queries: [
          "requête 1",
          "requête 2",
          "requête 3",
          "requête 4",
          "requête 5",
        ],
        faqs: [{ q: "question basée avis", a: "réponse concise basée avis" }],
        faq_jsonld: "{...JSON-LD valide pour FAQPage...}",
      },
      action_plan_30_60_90: {
        "30_days": [
          {
            task: "string",
            owner: "marketing|dev|design",
            tool: "Shopify|Loox|Klaviyo|...",
            effort: "faible|moyen|élevé",
            metric: "CTR, CVR, AOV, retours, etc.",
          },
        ],
        "60_days": [
          {
            task: "string",
            owner: "role",
            tool: "outil",
            effort: "moyen",
            metric: "kpi",
          },
        ],
        "90_days": [
          {
            task: "string",
            owner: "role",
            tool: "outil",
            effort: "élevé",
            metric: "kpi",
          },
        ],
      },
    }),
  ].join("\n");

  try {
    console.log("--- Sending prompt for insights generation to Gemini ---");

    const insightsResult = await model.generateContent([
      {
        text:
          "Tu dois répondre UNIQUEMENT en format JSON valide. " +
          insightsPrompt,
      },
    ]);

    const rawInsights = insightsResult.response.text();
    console.log("--- Raw insights response from Gemini ---");
    console.log(rawInsights);

    const jsonInsights = extractJsonFromMarkdown(rawInsights);
    if (!jsonInsights) {
      throw new Error("Could not extract JSON from insights markdown");
    }

    const aiAnalysis = JSON.parse(jsonInsights);
    console.log("--- Parsed insights ---");
    console.log(JSON.stringify(aiAnalysis, null, 2));

    // Validation et structuration des données IA
    return {
      average_rating: Math.round(averageRating * 10) / 10,
      total_reviews: totalReviews,
      rating_distribution: ratingDistribution,
      confidence_score: confidenceScore,

      immediate_actions: validateBusinessActions(
        aiAnalysis.immediate_actions || []
      ),
      growth_opportunities: validateOpportunities(
        aiAnalysis.growth_opportunities || []
      ),
      customer_pain_points: validatePainPoints(
        aiAnalysis.customer_pain_points || []
      ),
      competitive_advantages: validateAdvantages(
        aiAnalysis.competitive_advantages || []
      ),

      power_keywords: Array.isArray(aiAnalysis.power_keywords)
        ? aiAnalysis.power_keywords.slice(0, 10)
        : [],
      marketing_angles: Array.isArray(aiAnalysis.marketing_angles)
        ? aiAnalysis.marketing_angles.slice(0, 8)
        : [],
    };
  } catch (error) {
    console.error("Error during insights generation with Gemini:", error);
    return getFallbackAnalysis(
      reviews,
      averageRating,
      totalReviews,
      ratingDistribution,
      confidenceScore
    );
  }
}

// Fonctions anti-hallucination
function validateAgainstReviews(actions: any[], reviewsContent: string): any[] {
  if (!Array.isArray(actions)) return [];

  return actions.filter((action) => {
    if (!action.title || !action.description) return false;

    // Vérifier que les termes clés de l'action sont présents dans les avis
    const actionKeywords = action.title
      .toLowerCase()
      .split(" ")
      .concat(action.description.toLowerCase().split(" "))
      .filter((word) => word.length > 3); // Mots de plus de 3 lettres

    // Mots interdits qui indiquent des hallucinations courantes
    const forbiddenWords = [
      "livraison",
      "shipping",
      "delivery",
      "montage",
      "assembly",
      "installation",
    ];
    if (forbiddenWords.some((word) => actionKeywords.includes(word))) {
      console.log(`🚫 Action filtrée (mot interdit): ${action.title}`);
      return false;
    }

    // Au moins 2 mots-clés doivent être trouvés dans les avis
    const foundKeywords = actionKeywords.filter((keyword) =>
      reviewsContent.includes(keyword)
    );
    const isValid = foundKeywords.length >= 2;

    if (!isValid) {
      console.log(`🚫 Action filtrée (non trouvée dans avis): ${action.title}`);
    }

    return isValid;
  });
}

function validateOpportunitiesAgainstReviews(
  opportunities: any[],
  reviewsContent: string
): any[] {
  if (!Array.isArray(opportunities)) return [];

  return opportunities.filter((opp) => {
    if (!opp.title || !opp.description) return false;

    // Vérifications strictes pour les opportunités
    const title = opp.title.toLowerCase();
    const description = opp.description.toLowerCase();

    // Si on parle de taille XL mais que les avis disent "spacious", "big", "generous" → hallucination
    if (
      title.includes("xl") ||
      title.includes("plus grand") ||
      title.includes("bigger")
    ) {
      const sizePositiveWords = [
        "spacious",
        "big",
        "generous",
        "roomy",
        "large",
        "plenty",
      ];
      const hasSizeCompliments = sizePositiveWords.some((word) =>
        reviewsContent.includes(word)
      );
      if (hasSizeCompliments) {
        console.log(
          `🚫 Opportunité filtrée (contradiction taille): ${opp.title}`
        );
        return false;
      }
    }

    // Chercher des mots-clés dans les avis
    const oppKeywords = title
      .split(" ")
      .concat(description.split(" "))
      .filter((word) => word.length > 3);
    const foundKeywords = oppKeywords.filter((keyword) =>
      reviewsContent.includes(keyword)
    );

    const isValid = foundKeywords.length >= 1;
    if (!isValid) {
      console.log(`🚫 Opportunité filtrée: ${opp.title}`);
    }

    return isValid;
  });
}

function validatePainsAgainstReviews(
  pains: any[],
  reviewsContent: string
): any[] {
  if (!Array.isArray(pains)) return [];

  return pains.filter((pain) => {
    if (!pain.pain_point) return false;

    const painPoint = pain.pain_point.toLowerCase();

    // Points de friction interdits pour certains types de produits
    const forbiddenPains = ["montage", "assembly", "installation", "setup"];
    if (forbiddenPains.some((word) => painPoint.includes(word))) {
      console.log(`🚫 Point de friction filtré (interdit): ${pain.pain_point}`);
      return false;
    }

    // Chercher des termes négatifs dans les avis
    const painKeywords = painPoint.split(" ").filter((word) => word.length > 3);
    const foundKeywords = painKeywords.filter((keyword) =>
      reviewsContent.includes(keyword)
    );

    const isValid = foundKeywords.length >= 1;
    if (!isValid) {
      console.log(`🚫 Point de friction filtré: ${pain.pain_point}`);
    }

    return isValid;
  });
}

function validateAdvantagesAgainstReviews(
  advantages: any[],
  reviewsContent: string
): any[] {
  if (!Array.isArray(advantages)) return [];

  return advantages.filter((adv) => {
    if (!adv.advantage) return false;

    const advantage = adv.advantage.toLowerCase();
    const advKeywords = advantage.split(" ").filter((word) => word.length > 3);
    const foundKeywords = advKeywords.filter((keyword) =>
      reviewsContent.includes(keyword)
    );

    const isValid = foundKeywords.length >= 1;
    if (!isValid) {
      console.log(`🚫 Avantage filtré: ${adv.advantage}`);
    }

    return isValid;
  });
}

function validateKeywordsAgainstReviews(
  keywords: string[],
  reviewsContent: string
): string[] {
  if (!Array.isArray(keywords)) return [];

  return keywords
    .filter((keyword) => {
      const found = reviewsContent.includes(keyword.toLowerCase());
      if (!found) {
        console.log(`🚫 Mot-clé filtré: ${keyword}`);
      }
      return found;
    })
    .slice(0, 10);
}

// Fonctions de validation
function validateBusinessActions(actions: any[]): BusinessAction[] {
  return actions.slice(0, 5).map((action) => ({
    category: action.category || "conversion",
    priority: action.priority || "medium",
    title: action.title || "Action à définir",
    description: action.description || "",
    impact: action.impact || "Impact à mesurer",
    effort: action.effort || "moyen",
    implementation: action.implementation || "À définir",
    roi_estimate: action.roi_estimate,
  }));
}

function validateOpportunities(opportunities: any[]): OpportunityInsight[] {
  return opportunities.slice(0, 3).map((opp) => ({
    type: opp.type || "product",
    title: opp.title || "Opportunité identifiée",
    description: opp.description || "",
    evidence: opp.evidence || "Basé sur l'analyse des avis",
    revenue_potential: opp.revenue_potential || "À évaluer",
    next_steps: Array.isArray(opp.next_steps) ? opp.next_steps.slice(0, 3) : [],
  }));
}

function validatePainPoints(pains: any[]): CustomerPain[] {
  return pains.slice(0, 3).map((pain) => ({
    pain_point: pain.pain_point || "Point de friction identifié",
    frequency: pain.frequency || 1,
    severity: pain.severity || "minor",
    business_impact: pain.business_impact || "Impact à évaluer",
    solution: pain.solution || "Solution à définir",
    examples: Array.isArray(pain.examples) ? pain.examples.slice(0, 3) : [],
  }));
}

function validateAdvantages(advantages: any[]): CompetitiveAdvantage[] {
  return advantages.slice(0, 3).map((adv) => ({
    advantage: adv.advantage || "Avantage identifié",
    mentions: adv.mentions || 1,
    leverage_strategy: adv.leverage_strategy || "Stratégie à définir",
    marketing_angle: adv.marketing_angle || "Angle à développer",
  }));
}

function getEmptyAnalysis(): ReviewAnalysis {
  return {
    average_rating: 0,
    total_reviews: 0,
    rating_distribution: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    confidence_score: 0,
    immediate_actions: [
      {
        category: "marketing",
        priority: "high",
        title: "Collecter des avis clients",
        description: "Aucun avis disponible pour analyse",
        impact: "Base nécessaire pour optimisations futures",
        effort: "moyen",
        implementation:
          "Installer un widget d'avis (Loox, Judge.me) et relancer les clients satisfaits",
        roi_estimate: "Foundation pour +15-30% conversion future",
      },
    ],
    growth_opportunities: [],
    customer_pain_points: [],
    competitive_advantages: [],
    power_keywords: [],
    marketing_angles: [],
  };
}

function getFallbackAnalysis(
  reviews: Review[],
  averageRating: number,
  totalReviews: number,
  ratingDistribution: any,
  confidenceScore: number
): ReviewAnalysis {
  // Analyse simple si l'IA échoue
  const positiveReviews = reviews.filter((r) => r.rating >= 4).length;
  const negativeReviews = reviews.filter((r) => r.rating <= 2).length;

  const fallbackActions: BusinessAction[] = [];

  if (averageRating >= 4.5) {
    fallbackActions.push({
      category: "marketing",
      priority: "high",
      title: "Exploiter votre excellente réputation",
      description: `${positiveReviews} avis positifs sur ${totalReviews}`,
      impact: "+10-20% conversion",
      effort: "faible",
      implementation:
        "Afficher 'Note moyenne ${averageRating}/5' sur la homepage et fiches produits",
    });
  }

  if (negativeReviews > 0) {
    fallbackActions.push({
      category: "ux",
      priority: "medium",
      title: "Analyser les avis négatifs",
      description: `${negativeReviews} avis négatifs à investiguer`,
      impact: "Réduction des retours",
      effort: "moyen",
      implementation:
        "Contacter les clients insatisfaits pour comprendre les problèmes",
    });
  }

  return {
    average_rating: Math.round(averageRating * 10) / 10,
    total_reviews: totalReviews,
    rating_distribution: ratingDistribution,
    confidence_score: confidenceScore,
    immediate_actions: fallbackActions,
    growth_opportunities: [],
    customer_pain_points: [],
    competitive_advantages: [],
    power_keywords: ["qualité", "service", "satisfaction"],
    marketing_angles: ["Satisfaction client", "Qualité garantie"],
  };
}
