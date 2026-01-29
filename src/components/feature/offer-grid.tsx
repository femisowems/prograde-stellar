import { AIAnalysis, Offer } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react"; // Using lucide icon? No, I need a UI badge. I'll use a simple span style.
import { CheckCircle2, ArrowRight } from "lucide-react";

import { ContentPreview } from "./content-preview";

interface OfferGridProps {
    analysis: AIAnalysis;
    offers: Offer[];
    bestOfferIndex: number;
    onSelectOffer: (offer: Offer) => void;
    contentLinks?: string[];
}

export function OfferGrid({ analysis, offers, bestOfferIndex, onSelectOffer, contentLinks = [] }: OfferGridProps) {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Analysis Section */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold">Diagnosis Complete</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                        <span className="text-muted-foreground mr-2">Niche:</span>
                        <span className="font-medium text-white">{analysis.creator_niche}</span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                        <span className="text-muted-foreground mr-2">Readiness:</span>
                        <span className={`font-medium capitalize ${analysis.monetization_readiness === 'high' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {analysis.monetization_readiness}
                        </span>
                    </div>
                </div>

                {contentLinks.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <ContentPreview links={contentLinks} />
                    </div>
                )}
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offers.map((offer, index) => {
                    const isBest = index === bestOfferIndex;
                    return (
                        <Card
                            key={index}
                            className={`relative flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isBest ? 'border-primary/50 shadow-primary/20 bg-primary/5' : 'border-white/10'}`}
                        >
                            {isBest && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-purple-500/30 tracking-wide uppercase">
                                    Recommended Strategy
                                </div>
                            )}

                            <CardHeader>
                                <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                                    {offer.offer_type.replace('_', ' ')}
                                </div>
                                <CardTitle className="leading-tight text-xl h-14 line-clamp-2">
                                    {offer.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {offer.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-grow flex flex-col justify-end gap-6">
                                <div>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-2xl font-bold">${offer.suggested_price}</span>
                                        <span className="text-sm text-muted-foreground">{offer.offer_type === 'subscription' ? '/mo' : 'USD'}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground italic border-l-2 border-white/20 pl-3">
                                        "{offer.reasoning}"
                                    </p>
                                </div>

                                <Button
                                    className="w-full"
                                    variant={isBest ? "premium" : "outline"}
                                    onClick={() => onSelectOffer(offer)}
                                >
                                    View Landing Page <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
