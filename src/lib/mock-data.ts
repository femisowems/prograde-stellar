import { AIResponse } from "@/types";

export const MOCK_AI_RESPONSE: AIResponse = {
    analysis: {
        creator_niche: "Productivity Systems for Neurodivergent Students & Professionals",
        audience_pain_points: [
            "Overwhelmed by complex tools",
            "Difficulty maintaining consistency",
            "Need for flexible, distraction-free structure"
        ],
        monetization_readiness: "high"
    },
    generated_offers: [
        {
            offer_type: "digital_product",
            title: "The 'Focus-First' Student Dashboard",
            description: "A plug-and-play Notion template designed specifically for students with ADHD to track assignments without overwhelm.",
            target_audience: "University students struggling with organization",
            suggested_price: 29,
            currency: "USD",
            reasoning: "Low-friction entry point that solves an immediate, painful problem (missing assignments) for your core audience."
        },
        {
            offer_type: "subscription",
            title: "The 'Life OS' Template Club",
            description: "Monthly drops of new productivity modules (finance, meal prep, goal setting) plus a live monthly 'Reset & Plan' workshop.",
            target_audience: "Professionals wanting continuous system improvement",
            suggested_price: 19,
            currency: "USD",
            reasoning: "Directly addresses your goal of recurring revenue by turning one-off template buyers into community members."
        },
        {
            offer_type: "service",
            title: "1-on-1 Workspace Audit",
            description: "A 45-minute video call to review their current setup and provide a custom action plan for simplification.",
            target_audience: "Founders/Freelancers with messy workspaces",
            suggested_price: 149,
            currency: "USD",
            reasoning: "High-ticket option to capture authority and serve the 'done-with-you' segment of your audience."
        }
    ],
    selected_best_offer_index: 1,
    best_offer_landing_page: {
        headline: "Stop Building Systems. Start Getting Things Done.",
        subheadline: "Join the Life OS Template Club—your monthly productivity upgrade for a clearer mind and a cleaner workspace.",
        value_bullets: [
            "New 'ADHD-Proof' Notion module dropped every month",
            "Live 'Monthly Reset' calls to plan your month with Sarah",
            "Access to a private community of focused professionals",
            "Cancel anytime—keep the templates forever"
        ],
        call_to_action: "Join the Club for $19/mo",
        faqs: [
            {
                question: "Do I need to be a Notion expert using this?",
                answer: "Not at all. Every template is designed to be 'break-proof' and comes with a 5-minute setup video."
            },
            {
                question: "What if I fall behind on the monthly updates?",
                answer: "There's no falling behind. Use what you need, ignore what you don't. All past modules are in your library."
            },
            {
                question: "Can I use the templates on the free Notion plan?",
                answer: "Yes! All templates are 100% compatible with the free Personal plan."
            }
        ]
    }
};
