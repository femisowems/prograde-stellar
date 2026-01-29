import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserInput, AIResponse } from "@/types";
import { z } from "zod";

// Define Zod Schemas to match TypeScript interfaces
const OfferSchema = z.object({
  offer_type: z.enum(['digital_product', 'service', 'subscription']),
  title: z.string(),
  description: z.string(),
  target_audience: z.string(),
  suggested_price: z.number(),
  currency: z.literal("USD"),
  reasoning: z.string(),
});

const FAQSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const LandingPageSchema = z.object({
  headline: z.string(),
  subheadline: z.string(),
  value_bullets: z.array(z.string()).min(4),
  call_to_action: z.string(),
  faqs: z.array(FAQSchema).min(3),
});

const AIAnalysisSchema = z.object({
  creator_niche: z.string(),
  audience_pain_points: z.array(z.string()),
  monetization_readiness: z.enum(['low', 'medium', 'high']),
});

const AIResponseSchema = z.object({
  analysis: AIAnalysisSchema,
  generated_offers: z.array(OfferSchema).min(3),
  selected_best_offer_index: z.number(),
  best_offer_landing_page: LandingPageSchema,
});

// Initialize Gemini
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error("GOOGLE_API_KEY is missing");
}
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function generateOffer(input: UserInput): Promise<AIResponse> {
  // Separate links into text URLs and Image Data parts
  const textLinks: string[] = [];
  const imageParts: Array<{ inlineData: { data: string; mimeType: string } }> = [];

  input.content_links.forEach(link => {
    if (link.startsWith("data:image")) {
      const matches = link.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        imageParts.push({
          inlineData: {
            mimeType: matches[1],
            data: matches[2]
          }
        });
      }
    } else if (link.trim() !== "") {
      textLinks.push(link);
    }
  });

  const prompt = `
    You are an expert AI business consultant specializing in the Creator Economy.
    Your goal is to analyze a creator's profile and generate the PERFECT monetization offer for them.

    Creator Context:
    - Bio: "${input.creator_bio}"
    - Content Links: ${textLinks.join(", ")}
    - Target Audience: ${input.audience_type}
    - Monetization Goal: ${input.monetization_goal}

    [Visual Context]: ${imageParts.length > 0 ? "The user has provided screenshot(s) of their content/profile. Use these images to infer their niche, aesthetic, and engagement style." : "No visual context provided."}

    Task:
    1. Analyze their niche and audience pain points.
    2. Brainstorm 3 distinct offer ideas (Digital Product, Service, Subscription).
    3. Select the ONE best offer that yields the highest probability of success.
    4. Generate a high-converting Landing Page copy for that BEST offer.

    Return ONLY valid JSON matching this structure (strict adherence required):
    {
      "analysis": {
        "creator_niche": "...",
        "audience_pain_points": ["...", "...", "..."],
        "monetization_readiness": "low" | "medium" | "high"
      },
      "generated_offers": [
        {
          "offer_type": "digital_product", // must be exactly one of these types
          "title": "...",
          "description": "...",
          "target_audience": "...",
          "suggested_price": number,
          "currency": "USD",
          "reasoning": "..."
        },
        // ... 2 more offers
      ],
      "selected_best_offer_index": 0, // 0-based index of the best offer
      "best_offer_landing_page": {
        "headline": "...",
        "subheadline": "...",
        "value_bullets": ["Title: Description", "Title: Description", "Title: Description", "Title: Description"],
        "call_to_action": "...",
        "faqs": [
          { "question": "...", "answer": "..." },
          { "question": "...", "answer": "..." },
          { "question": "...", "answer": "..." }
        ]
      }
    }
  `;

  // Construct the multimodal request part
  const requestParts: any[] = [{ text: prompt }];
  // Append images found
  imageParts.forEach(part => requestParts.push(part));

  let result;

  try {
    // PROMPT: Use gemini-3-flash-preview (correct name from API list)
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    console.log("Attempting generation with gemini-3-flash-preview...");
    result = await model.generateContent({
      contents: [{ role: "user", parts: requestParts }],
      generationConfig: { responseMimeType: "application/json" }
    });
  } catch (error: any) {
    console.warn("Primary model failed, attempting fallback to gemini-flash-latest. Error:", error.message);
    // Fallback to gemini-flash-latest (Valid model from list)
    const fallbackModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    result = await fallbackModel.generateContent({
      contents: [{ role: "user", parts: requestParts }],
      generationConfig: { responseMimeType: "application/json" }
    });
  }

  const text = result.response.text();

  if (!text) {
    throw new Error("No response from AI");
  }

  // Clean markdown code blocks if present (common with Gemini)
  const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();

  try {
    const json = JSON.parse(cleanedText);
    // Validate against Zod schema to ensure type safety
    const parsed = AIResponseSchema.parse(json);
    return parsed as AIResponse;
  } catch (e) {
    console.error("Failed to parse or validate AI response:");
    if (e instanceof z.ZodError) {
      console.error("Zod Validation Error:", JSON.stringify((e as any).errors, null, 2));
    }
    console.error("Raw Text Received from AI:", text);
    throw new Error("AI returned invalid data structure. Check server logs for details.");
  }
}
