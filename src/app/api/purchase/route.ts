import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { PurchaseEvent } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { offerId, amount, currency } = body;

        if (!offerId || !amount || !currency) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const purchaseEvent: PurchaseEvent = {
            id: `purchase-${Date.now()}`,
            offer_id: offerId,
            amount: amount,
            currency: currency,
            status: "succeeded",
            mode: "mock",
            timestamp: new Date().toISOString()
        };

        await db.createPurchaseEvent(purchaseEvent);

        return NextResponse.json({ success: true, purchaseId: purchaseEvent.id });
    } catch (error) {
        console.error("Error processing mock purchase:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
