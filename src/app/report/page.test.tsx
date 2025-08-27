import { render, screen } from "@testing-library/react";
import { vi, Mock } from "vitest"; // Import Mock from vitest
import React from "react";
import ReportPage from "./page";
import * as NextNavigation from "next/navigation";

// Mock the useSearchParams hook
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
}));

describe("ReportPage", () => {
  const mockSearchParams = new URLSearchParams({
    url: "http://example.com",
    loadTime: "1234ms",
    title: "Example Title",
    metaDescription: "Example Meta Description",
    h1: "Example H1",
    h2: "Example H2",
    imageCount: "5",
    language: "fr",
  });

  beforeEach(() => {
    (NextNavigation.useSearchParams as Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the report page with correct data", () => {
    render(<ReportPage />);

    expect(
      screen.getByText(/Rapport d'Analyse pour : http:\/\/example\.com/),
    ).toBeInTheDocument();
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

  it("renders with missing data gracefully", () => {
    const missingSearchParams = new URLSearchParams({
      url: "http://example.com/missing",
    });
    (NextNavigation.useSearchParams as Mock).mockReturnValue(
      missingSearchParams,
    );

    render(<ReportPage />);

    expect(
      screen.getByText("Rapport d'Analyse pour : http://example.com/missing"),
    ).toBeInTheDocument();
    expect(screen.getByText("Temps de chargement :")).toBeInTheDocument(); // Should show empty if not provided
    expect(screen.getByText("Titre de la page :")).toBeInTheDocument();
  });
});
