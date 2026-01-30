# AI Offer Generator (Prograde Stellar)

An intelligent application designed to help creators monetize their audience by analyzing their profile and generating tailored business offers. Powered by Google's Gemini AI, it creates instant, high-converting landing page previews for digital products, services, or subscriptions.

## 🚀 Key Features

-   **AI-Powered Analysis**: Analyzes creator bios and content links (text & images) to understand niche and audience pain points.
-   **Smart Offer Generation**: Brainstorms three distinct offer types (Digital Product, Service, Subscription) and selects the best one.
-   **Dynamic Landing Pages**: Generates a full landing page copy including headlines, value propositions, features, and FAQs.
-   **Interactive Preview**: Displays the generated offer in a polished, interactive "Mock Browser" preview.
-   **Features Grid**: Automatically generates key features with relevant icons (Chart, Time, Money, etc.).
-   **Payment Flows**: Supports both a Mock Payment flow (for demos) and real Stripe integration.

## 🛠 Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **AI Model**: Google Gemini 1.5 Flash / Pro (via `@google/generative-ai`)
-   **Styling**: Tailwind CSS
-   **Validation**: Zod
-   **Icons**: Lucide React
-   **State Management**: React Hooks

## 🏁 Getting Started

### Prerequisites

-   Node.js 18+ installed
-   A Google Cloud API Key with access to Gemini API

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/femisowems/prograde-stellar.git
    cd prograde-stellar
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add the following:

    ```env
    # Required for AI Generation
    GOOGLE_API_KEY=your_gemini_api_key_here

    # Optional: For Real Payments (Defaults to Mock if disabled)
    NEXT_PUBLIC_ENABLE_STRIPE=false
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
    STRIPE_SECRET_KEY=sk_test_...
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/                  # App Router pages and API routes
│   ├── api/generate/     # AI generation endpoint
│   ├── offers/           # Dynamic offer pages
│   └── page.tsx          # Home/Input page
├── components/
│   ├── feature/          # App-specific components (LandingPageView, InputForm)
│   └── ui/               # Reusable UI components (Button, Card, etc.)
├── lib/
│   ├── ai.ts             # Gemini AI integration and prompt logic
│   └── utils.ts          # Helper functions
└── types/                # TypeScript interfaces and Zod schemas
```

## 🧠 AI Logic

The application uses a structured prompt to guide the AI:
1.  **Context**: "You are an expert AI business consultant..."
2.  **Input**: Takes creator bio, content links, and optional images.
3.  **Output**: Returns a strict JSON object containing the analysis, 3 offer ideas, and the selected best offer with full landing page content.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
