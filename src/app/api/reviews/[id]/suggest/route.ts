// filepath: /Users/oassas/Projets/replypilot/src/app/api/reviews/[id]/suggest/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Import prisma
import OpenAI from "openai"; // Import OpenAI

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const reviewId = params.id;

    // Fetch the review from the database
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Construct a simple prompt for the LLM
    const prompt = `You are a helpful assistant for an e-commerce store.\n    Please provide a concise and polite response to the following customer review.\n    Review Title: ${review.title || "N/A"}\n    Review Content: ${review.content}\n    Review Rating: ${review.rating}/5\n\n    Your response should be professional and address the customer's feedback.`;

    // Call the LLM API
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // Or another suitable Groq model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150,
    });

    const suggestion =
      completion.choices[0]?.message?.content || "No suggestion generated.";

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error(
      `Failed to suggest a response for review ${(await context.params).id}:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to suggest a response" },
      { status: 500 },
    );
  }
}
