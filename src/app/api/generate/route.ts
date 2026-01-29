import { generateOffer } from "@/lib/ai";
import { UserInput } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body: UserInput = await req.json();

        // Validate input (basic check)
        if (!body.creator_bio || !body.monetization_goal) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const aiResult = await generateOffer(body);

        return NextResponse.json(aiResult);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
