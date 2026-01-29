export type OfferType = 'digital_product' | 'service' | 'subscription';

export interface GeneratedOffer {
    offer_type: OfferType;
    title: string;
    description: string;
    target_audience: string;
    suggested_price: number;
    currency: "USD";
    reasoning: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface LandingPageContent {
    headline: string;
    subheadline: string;
    value_bullets: [string, string, string, string] | string[];
    features_headline: string;
    features_subheadline: string;
    features: Feature[];
    call_to_action: string;
    faqs: FAQ[];
}

export interface AIAnalysis {
    creator_niche: string;
    audience_pain_points: string[];
    monetization_readiness: 'low' | 'medium' | 'high';
}

export interface AIResponse {
    analysis: AIAnalysis;
    generated_offers: GeneratedOffer[];
    selected_best_offer_index?: number;
    best_offer_landing_page?: LandingPageContent;
}

export type MonetizationGoal = 'quick_cash' | 'recurring_revenue' | 'authority';
export type AudienceType = 'creators' | 'founders' | 'students' | 'professionals' | 'general';

export interface UserInput {
    creator_bio: string;
    content_links: string[];
    audience_type: AudienceType;
    monetization_goal: MonetizationGoal;
}

// --- Monetization / DB Types ---

export interface Creator {
    id: string;
    slug: string;
    name: string;
    email: string;
}

export interface Offer {
    id: string;
    creator_id: string;
    slug: string;
    info: GeneratedOffer;
    price: number;
    currency: string;
}

export interface PublishedOfferPage {
    id: string;
    offer_id: string;
    slug: string; // e.g. "focus-first-dashboard"
    content: LandingPageContent;
}

export interface PurchaseEvent {
    id: string;
    offer_id: string;
    amount: number;
    currency: string;
    status: "succeeded" | "failed" | "pending";
    mode: "mock" | "stripe";
    timestamp: string;
    stripe_session_id?: string;
}
