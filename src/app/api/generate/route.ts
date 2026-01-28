import { MOCK_AI_RESPONSE } from "@/lib/mock-data";
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

        // SIMULATION: In a real app, this is where we'd call the LLM
        // const prompt = constructSystemPrompt(body);
        // const aiResult = await callLLM(prompt);

        // Simulate network delay for realism
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return NextResponse.json(MOCK_AI_RESPONSE);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
