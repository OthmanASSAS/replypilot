// filepath: /Users/oassas/Projets/replypilot/src/app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ReviewPayloadRow {
  body: string;
  rating: string;
  title: string;
  reviewer_name: string;
  product_title: string;
  created_at: string;
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { rows } = await req.json();

    if (!rows || !Array.isArray(rows)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const result = await prisma.review.createMany({
      data: rows.map((row: ReviewPayloadRow) => ({
        shop_id: "mock-shop-123", // Using the same mock shop_id
        content: row.body,
        rating: parseInt(row.rating, 10),
        title: row.title,
        reviewer: row.reviewer_name,
        product_title: row.product_title,
        created_at: new Date(row.created_at),
      })),
    });

    return NextResponse.json({ count: result.count });
  } catch (error) {
    console.error("Failed to ingest reviews:", error);
    return NextResponse.json(
      { error: "Failed to ingest reviews" },
      { status: 500 },
    );
  }
}
