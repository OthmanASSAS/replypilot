// filepath: /Users/oassas/Projets/replypilot/src/lib/prisma.test.ts
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";

// Create a mock for the prisma object
const mockPrisma = {
  analysis: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    findMany: vi.fn(),
  },
  $disconnect: vi.fn(),
};

// Mock the src/lib/prisma module to return our mockPrisma object
vi.mock("./prisma", () => ({
  prisma: mockPrisma,
}));

describe("Prisma Client", () => {
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    originalNodeEnv = process.env.NODE_ENV;
    vi.resetModules(); // Reset modules to ensure fresh import of prisma.ts
  });

  afterEach(() => {
    if (originalNodeEnv !== undefined) {
      vi.stubEnv("NODE_ENV", originalNodeEnv);
    }
  });

  it("should be an instance of the mocked prisma client", async () => {
    const { prisma } = await import("./prisma");
    expect(prisma).toBeDefined();
    expect(prisma.analysis).toBeDefined();
    expect(prisma.analysis.findUnique).toBeInstanceOf(Function);
    expect(prisma.analysis.create).toBeInstanceOf(Function);
    expect(prisma.analysis.update).toBeInstanceOf(Function);
    expect(prisma.analysis.findMany).toBeInstanceOf(Function);
  });

  it("should be a singleton instance", async () => {
    const { prisma } = await import("./prisma");
    const { prisma: prisma2 } = await import("./prisma");
    expect(prisma).toBe(prisma2);
  });

  // Example of how to test a method call
  it("should call findMany on analysis model", async () => {
    const { prisma } = await import("./prisma");
    await prisma.analysis.findMany();
    expect(mockPrisma.analysis.findMany).toHaveBeenCalledTimes(1);
  });
});
