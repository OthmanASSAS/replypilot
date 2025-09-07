import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Politique de confidentialité
            </h1>
            <p className="text-xl text-gray-600">
              Comment nous protégeons et utilisons vos données
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Collecte des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <p>
                  Nous collectons uniquement les informations nécessaires pour réaliser votre analyse :
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>URL de votre fiche produit</li>
                  <li>Adresse email pour la livraison du rapport</li>
                  <li>Informations optionnelles (plateforme d'avis, objectif, volume d'avis)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Utilisation des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <p>Vos données sont utilisées exclusivement pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analyser votre fiche produit et les avis clients</li>
                  <li>Générer et vous envoyer votre rapport personnalisé</li>
                  <li>Vous proposer nos services complémentaires (analyse complète)</li>
                  <li>Améliorer nos analyses (données anonymisées)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Protection et sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vos données sont stockées de manière sécurisée</li>
                  <li>Aucune vente ni partage avec des tiers</li>
                  <li>Accès limité aux seules personnes autorisées</li>
                  <li>Chiffrement des données sensibles</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Vos droits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Accès</strong> : consulter les données que nous avons sur vous</li>
                  <li><strong>Rectification</strong> : corriger des données inexactes</li>
                  <li><strong>Suppression</strong> : demander l'effacement de vos données</li>
                  <li><strong>Opposition</strong> : vous opposer au traitement de vos données</li>
                  <li><strong>Désinscription</strong> : arrêter de recevoir nos emails (lien en bas de chaque email)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Cookies et tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <p>
                  Notre site utilise des cookies techniques nécessaires au fonctionnement. 
                  Aucun cookie de tracking publicitaire n'est utilisé sans votre consentement explicite.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <p>
                  Pour toute question concernant vos données ou pour exercer vos droits, 
                  contactez-nous à : <strong>hello@productanalyzer.fr</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}