import { describe, it, expect } from "vitest";
import {
  isValidUrl,
  generateAnalysisId,
  formatLoadTime,
  sanitizeUrl,
} from "./analyze-helpers";

describe("Analyze Helper Functions", () => {
  describe("isValidUrl", () => {
    it("should return true for valid HTTP URLs", () => {
      expect(isValidUrl("http://example.com")).toBe(true);
    });

    it("should return true for valid HTTPS URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
    });

    it("should return false for invalid URLs", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
    });

    it("should return false for non-HTTP/HTTPS URLs", () => {
      expect(isValidUrl("ftp://example.com")).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(isValidUrl("")).toBe(false);
    });

    it("should return false for null", () => {
      expect(isValidUrl(null as unknown as string)).toBe(false);
    });
  });

  describe("generateAnalysisId", () => {
    it("should generate a unique analysis ID with correct format", () => {
      const id1 = generateAnalysisId();
      const id2 = generateAnalysisId();

      expect(id1).toMatch(/^analysis_\d+_[a-z0-9]{9}$/);
      expect(id2).toMatch(/^analysis_\d+_[a-z0-9]{9}$/);
      expect(id1).not.toBe(id2);
    });

    it("should include timestamp in the ID", () => {
      const id = generateAnalysisId();
      const timestamp = id.split("_")[1];

      expect(Number(timestamp)).toBeGreaterThan(0);
      expect(Number(timestamp)).toBeLessThanOrEqual(Date.now());
    });

    it("should generate different IDs on subsequent calls", () => {
      const ids = new Set();

      // Générer plusieurs IDs pour tester l'unicité
      for (let i = 0; i < 100; i++) {
        ids.add(generateAnalysisId());
      }

      expect(ids.size).toBe(100);
    });
  });

  describe("formatLoadTime", () => {
    it("should format milliseconds correctly", () => {
      expect(formatLoadTime(1500)).toBe("1500ms");
      expect(formatLoadTime(42)).toBe("42ms");
      expect(formatLoadTime(0)).toBe("0ms");
    });
  });

  describe("sanitizeUrl", () => {
    it("should return valid URLs unchanged", () => {
      expect(sanitizeUrl("https://example.com")).toBe("https://example.com/");
      expect(sanitizeUrl("http://example.com/path")).toBe(
        "http://example.com/path",
      );
    });

    it("should return invalid URLs as-is", () => {
      expect(sanitizeUrl("invalid-url")).toBe("invalid-url");
      expect(sanitizeUrl("")).toBe("");
    });
  });
});
