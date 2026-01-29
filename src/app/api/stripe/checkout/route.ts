import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { isStripeEnabled } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia", // Use latest API version or pin one
});

export async function POST(request: NextRequest) {
    if (!isStripeEnabled()) {
        return NextResponse.json({ error: "Stripe payments are not enabled" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { offerId, title, price, currency, creatorSlug, offerSlug } = body;

        if (!offerId || !title || !price || !currency) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const origin = request.headers.get("origin") || "http://localhost:3000";
        const successUrl = `${origin}/offers/success?session_id={CHECKOUT_SESSION_ID}&offer_id=${offerId}`;
        const cancelUrl = `${origin}/offers/${creatorSlug}/${offerSlug}`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: title,
                        },
                        unit_amount: Math.round(price * 100), // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                offerId: offerId,
                creatorSlug: creatorSlug,
                offerSlug: offerSlug
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });

    } catch (error) {
        console.error("Error creating Stripe session:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
