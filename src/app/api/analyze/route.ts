import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { isValidUrl, generateAnalysisId } from "@/lib/analyze-helpers";

export async function POST(request: NextRequest) {
  try {
    const { url, email } = await request.json();

    // Validation basique
    if (!url || !email) {
      return NextResponse.json(
        { error: "URL and email are required" },
        { status: 400 },
      );
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 },
      );
    }

    // Lancement du browser Puppeteer avec Chrome local
    const browser = await puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();

      // Mesure du temps de chargement
      const startTime = Date.now();

      // Navigation vers l'URL
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      const loadTime = Date.now() - startTime;

      // Extraction des données basiques
      const pageData = await page.evaluate(() => {
        // Titre de la page
        const title = document.title || "No title found";

        // Meta description
        const metaDescription =
          document
            .querySelector('meta[name="description"]')
            ?.getAttribute("content") || "No description found";

        // H1
        const h1Elements = Array.from(document.querySelectorAll("h1")).map(
          (h1) => h1.textContent?.trim() || "",
        );
        const h1 = h1Elements.filter((text) => text.length > 0);

        // H2
        const h2Elements = Array.from(document.querySelectorAll("h2")).map(
          (h2) => h2.textContent?.trim() || "",
        );
        const h2 = h2Elements.filter((text) => text.length > 0);

        // Nombre d'images
        const imageCount = document.querySelectorAll("img").length;

        // Langue
        const language = document.documentElement.lang || "Not specified";

        return {
          title,
          metaDescription,
          h1,
          h2,
          imageCount,
          language,
        };
      });

      // Fermeture du browser
      await browser.close();

      // Réponse réussie
      return NextResponse.json({
        success: true,
        data: {
          url,
          loadTime: `${loadTime}ms`,
          ...pageData,
        },
        analysisId: generateAnalysisId(),
      });
    } catch (error) {
      await browser.close();
      throw error;
    }
  } catch (error) {
    console.error("Analysis error:", error);

    return NextResponse.json(
      {
        error: "Failed to analyze website",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Optionnel : GET pour tester rapidement
export async function GET() {
  return NextResponse.json({
    message:
      'Use POST method with { url: "https://example.com", email: "user@example.com" }',
  });
}
