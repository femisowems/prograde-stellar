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
    } catch (error: any) {
        console.error("Error processing request:", error);

        // Extract meaningful error message
        let errorMessage = "Internal Server Error";
        let errorDetails = "";

        if (error instanceof Error) {
            errorMessage = error.message;
            errorDetails = error.stack || "";
        } else if (typeof error === "object") {
            try {
                errorMessage = JSON.stringify(error);
            } catch {
                errorMessage = String(error);
            }
        } else {
            errorMessage = String(error);
        }

        return NextResponse.json(
            {
                error: errorMessage,
                details: errorDetails,
                model: "gemini-2.5-flash" // Confirming which model was attempted
            },
            { status: 500 }
        );
    }
}
