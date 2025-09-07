import { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Blog E-commerce | Guides et Astuces pour Optimiser vos Avis Clients - ReplyPilot",
  description: "Découvrez nos guides complets pour optimiser vos avis clients, améliorer votre conversion e-commerce et maximiser vos ventes avec Judge.me, Loox, Yotpo.",
  keywords: "blog e-commerce, guide avis clients, optimisation conversion, judge.me guide, loox tutoriel, yotpo conseils",
};

const blogPosts = [
  {
    slug: "judge-me-vs-loox-vs-yotpo-comparatif-2025",
    title: "Judge.me vs Loox vs Yotpo : Comparatif Complet 2025",
    excerpt: "Découvrez quelle solution d'avis clients choisir pour votre boutique e-commerce. Fonctionnalités, prix, avantages et inconvénients détaillés.",
    category: "Comparatifs",
    readTime: "8 min",
    publishedAt: "2025-01-15",
    gradient: "from-purple-500 via-blue-500 to-indigo-600",
    icon: "⚖️"
  },
  {
    slug: "5-erreurs-ecommerce-detectees-dans-vos-avis",
    title: "5 Erreurs E-commerce Critiques Détectées dans vos Avis",
    excerpt: "Les erreurs les plus fréquentes que révèlent vos avis clients et comment les corriger pour augmenter vos ventes...",
    category: "Optimisation",
    readTime: "6 min",
    publishedAt: "2025-01-12",
    gradient: "from-red-500 via-pink-500 to-rose-500",
    icon: "❌"
  },
  {
    slug: "comment-analyser-avis-shopify-2025",
    title: "Comment Analyser ses Avis Shopify en 2025 : Guide Complet",
    excerpt: "Méthode étape par étape pour extraire des insights actionables de vos avis Shopify et transformer vos clients...",
    category: "Tutoriels",
    readTime: "10 min",
    publishedAt: "2025-01-10",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    icon: "📊"
  }
];

const categoryColors = {
  "Comparatifs": "bg-purple-100 text-purple-800",
  "Optimisation": "bg-red-100 text-red-800",
  "Tutoriels": "bg-emerald-100 text-emerald-800"
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                ReplyPilot
              </span>
            </Link>
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium">
                Accueil
              </Link>
              <Link href="/blog" className="text-blue-600 font-semibold relative">
                Blog
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-700"></div>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Sophisticated Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white/90 font-medium mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Mis à jour régulièrement
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Maîtrisez vos</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                avis clients
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Guides exclusifs, analyses poussées et stratégies éprouvées pour transformer vos avis en machine à ventes
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center text-white/80">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Méthode éprouvée
              </div>
              <div className="flex items-center text-white/80">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Résultats mesurables
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Premium Blog Grid */}
      <main className="container mx-auto px-4 py-16 lg:py-24">
        {/* Featured Article */}
        <div className="mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full mb-6">
            <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></span>
            Article vedette
          </div>
          
          <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50">
              <div className={`aspect-[16/9] lg:aspect-[21/9] bg-gradient-to-r ${blogPosts[0].gradient} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl lg:text-9xl filter drop-shadow-lg opacity-90">
                    {blogPosts[0].icon}
                  </div>
                </div>
                <div className="absolute top-6 left-6">
                  <span className={`px-4 py-2 ${categoryColors[blogPosts[0].category as keyof typeof categoryColors]} text-sm font-bold rounded-full backdrop-blur-sm`}>
                    {blogPosts[0].category}
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 flex items-center text-white/90 text-sm font-medium">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {blogPosts[0].readTime}
                </div>
              </div>
              
              <div className="p-8 lg:p-10">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <time>{new Date(blogPosts[0].publishedAt).toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</time>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {blogPosts[0].title}
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center text-blue-600 font-bold group-hover:text-blue-700 transition-colors">
                  Lire l'article complet
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Other Articles Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-gray-300/50">
                <div className={`aspect-video bg-gradient-to-r ${post.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl filter drop-shadow-lg opacity-90">
                      {post.icon}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 ${categoryColors[post.category as keyof typeof categoryColors]} text-xs font-bold rounded-full backdrop-blur-sm`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center text-white/90 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <time>{new Date(post.publishedAt).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</time>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                    Lire la suite
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Premium Newsletter CTA */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="relative p-8 lg:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Restez à la pointe de l'e-commerce
              </h3>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Recevez nos analyses exclusives, études de cas et stratégies avancées directement dans votre boîte mail
                <br />
                <strong className="text-white">Rejoignez les e-commerçants qui optimisent déjà</strong>
              </p>
              <NewsletterForm />
              <p className="text-blue-200 text-sm mt-4">
                📧 Pas de spam • 🔒 Données sécurisées • 🚀 Désabonnement en 1 clic
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Sophisticated Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                ReplyPilot
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              L'expertise e-commerce qui transforme vos avis clients en croissance
            </p>
            <div className="border-t border-slate-800 pt-6">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} ReplyPilot. Tous droits réservés. • 
                <Link href="/privacy" className="hover:text-blue-400 transition-colors ml-1">
                  Confidentialité
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}