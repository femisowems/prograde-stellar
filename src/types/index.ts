export type OfferType = 'digital_product' | 'service' | 'subscription';

export interface Offer {
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

export interface LandingPage {
    headline: string;
    subheadline: string;
    value_bullets: [string, string, string, string];
    call_to_action: string;
    faqs: [FAQ, FAQ, FAQ];
}

export interface AIAnalysis {
    creator_niche: string;
    audience_pain_points: string[];
    monetization_readiness: 'low' | 'medium' | 'high';
}

export interface AIResponse {
    analysis: AIAnalysis;
    generated_offers: [Offer, Offer, Offer];
    selected_best_offer_index: number;
    best_offer_landing_page: LandingPage;
}

export type MonetizationGoal = 'quick_cash' | 'recurring_revenue' | 'authority';
export type AudienceType = 'creators' | 'founders' | 'students' | 'professionals' | 'general';

export interface UserInput {
    creator_bio: string;
    content_links: string[];
    audience_type: AudienceType;
    monetization_goal: MonetizationGoal;
}
