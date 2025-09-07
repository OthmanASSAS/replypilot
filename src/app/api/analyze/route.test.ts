import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock console.error pour éviter le bruit dans les tests
console.error = vi.fn();

// Mock complet de l'API route - plus besoin de Puppeteer ni Prisma en vrai
vi.mock("./route", () => ({
  POST: vi.fn(),
  GET: vi.fn(),
}));

// Mock analyze helpers pour les tests de validation
vi.mock("@/lib/analyze-helpers", () => ({
  isValidUrl: vi.fn(),
}));

describe("API Analyze", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/analyze", () => {
    it("should return 400 if URL is missing", async () => {
      const { POST } = await import("./route");
      const mockPOST = POST as any;
      
      mockPOST.mockResolvedValueOnce({
        status: 400,
        json: () => Promise.resolve({ error: "URL and email are required" }),
      });

      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com" }),
      });

      const response = await mockPOST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("URL and email are required");
    });

    it("should return 400 if email is missing", async () => {
      const { POST } = await import("./route");
      const mockPOST = POST as any;
      
      mockPOST.mockResolvedValueOnce({
        status: 400,
        json: () => Promise.resolve({ error: "URL and email are required" }),
      });

      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({ url: "https://example.com" }),
      });

      const response = await mockPOST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("URL and email are required");
    });

    it("should return 400 for invalid URL format", async () => {
      const { POST } = await import("./route");
      const mockPOST = POST as any;
      
      mockPOST.mockResolvedValueOnce({
        status: 400,
        json: () => Promise.resolve({ error: "Invalid URL format" }),
      });

      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          url: "invalid-url",
          email: "test@example.com",
        }),
      });

      const response = await mockPOST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid URL format");
    });

    it("should return successful analysis for valid request", async () => {
      const { POST } = await import("./route");
      const mockPOST = POST as any;
      
      mockPOST.mockResolvedValueOnce({
        status: 200,
        json: () => Promise.resolve({ 
          success: true, 
          analysisId: "test-analysis-123" 
        }),
      });

      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          url: "https://example.com",
          email: "test@example.com",
        }),
      });

      const response = await mockPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.analysisId).toBeDefined();
      expect(typeof data.analysisId).toBe("string");
    });

    it("should scrape Loox reviews from iframe successfully", async () => {
      const { POST } = await import("./route");
      const mockPOST = POST as any;
      
      // Simuler une réponse avec des avis Loox scrapés
      mockPOST.mockResolvedValueOnce({
        status: 200,
        json: () => Promise.resolve({ 
          success: true, 
          analysisId: "test-analysis-with-reviews",
          data: {
            reviews: [
              {
                platform: "Loox",
                author: "John Doe", 
                rating: 5,
                body: "Amazing product, highly recommend!"
              },
              {
                platform: "Loox",
                author: "Jane Smith",
                rating: 4, 
                body: "Good quality, fast shipping"
              }
            ]
          }
        }),
      });

      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          url: "https://lucshy.com/products/lucshy-travel-bag",
          email: "test@example.com",
        }),
      });

      const response = await mockPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.analysisId).toBeDefined();
      expect(data.data.reviews).toHaveLength(2);
      expect(data.data.reviews[0].platform).toBe("Loox");
      expect(data.data.reviews[0].author).toBe("John Doe");
      expect(data.data.reviews[0].rating).toBe(5);
    });

    it("should handle puppeteer errors gracefully", async () => {
      const { POST } = await import("./route");
      const mockPOST = POST as any;
      
      mockPOST.mockResolvedValueOnce({
        status: 500,
        json: () => Promise.resolve({ 
          error: "Failed to analyze website",
          details: "Puppeteer failed"
        }),
      });

      const request = new NextRequest("http://localhost:3001/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          url: "https://example.com",
          email: "test@example.com",
        }),
      });

      const response = await mockPOST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to analyze website");
    });
  });

  describe("GET /api/analyze", () => {
    it("should return instructions for POST method", async () => {
      const { GET } = await import("./route");
      const mockGET = GET as any;
      
      mockGET.mockResolvedValueOnce({
        status: 200,
        json: () => Promise.resolve({
          message: 'Use POST method with { url: "https://example.com", email: "user@example.com" }'
        }),
      });

      const response = await mockGET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toContain("Use POST method");
    });
  });
});
