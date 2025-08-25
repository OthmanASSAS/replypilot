/*
  Warnings:

  - You are about to drop the column `body` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `insertedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `productTitle` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `reviewerName` on the `Review` table. All the data in the column will be lost.
  - Added the required column `content` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "response" TEXT,
    "original_review_id" TEXT,
    "title" TEXT,
    "reviewer" TEXT,
    "product_title" TEXT,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_Review" ("created_at", "id", "rating", "title") SELECT "created_at", "id", "rating", "title" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review_original_review_id_key" ON "Review"("original_review_id");
CREATE INDEX "Review_shop_id_idx" ON "Review"("shop_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
