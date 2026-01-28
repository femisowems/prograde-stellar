"use client";

import { useState } from "react";
import { AIResponse, UserInput } from "@/types";
import { InputForm } from "./input-form";

import { OfferGrid } from "@/components/feature/offer-grid";
import { LandingPageView } from "@/components/feature/landing-page-view";

export function Generator() {
    const [data, setData] = useState<AIResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState<'input' | 'results' | 'landing_page'>('input');
    // error state could be added here

    const handleGenerate = async (input: UserInput) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });
            const result = await response.json();
            setData(result);
            setView('results');
        } catch (error) {
            console.error("Failed to generate", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (view === "landing_page" && data) {
        // If user selected an offer, we show that offer's landing page (OR the best one if we want to fallback)
        // For this prototype, we'll assume the API returns the landing page for the "Best" offer.
        // Ideally the API generates a specific landing page for the *selected* offer, but to keep it simple as per spec:
        // "Select the BEST offer and generate a landing page".
        // So we only have ONE landing page in the response. We will show that one, but conceptually it matches the "recommended" offer.

        return (
            <div className="container mx-auto px-4 py-8">
                <LandingPageView
                    data={data.best_offer_landing_page}
                    onBack={() => setView('results')}
                />
            </div>
        );
    }

    if (view === "results" && data) {
        return (
            <div className="container mx-auto px-4 py-8 space-y-8">
                <OfferGrid
                    analysis={data.analysis}
                    offers={data.generated_offers}
                    bestOfferIndex={data.selected_best_offer_index}
                    onSelectOffer={(offer) => {
                        // In a real app we might generate a new LP for this specific offer.
                        // Here we just accept that the pre-generated LP is for the best offer.
                        // If the user clicks another offer, we might warn them or just show the best LP for demo.
                        // Let's just switch to LP view.
                        setView('landing_page');
                    }}
                />
                <div className="text-center">
                    <button
                        onClick={() => {
                            setData(null);
                            setView('input');
                        }}
                        className="text-sm text-muted-foreground hover:text-white underline"
                    >
                        Start Over with New Inputs
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>
    );
}
