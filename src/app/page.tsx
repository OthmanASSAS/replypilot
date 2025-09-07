// /Users/oassas/Projets/replypilot/src/app/page.tsx
"use client";

import React, { useActionState, useState } from "react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { submitLead } from "./actions";
// UI components no longer needed in this simplified version
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SafeMailto from "@/components/safe-mailto";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ROICalculator from "@/components/roi-calculator";

export default function Home() {
  const [state, action, isPending] = useActionState(submitLead, null);
  const [stackValue, setStackValue] = useState("");
  const [calculatorResult, setCalculatorResult] = useState<number | null>(null);
  // Form is always visible now, no toggle needed
  const posthog = usePostHog();

  const handleCtaClick = (location: string) => {
    posthog.capture("cta_click", { location });
  };

  const calculateROI = (reviews: number, rating: number, monthlyRevenue: number) => {
    // Calcul basé sur les études de conversion
    const ratingImprovement = Math.max(0, 4.8 - rating); // Potentiel jusqu'à 4.8
    const conversionBoost = ratingImprovement * 0.18; // +18% par 0.1 étoile
    const potentialGain = monthlyRevenue * conversionBoost;
    
    setCalculatorResult(Math.round(potentialGain));
    posthog.capture("calculator_used", { result: potentialGain, reviews, rating, revenue: monthlyRevenue });
  };

  // Removed unused fieldClasses

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 antialiased">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg grid place-items-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                ReplyPilot
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-blue-600 font-semibold relative">
                Accueil
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-700" />
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* PREMIUM HERO SECTION */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="relative container mx-auto px-4 py-20 lg:py-28">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white/90 font-medium mb-6 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Sites e-commerce
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Calculez votre</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                  potentiel de croissance
                </span>
                <br />
                <span className="text-white">en 30 secondes</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-10">
                Transformez vos avis clients en ambassadeurs et découvrez votre potentiel de croissance avec notre calculateur exclusif
              </p>
              
              <div className="max-w-4xl mx-auto">
                <ROICalculator onCalculate={calculateROI} />
              </div>
              
              {calculatorResult && (
                <div className="mt-12 max-w-3xl mx-auto">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 p-8 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                    <div className="relative text-center text-white">
                      <div className="text-6xl mb-4">🚀</div>
                      <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                        Potentiel de gain : +{calculatorResult.toLocaleString()}€/mois
                      </h3>
                      <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
                        En optimisant vos avis clients, vous pourriez augmenter votre CA de <strong className="text-white">{calculatorResult.toLocaleString()}€ par mois</strong> !
                      </p>
                      <Button
                        size="lg"
                        className="h-14 text-lg px-8 bg-white text-green-600 hover:bg-gray-100 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        onClick={() => {
                          handleCtaClick("calculator_result");
                          document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Récupérer ces gains → Audit gratuit
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* CE QUE VOUS RECEVEZ - PREMIUM */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 font-semibold mb-8 border border-blue-200/50 shadow-sm">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                Livré sous 24h
              </div>
              <h2 className="text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent leading-tight">
                Ce que vous recevez
              </h2>
              <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
                Un audit complet et actionnable pour transformer vos avis en croissance mesurable
              </p>
            </div>
            
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
              {[
                {
                  icon: "🎯",
                  title: "3 actions prioritaires",
                  desc: "Matrice Impact × Effort pour prioriser vos améliorations et maximiser le ROI rapidement.",
                  gradient: "from-blue-500 to-cyan-500",
                  shadowColor: "shadow-blue-200"
                },
                {
                  icon: "🔍", 
                  title: "5 points à corriger",
                  desc: "Analyse détaillée des friction points : qualité produit, logistique, UX et service client.",
                  gradient: "from-purple-500 to-pink-500",
                  shadowColor: "shadow-purple-200"
                },
                {
                  icon: "📊",
                  title: "Mini-benchmark concurrentiel", 
                  desc: "Comparaison avec 1 concurrent direct : forces, faiblesses et opportunités de différenciation.",
                  gradient: "from-emerald-500 to-teal-500",
                  shadowColor: "shadow-emerald-200"
                }
              ].map((item) => (
                <div key={item.title} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></div>
                  <div className="relative bg-white border-2 border-slate-100 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-3xl mb-8 shadow-xl ${item.shadowColor}/30`}>
                      <span className="flex items-center justify-center">{item.icon}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-6 text-slate-900 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PREMIUM FORM SECTION */}
        <section id="form-section" className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {calculatorResult ? (
                <>
                  <div className="mb-6">
                    <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-lg border border-white/30">
                      🎯 Récupérez vos +{calculatorResult.toLocaleString()}€/mois
                    </div>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                    Transformez ce potentiel en <span className="text-yellow-300">résultats réels</span>
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Audit gratuit de votre page produit en 24h. Plan d'action personnalisé. Sans carte bancaire.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                    Audit <span className="text-yellow-300">gratuit</span> sous 24h
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Analyse complète basée sur les avis de votre page produit. Plan d'action personnalisé. Sans carte.
                  </p>
                </>
              )}

              <div className="max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md p-8 lg:p-10 rounded-2xl shadow-2xl border border-white/20">
                  <form action={action} className="space-y-6" aria-label="lead-capture">
                    <div className="grid gap-6">
                      <div className="text-left">
                        <Label htmlFor="url" className="font-semibold mb-3 block text-white/90 text-sm uppercase tracking-wider">
                          🔗 URL de la page produit
                        </Label>
                        <Input 
                          id="url" 
                          name="url" 
                          type="url" 
                          required 
                          placeholder="https://votre-boutique.com/products/produit-a-analyser" 
                          className="h-14 w-full rounded-xl border border-white/30 bg-white/90 backdrop-blur-md px-4 py-3 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white shadow-lg"
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="text-left">
                          <Label htmlFor="email" className="font-semibold mb-3 block text-white/90 text-sm uppercase tracking-wider">
                            📧 Email professionnel
                          </Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            required 
                            placeholder="vous@votresociete.com" 
                            className="h-14 w-full rounded-xl border border-white/30 bg-white/90 backdrop-blur-md px-4 py-3 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white shadow-lg"
                          />
                        </div>
                        
                        <div className="text-left">
                          <Label className="font-semibold mb-3 block text-white/90 text-sm uppercase tracking-wider">
                            ⭐ Outil d'avis (si connu)
                          </Label>
                          <Select onValueChange={setStackValue} name="stack-display">
                            <SelectTrigger className="!h-14 w-full rounded-xl border border-white/30 bg-white/90 backdrop-blur-md px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white shadow-lg [&>span]:text-slate-500">
                              <SelectValue placeholder="Sélectionnez un outil" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="non-precise">Non précisé</SelectItem>
                              <SelectItem value="judgeme">Judge.me</SelectItem>
                              <SelectItem value="loox">Loox</SelectItem>
                              <SelectItem value="yotpo">Yotpo</SelectItem>
                              <SelectItem value="avis-verifies">Avis Vérifiés</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                          <input type="hidden" name="stack" value={stackValue} />
                        </div>
                      </div>
                    </div>

                    {/* Honeypot anti-bot */}
                    <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-16 text-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all border-0"
                        onClick={() => handleCtaClick("form_submit")}
                      >
                        {isPending ? (
                          <>
                            <span className="animate-spin mr-3">⏳</span>
                            Analyse en cours...
                          </>
                        ) : (
                          <>
                            <span className="text-2xl mr-3">🚀</span>
                            Recevoir mon audit en 24h
                          </>
                        )}
                      </Button>
                    </div>
                  </form>

                  {/* États */}
                  {state?.ok && (
                    <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
                      <p role="status" className="text-green-100 font-semibold flex items-center justify-center">
                        <span className="text-2xl mr-2">✅</span>
                        Merci ! Nous lançons l'analyse. Vous recevez votre audit par email sous 24h.
                      </p>
                    </div>
                  )}
                  {state?.error && (
                    <div className="mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm">
                      <p role="alert" className="text-red-100 font-semibold">{state.error}</p>
                    </div>
                  )}

                  {/* Réassurance */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">🔒</span>
                        RGPD compliant
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg mr-2">⚡</span>
                        Analyse sous 24h
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg mr-2">🎯</span>
                        100% actionnable
                      </div>
                    </div>
                    <p className="text-white/60 text-xs mt-4 text-center">
                      Données utilisées uniquement pour l'audit. 
                      <a href="/privacy" className="underline hover:text-white transition-colors ml-1">
                        Politique de confidentialité
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="mt-8 text-blue-200 text-sm max-w-2xl mx-auto">
                🛠️ Compatible avec Judge.me, Loox, Yotpo, Avis Vérifiés, et tous les systèmes d'avis e-commerce
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full text-slate-700 font-semibold mb-8 border border-slate-200/50 shadow-sm">
                  <span className="text-lg mr-2">❓</span>
                  Questions fréquentes
                </div>
                <h2 className="text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent leading-tight">
                  Tout ce que vous devez savoir
                </h2>
              </div>
              <div itemScope itemType="https://schema.org/FAQPage" className="space-y-6">
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="group">
                  <details className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <summary className="text-xl font-black cursor-pointer text-slate-900 hover:text-blue-600 transition-colors list-none [&::-webkit-details-marker]:hidden" itemProp="name">
                      <div className="flex items-center justify-between">
                        <span>C'est vraiment gratuit ?</span>
                        <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                      </div>
                    </summary>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="mt-6 text-slate-600 text-lg leading-relaxed font-medium" itemProp="text">Oui, le premier audit est 100% gratuit pour vous montrer la valeur de notre analyse. Si les résultats vous plaisent, nous pourrons discuter de rapports récurrents sur un plan mensuel.</p>
                    </div>
                  </details>
                </div>
                
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="group">
                  <details className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <summary className="text-xl font-black cursor-pointer text-slate-900 hover:text-blue-600 transition-colors list-none [&::-webkit-details-marker]:hidden" itemProp="name">
                      <div className="flex items-center justify-between">
                        <span>Comment récupérez-vous les avis ?</span>
                        <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                      </div>
                    </summary>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="mt-6 text-slate-600 text-lg leading-relaxed font-medium" itemProp="text">Pour l'audit initial, nous nous basons sur les avis publiquement visibles sur l'URL que vous nous fournissez. Aucun accès administrateur n'est requis.</p>
                    </div>
                  </details>
                </div>
                
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="group">
                  <details className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <summary className="text-xl font-black cursor-pointer text-slate-900 hover:text-blue-600 transition-colors list-none [&::-webkit-details-marker]:hidden" itemProp="name">
                      <div className="flex items-center justify-between">
                        <span>Mes données sont-elles en sécurité ?</span>
                        <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
                      </div>
                    </summary>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="mt-6 text-slate-600 text-lg leading-relaxed font-medium" itemProp="text">Absolument. Votre URL et votre email sont utilisés uniquement pour réaliser et vous envoyer l'audit. Ils ne sont jamais partagés. Notre service est conforme au RGPD.</p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-16 mt-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl grid place-items-center">
                  <span className="text-white font-bold text-lg">RP</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                  ReplyPilot
                </span>
              </div>
              
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Transformez vos avis clients en croissance mesurable avec notre analyse IA
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-300 mb-8">
                <div className="flex items-center">
                  <span className="text-blue-400 mr-2">🚀</span>
                  Livraison 24h
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✅</span>
                  100% Gratuit
                </div>
                <div className="flex items-center">
                  <span className="text-purple-400 mr-2">🔒</span>
                  RGPD Compliant
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-700">
                <p className="text-slate-500 text-sm mb-2">
                  © {new Date().getFullYear()} ReplyPilot. Tous droits réservés.
                </p>
                <p className="text-slate-500 text-sm">
                  Une question ? Contactez-nous : 
                  <SafeMailto email="davimi.team@gmail.com" className="text-blue-400 hover:text-blue-300 underline ml-1 transition-colors">
                    davimi.team@gmail.com
                  </SafeMailto>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
