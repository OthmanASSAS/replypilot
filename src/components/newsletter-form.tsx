"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/newsletter/actions";

export default function NewsletterForm() {
  const [state, action, isPending] = useActionState(subscribeNewsletter, null);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <form action={action} className="contents">
          {/* Honeypot anti-bot */}
          <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />
          
          <input 
            type="email"
            name="email" 
            placeholder="votre@email-professionnel.com"
            className="flex-1 px-6 py-4 rounded-xl bg-white text-slate-800 placeholder:text-slate-500 shadow-lg border border-white/30 focus:ring-2 focus:ring-white focus:outline-none"
            required
          />
          <button 
            type="submit"
            disabled={isPending}
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            {isPending ? "..." : "S'abonner gratuitement"}
          </button>
        </form>
      </div>
      
      {/* États - Fixed height container to prevent layout shift */}
      <div className="mt-4 min-h-[3rem]">
        {state?.ok && (
          <div className="p-3 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
            <p className="text-green-100 font-semibold text-sm text-center">
              ✅ Inscription réussie ! Vous recevrez nos prochains contenus.
            </p>
          </div>
        )}
        {state?.error && (
          <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm">
            <p className="text-red-100 font-semibold text-sm text-center">{state.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}