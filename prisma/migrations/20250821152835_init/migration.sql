-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER,
    "title" TEXT,
    "body" TEXT,
    "reviewerName" TEXT,
    "productTitle" TEXT,
    "created_at" DATETIME,
    "insertedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
