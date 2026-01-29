"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id"); // From Stripe
    const offerId = searchParams.get("offer_id");
    const productName = searchParams.get("product_name");

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">You're in!</h1>
                <p className="text-gray-600 mb-8">
                    Your purchase has been confirmed. Check your email for next steps and access details.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-left border border-gray-100 space-y-2">
                    {productName && (
                        <p className="flex justify-between pb-2 border-b border-gray-200">
                            <span className="text-gray-500">Product:</span>
                            <span className="font-semibold text-gray-900 text-right ml-4">{productName}</span>
                        </p>
                    )}
                    <p className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className="font-medium text-green-600">Confirmed</span>
                    </p>
                    {sessionId && (
                        <p className="flex justify-between">
                            <span className="text-gray-500">Order ID:</span>
                            <span className="font-mono text-gray-700 truncate ml-4" title={sessionId}>{sessionId.slice(-8)}</span>
                        </p>
                    )}
                    <p className="flex justify-between">
                        <span className="text-gray-500">Offer ID:</span>
                        <span className="font-mono text-gray-700 truncate ml-4">{offerId || "N/A"}</span>
                    </p>
                </div>

                <div className="space-y-3">
                    <Link href="/" passHref>
                        <Button className="w-full bg-black hover:bg-gray-800 text-white">
                            Create Your Own Offer
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PurchaseSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
