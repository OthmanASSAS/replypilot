"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Review {
  platform: string;
  author: string;
  rating: number;
  body: string;
}

interface BusinessAction {
  category: string;
  priority: string;
  title: string;
  description: string;
  impact: string;
  effort: string;
  implementation: string;
  roi_estimate?: string;
}

interface AIAnalysis {
  average_rating: number;
  total_reviews: number;
  confidence_score: number;
  immediate_actions: BusinessAction[];
  growth_opportunities: any[];
  customer_pain_points: any[];
  competitive_advantages: any[];
  power_keywords: string[];
  marketing_angles: string[];
}

interface MiniReport {
  loadTime: string;
  title: string;
  metaDescription: string;
  h1: string[];
  h2: string[];
  imageCount: number;
  language: string;
  reviews: Review[];
  aiAnalysis?: AIAnalysis;
}

interface Analysis {
  id: string;
  url: string;
  email: string;
  status: string;
  miniReport: MiniReport | null;
  createdAt: string;
}

export default function ReportPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchAnalysis = async () => {
        try {
          const response = await fetch(`/api/report/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch analysis");
          }
          const data = await response.json();
          setAnalysis(data);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred",
          );
        } finally {
          setLoading(false);
        }
      };
      fetchAnalysis();
    } else {
      setLoading(false);
      setError("No analysis ID provided");
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  if (!analysis || !analysis.miniReport) {
    return <div className="container mx-auto p-4">No analysis data found.</div>;
  }

  const { miniReport, url } = analysis;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Rapport d&apos;Analyse pour : {url}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Temps de chargement :</strong> {miniReport.loadTime}
          </p>
          <p>
            <strong>Titre de la page :</strong> {miniReport.title}
          </p>
          <p>
            <strong>Meta Description :</strong> {miniReport.metaDescription}
          </p>
          <p>
            <strong>Titres H1 :</strong> {miniReport.h1.join(", ")}
          </p>
          <p>
            <strong>Titres H2 :</strong> {miniReport.h2.join(", ")}
          </p>
          <p>
            <strong>Nombre d&apos;images :</strong> {miniReport.imageCount}
          </p>
          <p>
            <strong>Langue :</strong> {miniReport.language}
          </p>
          {/* Analyse IA Business */}
          {miniReport.aiAnalysis && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-green-700">
                📊 Analyse IA Business (Confiance: {miniReport.aiAnalysis.confidence_score}%)
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-green-800">📈 Note Globale</h3>
                  <div className="text-3xl font-bold text-green-600">
                    {miniReport.aiAnalysis.average_rating}/5
                  </div>
                  <p className="text-sm text-gray-600">Sur {miniReport.aiAnalysis.total_reviews} avis</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-blue-800">🎯 Mots-Clés Puissants</h3>
                  <div className="flex flex-wrap gap-1">
                    {miniReport.aiAnalysis.power_keywords.map((keyword, index) => (
                      <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Actions Immédiates */}
              {miniReport.aiAnalysis.immediate_actions.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-xl mb-4 text-red-700">🚀 Actions Immédiates (ROI Rapide)</h3>
                  <div className="space-y-4">
                    {miniReport.aiAnalysis.immediate_actions.map((action, index) => (
                      <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-red-800">{action.title}</h4>
                          <div className="flex gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              action.priority === 'high' ? 'bg-red-200 text-red-800' :
                              action.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                              'bg-green-200 text-green-800'
                            }`}>
                              Priorité {action.priority}
                            </span>
                            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {action.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{action.description}</p>
                        <div className="grid md:grid-cols-3 gap-2 text-sm">
                          <div>
                            <strong>Impact:</strong> <span className="text-green-600">{action.impact}</span>
                          </div>
                          <div>
                            <strong>Effort:</strong> <span className="text-blue-600">{action.effort}</span>
                          </div>
                          {action.roi_estimate && (
                            <div>
                              <strong>ROI:</strong> <span className="text-purple-600">{action.roi_estimate}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 p-2 bg-white rounded border-l-2 border-blue-300">
                          <strong>Comment faire:</strong> {action.implementation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Opportunités de Croissance */}
              {miniReport.aiAnalysis.growth_opportunities.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-xl mb-4 text-green-700">🌱 Opportunités de Croissance</h3>
                  <div className="space-y-4">
                    {miniReport.aiAnalysis.growth_opportunities.map((opp, index) => (
                      <div key={index} className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                        <h4 className="font-semibold text-green-800 mb-2">{opp.title}</h4>
                        <p className="text-gray-700 mb-2">{opp.description}</p>
                        <div className="grid md:grid-cols-2 gap-2 text-sm mb-2">
                          <div>
                            <strong>Potentiel:</strong> <span className="text-green-600">{opp.revenue_potential}</span>
                          </div>
                          <div>
                            <strong>Preuve:</strong> {opp.evidence}
                          </div>
                        </div>
                        {opp.next_steps.length > 0 && (
                          <div className="mt-2">
                            <strong>Étapes suivantes:</strong>
                            <ul className="list-disc list-inside text-sm ml-2">
                              {opp.next_steps.map((step: string, stepIndex: number) => (
                                <li key={stepIndex}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Points de Friction */}
              {miniReport.aiAnalysis.customer_pain_points.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-xl mb-4 text-orange-700">⚠️ Points de Friction à Résoudre</h3>
                  <div className="space-y-4">
                    {miniReport.aiAnalysis.customer_pain_points.map((pain, index) => (
                      <div key={index} className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-orange-800">{pain.pain_point}</h4>
                          <div className="flex gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              pain.severity === 'critical' ? 'bg-red-200 text-red-800' :
                              pain.severity === 'important' ? 'bg-orange-200 text-orange-800' :
                              'bg-yellow-200 text-yellow-800'
                            }`}>
                              {pain.severity}
                            </span>
                            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {pain.frequency} mentions
                            </span>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 text-sm mb-2">
                          <div>
                            <strong>Impact Business:</strong> <span className="text-red-600">{pain.business_impact}</span>
                          </div>
                          <div>
                            <strong>Solution:</strong> <span className="text-green-600">{pain.solution}</span>
                          </div>
                        </div>
                        {pain.examples.length > 0 && (
                          <div className="mt-2">
                            <strong>Exemples clients:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pain.examples.map((example, exIndex) => (
                                <span key={exIndex} className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs">
                                  "{example}"
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Avantages Concurrentiels */}
              {miniReport.aiAnalysis.competitive_advantages.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-xl mb-4 text-purple-700">💪 Avantages Concurrentiels à Exploiter</h3>
                  <div className="space-y-4">
                    {miniReport.aiAnalysis.competitive_advantages.map((advantage, index) => (
                      <div key={index} className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-purple-800">{advantage.advantage}</h4>
                          <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs">
                            {advantage.mentions} mentions
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <strong>Stratégie:</strong> {advantage.leverage_strategy}
                          </div>
                          <div>
                            <strong>Angle Marketing:</strong> <span className="text-purple-600">{advantage.marketing_angle}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Angles Marketing */}
              {miniReport.aiAnalysis.marketing_angles.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-xl mb-4 text-blue-700">🎨 Angles Marketing qui Fonctionnent</h3>
                  <div className="flex flex-wrap gap-2">
                    {miniReport.aiAnalysis.marketing_angles.map((angle, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium">
                        {angle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Avis Clients */}
          {miniReport.reviews && miniReport.reviews.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">
                💬 Avis Clients ({miniReport.reviews.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {miniReport.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.author}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </span>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {review.platform}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
