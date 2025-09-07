// /Users/oassas/Projets/replypilot/src/app/thanks/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SafeMailto from "@/components/safe-mailto";

export default function Thanks() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Merci ! Votre demande d'analyse est reçue.
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Nous avons bien reçu votre demande. Voici les prochaines étapes.
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-white text-left">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 text-center">Que se passe-t-il maintenant ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">1. Analyse en cours</h3>
                <p className="text-gray-600">Notre équipe commence l'analyse de votre page et de vos avis pour identifier les opportunités clés.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">2. Livraison du rapport sous 24h</h3>
                <p className="text-gray-600">Vous recevrez votre audit personnalisé par e-mail. Pensez à vérifier vos spams.</p>
              </div>
               <div>
                <h3 className="font-semibold text-gray-800">3. Contact</h3>
                <p className="text-gray-600">
                  L'e-mail sera envoyé depuis <SafeMailto email="davimi.team@gmail.com" className="font-medium text-blue-600 underline">davimi.team@gmail.com</SafeMailto>. Ajoutez-nous à vos contacts pour être sûr de le recevoir.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="h-12 px-6 w-full">
                ← Retour à l'accueil
              </Button>
            </Link>
            <SafeMailto email="davimi.team@gmail.com">
              <Button className="h-12 px-6 w-full">
                Poser une question
              </Button>
            </SafeMailto>
          </div>
        </div>
      </div>
    </div>
  );
}