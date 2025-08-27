import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./page";

// Mock useRouter
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock fetch
global.fetch = vi.fn(
  () =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          data: {
            url: "https://example.com",
            loadTime: "1000ms",
            title: "Test Title",
            metaDescription: "Test Description",
            h1: ["Test H1"],
            h2: ["Test H2"],
            imageCount: 5,
            language: "en",
          },
        }),
    }) as unknown as Promise<Response>,
);

describe("Home Page", () => {
  it("should redirect to report page on successful analysis", async () => {
    render(<Home />);

    // Fill the form
    fireEvent.change(screen.getByLabelText(/URL de votre site web/i), {
      target: { value: "https://example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Votre email professionnel/i), {
      target: { value: "test@example.com" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Analyser mon site gratuitement/i));

    // Wait for the redirection
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        "/report?url=https%3A%2F%2Fexample.com&loadTime=1000ms&title=Test+Title&metaDescription=Test+Description&h1=Test+H1&h2=Test+H2&imageCount=5&language=en",
      );
    });
  });
});
