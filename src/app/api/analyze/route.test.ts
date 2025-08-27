import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST, GET } from "./route";
import { NextRequest } from "next/server";

// Mock puppeteer with factory function
vi.mock("puppeteer", () => ({
  default: {
    launch: vi.fn(),
  },
}));

// Mock console.error pour éviter le bruit dans les tests
console.error = vi.fn();

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    analysis: {
      create: vi.fn().mockResolvedValue({
        id: "test-analysis-id",
        url: "https://example.com",
        email: "test@example.com",
        status: "completed",
        miniReport: {},
        createdAt: new Date(),
      }),
    },
  },
}));

// Mock analyze helpers
vi.mock("@/lib/analyze-helpers", () => ({
  isValidUrl: vi.fn().mockReturnValue(true),
}));

describe("API Analyze", () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Import et mock puppeteer dynamiquement
    const puppeteer = (await vi.importMock("puppeteer")) as {
      default: { launch: ReturnType<typeof vi.fn> };
    };

    const mockPage = {
      goto: vi.fn().mockResolvedValue(null),
      evaluate: vi.fn().mockResolvedValue({
        title: "Test Title",
        metaDescription: "Test Description",
        h1: ["Test H1"],
        h2: ["Test H2"],
        imageCount: 5,
        language: "en",
        reviews: [],
      }),
      close: vi.fn().mockResolvedValue(null),
    };

    // Mock pour page Loox iframe
    const mockLooxPage = {
      goto: vi.fn().mockResolvedValue(null),
      evaluate: vi.fn().mockResolvedValue([
        {
          platform: "Loox",
          author: "Test User",
          rating: 5,
          body: "Great product!",
        },
      ]),
      close: vi.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: vi
        .fn()
        .mockResolvedValueOnce(mockPage) // Première page (page principale)
        .mockResolvedValueOnce(mockLooxPage), // Deuxième page (iframe Loox)
      close: vi.fn().mockResolvedValue(null),
    };

    puppeteer.default.launch.mockResolvedValue(mockBrowser);
  });

  describe("POST /api/analyze", () => {
    it("should return 400 if URL is missing", async () => {
      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com" }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("URL and email are required");
    });

    it("should return 400 if email is missing", async () => {
      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({ url: "https://example.com" }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("URL and email are required");
    });

    it("should return 400 for invalid URL format", async () => {
      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          url: "invalid-url",
          email: "test@example.com",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid URL format");
    });

    it("should return successful analysis for valid request", async () => {
      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          url: "https://example.com",
          email: "test@example.com",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.analysisId).toBeDefined();
      expect(typeof data.analysisId).toBe("string");
    });

    it("should scrape Loox reviews from iframe successfully", async () => {
      // Mock pour simuler une page avec iframe Loox
      const puppeteer = (await vi.importMock("puppeteer")) as {
        default: { launch: ReturnType<typeof vi.fn> };
      };

      const mockMainPage = {
        goto: vi.fn().mockResolvedValue(null),
        evaluate: vi
          .fn()
          .mockResolvedValueOnce("https://loox.io/widget/test/reviews/123") // Pour détecter l'iframe
          .mockResolvedValueOnce({
            // Pour les données de page
            title: "Test Product",
            metaDescription: "Test Description",
            h1: ["Product Title"],
            h2: [],
            imageCount: 10,
            language: "en",
            reviews: [],
          }),
        close: vi.fn().mockResolvedValue(null),
      };

      const mockLooxPage = {
        goto: vi.fn().mockResolvedValue(null),
        evaluate: vi.fn().mockResolvedValue([
          {
            platform: "Loox",
            author: "John Doe",
            rating: 5,
            body: "Amazing product, highly recommend!",
          },
          {
            platform: "Loox",
            author: "Jane Smith",
            rating: 4,
            body: "Good quality, fast shipping",
          },
        ]),
        close: vi.fn().mockResolvedValue(null),
      };

      const mockBrowser = {
        newPage: vi
          .fn()
          .mockResolvedValueOnce(mockMainPage)
          .mockResolvedValueOnce(mockLooxPage),
        close: vi.fn().mockResolvedValue(null),
      };

      puppeteer.default.launch.mockResolvedValue(mockBrowser);

      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          url: "https://example.com/product",
          email: "test@example.com",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.analysisId).toBeDefined();

      // Vérifier que l'iframe Loox a été détectée et scrapée
      expect(mockLooxPage.goto).toHaveBeenCalledWith(
        "https://loox.io/widget/test/reviews/123",
        expect.any(Object),
      );
      expect(mockLooxPage.evaluate).toHaveBeenCalled();
    });

    it("should handle puppeteer errors gracefully", async () => {
      // Mock puppeteer pour throw une erreur
      const puppeteer = (await vi.importMock("puppeteer")) as {
        default: { launch: ReturnType<typeof vi.fn> };
      };
      puppeteer.default.launch.mockRejectedValueOnce(
        new Error("Puppeteer failed"),
      );

      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          url: "https://example.com",
          email: "test@example.com",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to analyze website");
    });
  });

  describe("GET /api/analyze", () => {
    it("should return instructions for POST method", async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toContain("Use POST method");
    });
  });
});
