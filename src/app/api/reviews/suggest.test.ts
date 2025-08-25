// filepath: /Users/oassas/Projets/replypilot/src/app/api/reviews/suggest.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server"; // Removed NextResponse
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

// Mock prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    review: {
      findUnique: vi.fn(),
    },
  },
}));

// Mock OpenAI (Groq)
// We need a single mock for the create method that can be controlled
const mockCreateCompletion = vi.fn();

vi.mock("openai", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    chat: {
      completions: {
        create: mockCreateCompletion,
      },
    },
  })),
}));

describe("POST /api/reviews/[id]/suggest", () => {
  let mockRequest: NextRequest;
  let mockContext: { params: Promise<{ id: string }> };

  beforeEach(() => {
    vi.clearAllMocks(); // Clears all mocks, including mockCreateCompletion

    mockRequest = {} as NextRequest;
    mockContext = { params: Promise.resolve({ id: "test-review-id" }) };

    // Reset mock implementation for createCompletion for each test
    mockCreateCompletion.mockResolvedValue({
      choices: [
        {
          message: {
            content: "This is a generated suggestion.",
          },
        },
      ],
    });
  });

  it("should return 404 if review is not found", async () => {
    (prisma.review.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(
      null,
    );

    const { POST } = await import("./[id]/suggest/route");
    const response = await POST(mockRequest, mockContext);

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      error: "Review not found",
    });
  });

  it("should return a suggestion for a valid review", async () => {
    const mockReview = {
      id: "test-review-id",
      title: "Great Product",
      content: "I love this product!",
      rating: 5,
    };
    (prisma.review.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockReview,
    );

    const { POST } = await import("./[id]/suggest/route");
    const response = await POST(mockRequest, mockContext);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      suggestion: "This is a generated suggestion.",
    });
    expect(prisma.review.findUnique).toHaveBeenCalledWith({
      where: { id: "test-review-id" },
    });
    expect(mockCreateCompletion).toHaveBeenCalledTimes(1);
    expect(mockCreateCompletion).toHaveBeenCalledWith({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: expect.stringContaining(
            "Review Content: I love this product!",
          ),
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });
  });

  it("should return an error if AI suggestion fails", async () => {
    const mockReview = {
      id: "test-review-id",
      title: "Great Product",
      content: "I love this product!",
      rating: 5,
    };
    (prisma.review.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockReview,
    );
    mockCreateCompletion.mockRejectedValue(new Error("AI error")); // Set mockRejectedValue directly

    const { POST } = await import("./[id]/suggest/route");
    const response = await POST(mockRequest, mockContext);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to suggest a response",
    });
  });
});
