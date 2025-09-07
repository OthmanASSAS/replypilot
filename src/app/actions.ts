// /Users/oassas/Projets/replypilot/src/app/actions.ts
"use server";

import { z } from "zod";
import { headers } from "next/headers";

// Schéma de validation
const schema = z.object({
  url: z.string().url({ message: "Veuillez entrer une URL valide." }),
  email: z.string().email({ message: "Veuillez entrer un email valide." }),
  stack: z.string().optional(),
  company_website: z.string().optional(), // Honeypot field
});

export async function submitLead(_: unknown, fd: FormData) {
  try {
    console.log("Form submission started...");

    const data = schema.parse(Object.fromEntries(fd));

    // Protection Honeypot
    if (data.company_website) {
      console.log("Honeypot field filled, blocking submission.");
      return { ok: true };
    }

    // Simuler la sauvegarde pour éviter les erreurs de base de données
    console.log("✅ Lead submission received:", {
      email: data.email,
      url: data.url,
      stack: data.stack,
    });

    // Pour l'instant, on simule le succès
    // TODO: Réactiver la sauvegarde en base une fois la DB configurée
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
  }
}
