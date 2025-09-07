// /Users/oassas/Projets/replypilot/src/app/actions.ts
"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

// Schéma de validation
const schema = z.object({
  url: z.string().url({ message: "Veuillez entrer une URL valide." }),
  email: z.string().email({ message: "Veuillez entrer un email valide." }),
  stack: z.string().optional(),
  company_website: z.string().optional(), // Honeypot field
});

export async function submitLead(_: unknown, fd: FormData) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

  try {
    console.log("Form submission started...");

    const data = schema.parse(Object.fromEntries(fd));

    // Protection Honeypot
    if (data.company_website) {
      console.log("Honeypot field filled, blocking submission.");
      return { ok: true };
    }

    // SAUVEGARDE EN BASE DE DONNÉES - ESSENTIEL POUR LES LEADS !
    const lead = await prisma.lead.create({
      data: {
        url: data.url,
        email: data.email,
        stack: data.stack || "non-precise",
        ipAddress: ip,
      },
    });

    console.log("✅ Lead saved to database:", {
      id: lead.id,
      email: data.email,
      url: data.url,
      stack: data.stack,
      createdAt: lead.createdAt,
    });

    return { ok: true };
  } catch (e) {
    // Gestion des erreurs de validation Zod
    if (e instanceof z.ZodError) {
      console.error("❌ Validation error:", e.issues);
      return { error: e.issues[0].message };
    }

    // Gestion des autres erreurs (y compris DB)
    console.error("❌ Lead submission error:", e);
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }
}
