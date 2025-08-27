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

interface MiniReport {
  loadTime: string;
  title: string;
  metaDescription: string;
  h1: string[];
  h2: string[];
  imageCount: number;
  language: string;
  reviews: Review[];
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
          {miniReport.reviews && miniReport.reviews.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mt-4">
                Avis Clients ({miniReport.reviews.length})
              </h3>
              <ul className="list-disc pl-5 mt-2">
                {miniReport.reviews.map((review, index) => (
                  <li key={index} className="mb-2">
                    <p>
                      <strong>Auteur :</strong> {review.author}
                    </p>
                    <p>
                      <strong>Note :</strong> {review.rating}/5
                    </p>
                    <p>
                      <strong>Avis :</strong> {review.body}
                    </p>
                    <p>
                      <strong>Plateforme :</strong> {review.platform}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
