"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function subscribeNewsletter(prevState: any, formData: FormData): Promise<{ ok?: boolean; error?: string }> {
  try {
    const email = formData.get("email") as string;

    if (!email || !email.includes("@")) {
      return { error: "Email invalide" };
    }

    // Anti-bot honeypot check
    const honeypot = formData.get("company_website") as string;
    if (honeypot) {
      return { error: "Erreur de validation" };
    }

    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIP = headersList.get("x-real-ip");
    const ipAddress = forwardedFor?.split(",")[0] || realIP || "unknown";

    // Check if email already exists and handle silently for security
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email }
    });

    if (!existingSubscription) {
      // Only create if email doesn't exist
      await prisma.newsletter.create({
        data: {
          email,
          ipAddress,
        },
      });
    }
    
    // Always return success to avoid revealing existing subscriptions

    return { ok: true };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { error: "Erreur lors de l'inscription" };
  }
}