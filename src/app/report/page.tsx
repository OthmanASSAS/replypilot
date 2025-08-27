"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportPage() {
  const searchParams = useSearchParams();

  // Extraire les données des searchParams
  const url = searchParams.get("url");
  const loadTime = searchParams.get("loadTime");
  const title = searchParams.get("title");
  const metaDescription = searchParams.get("metaDescription");
  const h1 = searchParams.get("h1");
  const h2 = searchParams.get("h2");
  const imageCount = searchParams.get("imageCount");
  const language = searchParams.get("language");

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Rapport d&apos;Analyse pour : {url}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Temps de chargement :</strong> {loadTime}
          </p>
          <p>
            <strong>Titre de la page :</strong> {title}
          </p>
          <p>
            <strong>Meta Description :</strong> {metaDescription}
          </p>
          <p>
            <strong>Titres H1 :</strong> {h1}
          </p>
          <p>
            <strong>Titres H2 :</strong> {h2}
          </p>
          <p>
            <strong>Nombre d&apos;images :</strong> {imageCount}
          </p>
          <p>
            <strong>Langue :</strong> {language}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
