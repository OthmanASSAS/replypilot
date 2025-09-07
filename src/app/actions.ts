// /Users/oassas/Projets/replypilot/src/app/actions.ts
"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PostHog } from "posthog-node";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialiser Redis et Ratelimit
// Assurez-vous que les variables d'environnement sont définies dans votre projet Vercel
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"), // 3 requêtes par minute
  analytics: true,
});

// Schéma de validation mis à jour
const schema = z.object({
  url: z.string().url({ message: "Veuillez entrer une URL valide." }),
  email: z.string().email({ message: "Veuillez entrer un email valide." }),
  stack: z.string().optional(),
  company_website: z.string().optional(), // Honeypot field
});

// Using shared Prisma instance from @/lib/prisma

// Initialiser PostHog côté serveur
function PostHogClient() {
  const posthog = new PostHog(process.env.POSTHOG_API_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
  return posthog;
}

export async function submitLead(_: any, fd: FormData) {
  const posthog = PostHogClient();
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

  try {
    // 1. Rate Limiting
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      posthog.capture({ distinctId: ip, event: "rate_limit_triggered" });
      return { error: "Trop de tentatives. Veuillez réessayer dans un instant." };
    }

    const data = schema.parse(Object.fromEntries(fd));

    // 2. Protection Honeypot
    if (data.company_website) {
      console.log("Honeypot field filled, blocking submission.");
      return { ok: true };
    }

    // 3. Sauvegarde en base de données
    await prisma.lead.create({
      data: {
        url: data.url,
        email: data.email,
        stack: data.stack,
        ipAddress: ip,
      },
    });

    console.log("✅ Lead saved:", { email: data.email, url: data.url, stack: data.stack });

    // 4. Envoyer l'événement à PostHog
    posthog.capture({
      distinctId: data.email,
      event: "lead_submitted",
      properties: {
        email: data.email,
        url: data.url,
        stack: data.stack,
        $ip: ip,
      },
    });

    // 5. Retourner un état de succès
    return { ok: true };
  } catch (e) {
    // Gestion des erreurs de validation Zod
    if (e instanceof z.ZodError) {
      console.error("❌ Validation error:", e.issues);
      return { error: e.issues[0].message };
    }

    // Gestion des autres erreurs
    console.error("❌ Lead submission error:", e);
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  } finally {
    // S'assurer que les événements sont envoyés avant la fin de l'exécution
    await posthog.shutdown();
  }
}