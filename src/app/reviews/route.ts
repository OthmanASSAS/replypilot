import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface CsvReviewRow {
  body: string;
  rating: string;
  title: string;
  reviewer_name: string;
  product_title: string;
  created_at: string;
}

export async function POST(req: NextRequest) {
  try {
    const { rows } = await req.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: "rows vides" }, { status: 400 });
    }

    const data = rows.map((r: CsvReviewRow) => ({
      shop_id: "mock-shop-123", // Using the same mock shop_id
      content: r.body ?? "",
      rating: r.rating ? Number(r.rating) : 0,
      title: r.title ?? null,
      reviewer: r.reviewer_name ?? null,
      product_title: r.product_title ?? null,
      created_at: r.created_at ? new Date(r.created_at) : new Date(),
    }));

    await prisma.review.createMany({ data });

    return NextResponse.json({ ok: true, count: data.length });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur inconnue" },
      { status: 500 },
    );
  }
}
