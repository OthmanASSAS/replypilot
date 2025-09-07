"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ROICalculatorProps {
  onCalculate: (reviews: number, rating: number, monthlyRevenue: number) => void;
}

export default function ROICalculator({ onCalculate }: ROICalculatorProps) {
  const [reviews, setReviews] = useState("");
  const [rating, setRating] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reviewsNum = parseInt(reviews);
    const ratingNum = parseFloat(rating);
    const revenueNum = parseInt(monthlyRevenue);

    if (reviewsNum && ratingNum && revenueNum) {
      onCalculate(reviewsNum, ratingNum, revenueNum);
    }
  };

  const fieldClasses = "h-14 w-full rounded-xl border border-white/30 bg-white/90 backdrop-blur-md px-4 py-3 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white shadow-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md p-8 lg:p-10 rounded-2xl shadow-2xl border border-white/20">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="text-left">
              <Label htmlFor="reviews" className="font-semibold mb-3 block text-white/90 text-sm uppercase tracking-wider">
                📊 Nombre d'avis actuels
              </Label>
              <Input
                id="reviews"
                type="number"
                placeholder="ex: 150"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                className={fieldClasses}
                required
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="rating" className="font-semibold mb-3 block text-white/90 text-sm uppercase tracking-wider">
                ⭐ Note moyenne actuelle
              </Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="ex: 4.2"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className={fieldClasses}
                required
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="revenue" className="font-semibold mb-3 block text-white/90 text-sm uppercase tracking-wider">
                💰 CA produit/mois (€)
              </Label>
              <Input
                id="revenue"
                type="number"
                placeholder="ex: 8000 (ce produit seulement)"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(e.target.value)}
                className={fieldClasses}
                required
              />
            </div>
          </div>
          
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="h-16 text-lg px-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all border-0"
            >
              <span className="text-2xl mr-3">✨</span>
              Calculer mon potentiel de croissance
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            🔬 Calcul basé sur les données de conversion e-commerce et études sectorielles • 
            🏆 Méthode éprouvée par nos clients
          </p>
        </div>
      </div>
    </div>
  );
}