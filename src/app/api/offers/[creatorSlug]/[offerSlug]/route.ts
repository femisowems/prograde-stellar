import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ creatorSlug: string; offerSlug: string }> }
) {
    const { creatorSlug, offerSlug } = await params;

    if (!creatorSlug || !offerSlug) {
        return NextResponse.json({ error: "Missing slug parameters" }, { status: 400 });
    }

    try {
        const page = await db.getPublishedPageBySlug(creatorSlug, offerSlug);
        const offer = await db.getOfferBySlug(await db.getCreatorBySlug(creatorSlug).then(c => c?.id || ""), offerSlug);
        const creator = await db.getCreatorBySlug(creatorSlug);

        if (!page || !offer || !creator) {
            return NextResponse.json({ error: "Offer not found" }, { status: 404 });
        }

        // Return combined data for the frontend
        return NextResponse.json({
            creator: {
                name: creator.name,
                slug: creator.slug
            },
            offer: {
                id: offer.id,
                title: offer.info.title,
                price: offer.price,
                currency: offer.currency
            },
            page: page.content
        });

    } catch (error) {
        console.error("Error fetching offer page:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
