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
      }),
      close: vi.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: vi.fn().mockResolvedValue(mockPage),
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
      expect(data.data.title).toBe("Test Title");
      expect(data.data.loadTime).toMatch(/\d+ms/);
      expect(data.analysisId).toMatch(/^analysis_\d+_/);
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
