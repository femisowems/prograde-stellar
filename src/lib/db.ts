import { Creator, Offer, PublishedOfferPage, PurchaseEvent } from "@/types";
import { MOCK_AI_RESPONSE } from "./mock-data";

// --- Seed Data ---

const SEED_CREATOR: Creator = {
    id: "creator-demo-1",
    slug: "demo-creator",
    name: "Sarah (Productivity Expert)",
    email: "sarah@example.com"
};

// Use the first generated offer from mock response, but structured as a DB record
const derivedOffer = MOCK_AI_RESPONSE.generated_offers[1]; // The "Life OS" Template Club
const SEED_OFFER: Offer = {
    id: "offer-demo-1",
    creator_id: SEED_CREATOR.id,
    slug: "life-os-template-club",
    info: derivedOffer,
    price: derivedOffer.suggested_price,
    currency: derivedOffer.currency
};

const SEED_PUBLISHED_PAGE: PublishedOfferPage = {
    id: "page-demo-1",
    offer_id: SEED_OFFER.id,
    slug: SEED_OFFER.slug,
    content: MOCK_AI_RESPONSE.best_offer_landing_page! // Use the best offer landing page from mock
};


// --- In-Memory Store ---

class Database {
    private creators: Creator[] = [SEED_CREATOR];
    private offers: Offer[] = [SEED_OFFER];
    private pages: PublishedOfferPage[] = [SEED_PUBLISHED_PAGE];
    private purchases: PurchaseEvent[] = [];

    // Creators
    async getCreatorBySlug(slug: string): Promise<Creator | null> {
        return this.creators.find(c => c.slug === slug) || null;
    }

    // Offers
    async getOfferBySlug(creatorId: string, offerSlug: string): Promise<Offer | null> {
        return this.offers.find(o => o.creator_id === creatorId && o.slug === offerSlug) || null;
    }

    async getOfferById(id: string): Promise<Offer | null> {
        return this.offers.find(o => o.id === id) || null;
    }

    // Published Pages
    async getPublishedPageBySlug(creatorSlug: string, offerSlug: string): Promise<PublishedOfferPage | null> {
        const creator = await this.getCreatorBySlug(creatorSlug);
        if (!creator) return null;

        const offer = await this.getOfferBySlug(creator.id, offerSlug);
        if (!offer) return null;

        return this.pages.find(p => p.offer_id === offer.id) || null;
    }

    // Purchases
    async createPurchaseEvent(event: PurchaseEvent): Promise<PurchaseEvent> {
        this.purchases.push(event);
        console.log("Purchase Recorded:", event);
        return event;
    }

    async getPurchaseEvents(): Promise<PurchaseEvent[]> {
        return this.purchases;
    }
}

// Singleton instance
export const db = new Database();
