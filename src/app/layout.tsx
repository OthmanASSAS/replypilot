import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from "@/components/providers";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ReplyPilot",
  "description": "Audit gratuit de vos avis clients e-commerce. 3 actions concrètes pour augmenter vos ventes sous 24h.",
  "url": "https://replypilot.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  },
  "provider": {
    "@type": "Organization",
    "name": "ReplyPilot",
    "url": "https://replypilot.com"
  }
};

export const metadata: Metadata = {
  title: "ReplyPilot | Audit Gratuit Avis E-commerce - 3 Actions pour + de Ventes",
  description: "Audit gratuit de vos avis clients e-commerce. 3 actions concrètes pour augmenter vos ventes sous 24h. Compatible Judge.me, Loox, Yotpo. Sans carte bancaire.",
  keywords: "audit e-commerce gratuit, analyse avis clients, optimiser boutique shopify, judge.me audit, loox analyse, yotpo insights, conversion e-commerce",
  openGraph: {
    title: "ReplyPilot | Audit Gratuit Avis E-commerce - 3 Actions pour + de Ventes",
    description: "Audit gratuit de vos avis clients e-commerce. 3 actions concrètes pour augmenter vos ventes sous 24h. Compatible Judge.me, Loox, Yotpo. Sans carte bancaire.",
    url: "https://replypilot.com", // À remplacer par votre URL de production
    type: "website",
    images: [
      {
        url: "https://replypilot.com/og-image.png", // À remplacer par votre image Open Graph
        width: 1200,
        height: 630,
        alt: "ReplyPilot - Analyse d'avis clients pour e-commerçants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReplyPilot | Audit Gratuit Avis E-commerce - 3 Actions pour + de Ventes",
    description: "Audit gratuit de vos avis clients e-commerce. 3 actions concrètes pour augmenter vos ventes sous 24h. Compatible Judge.me, Loox, Yotpo. Sans carte bancaire.",
    images: ["https://replypilot.com/og-image.png"], // À remplacer par votre image Open Graph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'votre_google_verification_code',
  },
  other: {
    'application/ld+json': JSON.stringify(jsonLd),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} font-sans`}>
        <CSPostHogProvider>
          {children}
        </CSPostHogProvider>
      </body>
    </html>
  );
}