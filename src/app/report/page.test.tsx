import { render, screen, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest"; // Import Mock from vitest
import React from "react";
import ReportPage from "./page";
import * as NextNavigation from "next/navigation";

// Mock the useSearchParams hook
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
}));

// Mock fetch for API calls
global.fetch = vi.fn();

describe("ReportPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the report page with correct data", async () => {
    // Mock useSearchParams to return an id
    const mockSearchParams = {
      get: vi.fn().mockReturnValue("test-analysis-123")
    };
    (NextNavigation.useSearchParams as Mock).mockReturnValue(mockSearchParams);

    // Mock fetch to return analysis data
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        id: "test-analysis-123",
        url: "http://example.com",
        email: "test@example.com",
        status: "completed",
        miniReport: {
          loadTime: "1234ms",
          title: "Example Title",
          metaDescription: "Example Meta Description", 
          h1: ["Example H1"],
          h2: ["Example H2"],
          imageCount: 5,
          language: "fr",
          reviews: []
        },
        createdAt: new Date().toISOString()
      })
    });

    render(<ReportPage />);

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText(/Rapport d'Analyse pour : http:\/\/example\.com/)).toBeInTheDocument();
    });

    expect(screen.getByText("Temps de chargement :")).toBeInTheDocument();
    expect(screen.getByText("1234ms")).toBeInTheDocument();
    expect(screen.getByText("Titre de la page :")).toBeInTheDocument();
    expect(screen.getByText("Example Title")).toBeInTheDocument();
    expect(screen.getByText("Meta Description :")).toBeInTheDocument();
    expect(screen.getByText("Example Meta Description")).toBeInTheDocument();
    expect(screen.getByText("Titres H1 :")).toBeInTheDocument();
    expect(screen.getByText("Example H1")).toBeInTheDocument();
    expect(screen.getByText("Titres H2 :")).toBeInTheDocument();
    expect(screen.getByText("Example H2")).toBeInTheDocument();
    expect(screen.getByText("Nombre d'images :")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Langue :")).toBeInTheDocument();
    expect(screen.getByText("fr")).toBeInTheDocument();
  });

  it("renders with missing data gracefully", async () => {
    // Mock useSearchParams to return no id
    const mockSearchParams = {
      get: vi.fn().mockReturnValue(null)
    };
    (NextNavigation.useSearchParams as Mock).mockReturnValue(mockSearchParams);

    render(<ReportPage />);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText("Error: No analysis ID provided")).toBeInTheDocument();
    });
  });
});
