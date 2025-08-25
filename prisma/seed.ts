// filepath: /Users/oassas/Projets/replypilot/prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma";
import * as fs from "fs";
import * as path from "path";
import Papa from "papaparse";

const prisma = new PrismaClient();

interface CsvRow {
  review_id: string;
  title: string;
  body: string;
  rating: string;
  reviewer: string;
  product_title: string;
  created_at: string;
}

async function main() {
  console.log(`Start seeding ...`);

  const filePath = path.join(__dirname, "../public/sample.csv");
  const csvFile = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse<CsvRow>(csvFile, {
    header: true,
    skipEmptyLines: true,
  });

  for (const row of parsed.data) {
    const review = await prisma.review.create({
      data: {
        shop_id: "mock-shop-123", // Mocked shop_id as discussed
        content: row.body,
        rating: parseInt(row.rating, 10),
        original_review_id: row.review_id,
        title: row.title,
        reviewer: row.reviewer,
        product_title: row.product_title,
        created_at: new Date(row.created_at),
      },
    });
    console.log(`Created review with id: ${review.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
