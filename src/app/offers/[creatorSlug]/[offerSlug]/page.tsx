"use client";

import { LandingPageView } from "@/components/feature/landing-page-view";
import { LandingPageContent } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PublicOfferPage({ params }: { params: Promise<{ creatorSlug: string; offerSlug: string }> }) {
    const { creatorSlug, offerSlug } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{
        creator: { name: string; slug: string };
        offer: { id: string; title: string; price: number; currency: string };
        page: LandingPageContent;
    } | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`/api/offers/${creatorSlug}/${offerSlug}`);
                if (!res.ok) {
                    if (res.status === 404) throw new Error("Offer not found");
                    throw new Error("Failed to load offer");
                }
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [creatorSlug, offerSlug]);

    const handlePurchase = async () => {
        if (!data) return;
        setPurchasing(true);

        // Check if Stripe is enabled (via env var check on client side or API)
        // For MVP, we'll try Stripe first if key exists, else Mock
        const isStripeEnabled = process.env.NEXT_PUBLIC_ENABLE_STRIPE === "true";

        try {
            if (isStripeEnabled) {
                // STRIPE FLOW
                const res = await fetch("/api/stripe/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        offerId: data.offer.id,
                        title: data.offer.title,
                        price: data.offer.price,
                        currency: data.offer.currency,
                        creatorSlug,
                        offerSlug
                    })
                });

                if (!res.ok) throw new Error("Stripe checkout failed");
                const { url } = await res.json();
                if (url) window.location.href = url;
            } else {
                // MOCK FLOW
                const res = await fetch("/api/purchase", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        offerId: data.offer.id,
                        amount: data.offer.price,
                        currency: data.offer.currency
                    })
                });

                if (!res.ok) throw new Error("Purchase failed");
                router.push(`/offers/success?offer_id=${data.offer.id}`);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong with the purchase. Please try again.");
            setPurchasing(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!data) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans">
            {/* Wrapper to center the preview-like page */}
            <div className="flex justify-center">
                <LandingPageView
                    data={data.page}
                    onBack={() => router.push("/")} // Or wherever "back" should go for a public user (maybe creator profile in future)
                    onPurchase={handlePurchase}
                />
            </div>
            {/* Overlay for purchasing state */}
            {purchasing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <p className="text-lg font-semibold animate-pulse">Processing...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
