"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !email) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, email }),
      });

      if (response.ok) {
        const result = await response.json();
        const { analysisId } = result;

        router.push(`/report?id=${analysisId}`);
      } else {
        throw new Error("Erreur lors de l'analyse");
      }
    } catch {
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transformez votre site en
            <span className="text-blue-600"> machine à convertir</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Découvrez les opportunités cachées de votre site web avec une
            analyse IA approfondie
          </p>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              <span>+500 sites analysés</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>4.9/5 (247 avis)</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-2xl">🚀 Analyse Gratuite</CardTitle>
              <CardDescription className="text-lg">
                Recevez en 2 minutes un rapport détaillé de 12 pages
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-base">
                    URL de votre site web
                  </Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://votre-boutique.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="h-12 text-lg border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Votre email professionnel
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@votre-entreprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-lg border-2 focus:border-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !url || !email}
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyse en cours...
                    </>
                  ) : (
                    "🎯 Analyser mon site gratuitement"
                  )}
                </Button>
              </form>

              {/* Trust badges */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>🔒 100% confidentiel • Aucune carte bancaire requise</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Ce que vous découvrirez
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-600">
                  📊 Performance SEO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Score technique et opportunités d&rsquo;optimisation</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-600">
                  💡 UX/UI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ergonomie et expérience utilisateur</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-purple-600">
                  📱 Responsive Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Compatibilité mobile et tablette</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-orange-600">⚡ Vitesse</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Temps de chargement et optimisations</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Ils nous font confiance
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-600 italic">
                  &ldquo;Le rapport a identifié des problèmes que mon agence
                  n&rsquo;avait pas vu depuis 6 mois !&rdquo;
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  - Marie, E-commerce Mode
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-600 italic">
                  &ldquo;Simple, rapide et incroyablement précis. Mon trafic a
                  augmenté de 40%.&rdquo;
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  - Thomas, Startup Tech
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-600 italic">
                  &ldquo;La meilleure investment marketing de l&rsquo;année. ROI
                  immédiat.&rdquo;
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  - Sophie, Agence Web
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="text-center mt-20">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-4">
                Prêt à booster votre business ?
              </h3>
              <p className="text-blue-100 mb-6">
                Rejoignez les 500+ entrepreneurs qui ont transformé leur site
                web
              </p>
              <Button
                onClick={() => document.getElementById("url")?.focus()}
                className="bg-white text-blue-600 hover:bg-gray-100 h-12 text-lg font-semibold"
              >
                🚀 Commencer l&rsquo;analyse gratuite
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
