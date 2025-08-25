// filepath: /Users/oassas/Projets/replypilot/src/app/api/reviews/[id]/publish/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const reviewId = params.id;
    const { response } = await req.json();

    if (!response) {
      return NextResponse.json(
        { error: "Response content is required" },
        { status: 400 },
      );
    }

    // Simulate publishing to Shopify
    console.log(
      `Simulating publish to Shopify for review ${reviewId}: ${response}`,
    );

    // Update the response field in the database
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { response: response },
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error(`Failed to publish response for review ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to publish response" },
      { status: 500 },
    );
  }
}
