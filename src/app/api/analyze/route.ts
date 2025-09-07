import { NextRequest, NextResponse } from "next/server";
// import puppeteer from "puppeteer";
// import { isValidUrl } from "@/lib/analyze-helpers";
// import { prisma } from "@/lib/prisma";
// import { analyzeReviews, type Review } from "@/lib/groq-analysis";

export async function POST(request: NextRequest) {
  // Temporarily disabled for build
  return NextResponse.json({ error: "API temporarily disabled" }, { status: 503 });
  
  try {
    const { url, email } = await request.json();

    // Validation basique
    if (!url || !email) {
      return NextResponse.json(
        { error: "URL and email are required" },
        { status: 400 }
      );
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
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
        timeout: 60000,
      });

      // Attendre intelligemment les widgets d'avis (approche multi-plateforme)
      console.log("Searching for review widgets...");

      try {
        // Essayer de détecter différents widgets d'avis avec attente plus longue
        await Promise.race([
          page.waitForSelector(".grid-item-wrap", {
            timeout: 30000,
            visible: true,
          }), // Loox
          page.waitForSelector(".jdgm-rev", { timeout: 30000, visible: true }), // Judge.me
          page.waitForSelector(".spr-review", {
            timeout: 30000,
            visible: true,
          }), // Shopify
          page.waitForSelector(".yotpo-review", {
            timeout: 30000,
            visible: true,
          }), // Yotpo
        ]);
        console.log("Review widget detected!");

        // Attendre encore un peu pour le JavaScript et lazy loading
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch {
        console.log(
          "No review widget detected initially, trying scroll trigger..."
        );

        // Stratégie fallback : scroll pour trigger lazy loading
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight / 2);
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Scroll jusqu'en bas
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Dernière tentative de détection après scroll
        try {
          await Promise.race([
            page.waitForSelector(".grid-item-wrap", {
              timeout: 10000,
              visible: true,
            }),
            page.waitForSelector(".jdgm-rev", {
              timeout: 10000,
              visible: true,
            }),
            page.waitForSelector(".spr-review", {
              timeout: 10000,
              visible: true,
            }),
            page.waitForSelector(".yotpo-review", {
              timeout: 10000,
              visible: true,
            }),
          ]);
          console.log("Review widget found after scroll!");
        } catch {
          console.log(
            "No review widgets found even after scroll, proceeding without reviews."
          );
        }
      }

      const loadTime = Date.now() - startTime;

      // Vérifier s'il y a des iframes Loox et les traiter séparément
      let looxReviews: Array<{
        platform: string;
        author: string;
        rating: number;
        body: string;
      }> = [];
      try {
        const looxIframeUrl = await page.evaluate(() => {
          const iframe = document.querySelector(
            '#looxReviewsFrame, iframe[src*="loox.io"]'
          );
          return iframe ? iframe.getAttribute("src") : null;
        });

        if (looxIframeUrl) {
          console.log(
            "Found Loox iframe, scraping content directly from:",
            looxIframeUrl
          );
          const looxPage = await browser.newPage();
          try {
            await looxPage.goto(looxIframeUrl, {
              waitUntil: "networkidle0",
              timeout: 30000,
            });

            // Attendre que le contenu soit chargé
            await new Promise((resolve) => setTimeout(resolve, 3000));

            looxReviews = await looxPage.evaluate(() => {
              console.log("Inside iframe evaluation");
              const reviews: Array<{
                platform: string;
                author: string;
                rating: number;
                body: string;
              }> = [];

              // Essayer différents sélecteurs
              const selectors = [
                ".grid-item-wrap",
                ".loox-review",
                "[data-review]",
                ".review-item",
                ".review",
                '[class*="review"]',
              ];

              let foundElements: Element[] = [];
              for (const selector of selectors) {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                  console.log(
                    `Found ${elements.length} elements with selector: ${selector}`
                  );
                  foundElements = Array.from(elements);
                  break;
                }
              }

              if (foundElements.length === 0) {
                console.log(
                  "No review elements found, checking page content..."
                );
                console.log("Page title:", document.title);
                console.log(
                  "Body content preview:",
                  document.body.textContent.substring(0, 200)
                );
                return [];
              }

              foundElements.forEach((review, index) => {
                console.log(`Processing review ${index + 1}`);

                const authorSelectors = [
                  ".block.title",
                  ".review-author",
                  ".author-name",
                  ".name",
                ];
                const bodySelectors = [
                  ".pre-wrap.main-text",
                  ".review-text",
                  ".review-body",
                  ".text",
                ];
                const ratingSelectors = [
                  'ul > li > svg[data-lx-fill="full"]',
                  ".star-filled",
                  ".loox-star-filled",
                  ".star",
                ];

                let author = "";
                for (const sel of authorSelectors) {
                  const elem = review.querySelector(sel);
                  if (elem) {
                    author = elem.textContent?.trim() || "";
                    if (author) break;
                  }
                }

                let body = "";
                for (const sel of bodySelectors) {
                  const elem = review.querySelector(sel);
                  if (elem) {
                    body = elem.textContent?.trim() || "";
                    if (body) break;
                  }
                }

                let rating = 0;
                for (const sel of ratingSelectors) {
                  const ratingElements = review.querySelectorAll(sel);
                  if (ratingElements.length > 0) {
                    rating = ratingElements.length;
                    break;
                  }
                }

                console.log(
                  `Review ${index + 1}: author="${author}", rating=${rating}, body="${body.substring(0, 50)}..."`
                );

                if (body) {
                  reviews.push({
                    platform: "Loox",
                    author: author || "Anonymous",
                    rating: rating || 5, // Fallback rating
                    body,
                  });
                }
              });

              console.log(`Total reviews extracted: ${reviews.length}`);
              return reviews;
            });

            console.log(
              `Successfully scraped ${looxReviews.length} Loox reviews from iframe`
            );
          } catch (error) {
            console.log(
              "Failed to scrape Loox iframe:",
              (error as Error).message
            );
          } finally {
            await looxPage.close();
          }
        } else {
          console.log("No Loox iframe found");
        }
      } catch (error) {
        console.log("Error handling Loox iframe:", (error as Error).message);
      }

      // Extraction des données basiques
      const pageData = await page.evaluate(async () => {
        // Titre de la page
        const title = document.title || "No title found";

        // Meta description
        const metaDescription =
          document
            .querySelector('meta[name="description"]')
            ?.getAttribute("content") || "No description found";

        // H1
        const h1Elements = Array.from(document.querySelectorAll("h1")).map(
          (h1) => h1.textContent?.trim() || ""
        );
        const h1 = h1Elements.filter((text) => text.length > 0);

        // H2
        const h2Elements = Array.from(document.querySelectorAll("h2")).map(
          (h2) => h2.textContent?.trim() || ""
        );
        const h2 = h2Elements.filter((text) => text.length > 0);

        // Nombre d'images
        const imageCount = document.querySelectorAll("img").length;

        // Langue
        const language = document.documentElement.lang || "Not specified";

        // Scrape reviews
        const scrapeReviews = async () => {
          const reviews: Array<{
            platform: string;
            author: string;
            rating: number;
            body: string;
          }> = [];

          // JSON-LD
          const jsonLdReviews: Array<{
            platform: string;
            author: string;
            rating: number;
            body: string;
          }> = [];
          document
            .querySelectorAll('script[type="application/ld+json"]')
            .forEach((script) => {
              try {
                const json = JSON.parse(script.textContent || "");
                // Look for Review or AggregateRating types
                if (json["@type"] === "Product" && json.review) {
                  json.review.forEach(
                    (r: {
                      author?: { name?: string };
                      reviewRating?: { ratingValue?: number };
                      reviewBody?: string;
                    }) => {
                      jsonLdReviews.push({
                        platform: "JSON-LD",
                        author: r.author?.name || "Anonymous",
                        rating: r.reviewRating?.ratingValue || 0,
                        body: r.reviewBody || "",
                      });
                    }
                  );
                } else if (json["@type"] === "Review") {
                  jsonLdReviews.push({
                    platform: "JSON-LD",
                    author: json.author?.name || "Anonymous",
                    rating: json.reviewRating?.ratingValue || 0,
                    body: json.reviewBody || "",
                  });
                } else if (
                  json["@type"] === "AggregateRating" &&
                  json.itemReviewed &&
                  json.itemReviewed.review
                ) {
                  jsonLdReviews.push({
                    platform: "JSON-LD",
                    author:
                      json.itemReviewed.review.author?.name || "Anonymous",
                    rating:
                      json.itemReviewed.review.reviewRating?.ratingValue || 0,
                    body: json.itemReviewed.review.reviewBody || "",
                  });
                }
              } catch {
                // console.error("Error parsing JSON-LD:", e);
              }
            });
          if (jsonLdReviews.length > 0) return jsonLdReviews;

          // Loox - Chercher les avis Loox dans le document principal (fallback si pas d'iframe)
          const looxReviews = document.querySelectorAll(".grid-item-wrap");
          if (looxReviews.length > 0) {
            looxReviews.forEach((review) => {
              const author =
                review.querySelector(".block.title")?.textContent?.trim() || "";
              const body =
                review
                  .querySelector(".pre-wrap.main-text")
                  ?.textContent?.trim() || "";
              const rating = review.querySelectorAll(
                'ul > li > svg[data-lx-fill="full"]'
              ).length;
              if (author && body && rating > 0) {
                reviews.push({ platform: "Loox", author, rating, body });
              }
            });
            if (reviews.length > 0) return reviews;
          }

          // Judge.me
          const judgeMeReviews = document.querySelectorAll(".jdgm-rev");
          if (judgeMeReviews.length > 0) {
            judgeMeReviews.forEach((review) => {
              const author =
                review
                  .querySelector(".jdgm-rev__author-name")
                  ?.textContent?.trim() || "";
              const body =
                review.querySelector(".jdgm-rev__body")?.textContent?.trim() ||
                "";
              const rating = review.querySelectorAll(
                ".jdgm-star.jdgm--on"
              ).length;
              reviews.push({ platform: "Judge.me", author, rating, body });
            });
            return reviews;
          }

          // Shopify Reviews
          const shopifyReviews = document.querySelectorAll(".spr-review");
          if (shopifyReviews.length > 0) {
            shopifyReviews.forEach((review) => {
              // These selectors are guesses and need to be verified on a real page
              const author =
                review
                  .querySelector(".spr-review-header-author")
                  ?.textContent?.trim() || "";
              const body =
                review
                  .querySelector(".spr-review-content-body")
                  ?.textContent?.trim() || "";
              const rating = review.querySelectorAll(".spr-icon-star").length;
              reviews.push({ platform: "Shopify", author, rating, body });
            });
            return reviews;
          }

          // Yotpo
          const yotpoReviews = document.querySelectorAll(".yotpo-review");
          if (yotpoReviews.length > 0) {
            yotpoReviews.forEach((review) => {
              const author =
                review.querySelector(".yotpo-user-name")?.textContent?.trim() ||
                "";
              const body =
                review.querySelector(".content-review")?.textContent?.trim() ||
                "";
              const rating = review.querySelectorAll(".yotpo-icon-star").length;
              reviews.push({ platform: "Yotpo", author, rating, body });
            });
            return reviews;
          }

          return reviews;
        };

        const reviews = await scrapeReviews();

        return {
          title,
          metaDescription,
          h1,
          h2,
          imageCount,
          language,
          reviews,
        };
      });

      // Fusionner les avis Loox de l'iframe avec les autres avis
      if (looxReviews.length > 0) {
        pageData.reviews = [...looxReviews, ...pageData.reviews];
        console.log(`Total reviews after merging: ${pageData.reviews.length}`);
      }

      // Analyse IA des avis avec Groq (si des avis ont été trouvés)
      let aiAnalysis = null;
      if (pageData.reviews.length > 0) {
        try {
          console.log(
            `Starting AI analysis of ${pageData.reviews.length} reviews...`
          );
          aiAnalysis = await analyzeReviews(pageData.reviews as Review[]);
          console.log(
            `AI analysis completed. Confidence score: ${aiAnalysis.confidence_score}%`
          );
        } catch (error) {
          console.error("AI analysis failed:", (error as Error).message);
          // Continue sans analyse IA si elle échoue
        }
      }

      // Fermeture du browser
      await browser.close();

      // Sauvegarde en base de données avec analyse IA
      const analysis = await prisma.analysis.create({
        data: {
          url,
          email,
          status: "completed",
          miniReport: {
            loadTime: `${loadTime}ms`,
            ...pageData,
            aiAnalysis, // Ajouter l'analyse IA au rapport
          },
        },
      });

      // Réponse réussie
      return NextResponse.json({
        success: true,
        analysisId: analysis.id,
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
      { status: 500 }
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
