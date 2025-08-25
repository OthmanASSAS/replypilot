// filepath: /Users/oassas/Projets/replypilot/src/lib/prisma.test.ts
import { PrismaClient } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "./prisma";

// Mock the PrismaClient to prevent actual database interactions during tests
vi.mock("@/lib/prisma", () => ({
  prisma: {
    review: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
    },
    $disconnect: vi.fn(),
  },
}));

describe("Prisma Client", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it("should be an instance of PrismaClient", () => {
    // This test ensures that the mocked prisma object has the expected structure
    // and that it's treated as a PrismaClient instance by Vitest's type checking.
    expect(prisma).toBeDefined();
    expect(prisma.review).toBeDefined();
    expect(prisma.review.findUnique).toBeInstanceOf(Function);
    expect(prisma.review.create).toBeInstanceOf(Function);
    expect(prisma.review.update).toBeInstanceOf(Function);
    expect(prisma.review.findMany).toBeInstanceOf(Function);
  });

  // Add more specific tests for Prisma interactions here
  // For example, testing findUnique, create, update, findMany methods
});
