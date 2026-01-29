import { LandingPageContent } from "@/types";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ArrowLeft, BarChart3, Clock, DollarSign, Users, Lock, Zap, Star, Heart, Shield, Award } from "lucide-react";
import { ContentPreview } from "./content-preview";

interface LandingPageViewProps {
    data: LandingPageContent;
    onBack: () => void;
    contentLinks?: string[];
    onPurchase?: () => void;
}

const IconMap: Record<string, any> = {
    chart: BarChart3,
    time: Clock,
    money: DollarSign,
    users: Users,
    lock: Lock,
    zap: Zap,
    star: Star,
    heart: Heart,
    shield: Shield,
    award: Award,
};

const IconColors: Record<string, string> = {
    chart: "bg-blue-100 text-blue-600",
    time: "bg-purple-100 text-purple-600",
    money: "bg-green-100 text-green-600",
    users: "bg-orange-100 text-orange-600",
    lock: "bg-gray-100 text-gray-600",
    zap: "bg-yellow-100 text-yellow-600",
    star: "bg-indigo-100 text-indigo-600",
    heart: "bg-red-100 text-red-600",
    shield: "bg-teal-100 text-teal-600",
    award: "bg-pink-100 text-pink-600",
};

export function LandingPageView({ data, onBack, contentLinks = [], onPurchase }: LandingPageViewProps) {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white text-black rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">

            {/* Navigation / Header (Mock Browser) */}
            <div className="bg-gray-100 border-b p-3 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-xs text-gray-400 font-mono">landing-page-preview.html</div>
                <Button variant="ghost" size="sm" onClick={onBack} className="h-6 text-xs hover:bg-gray-200 text-gray-600">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Back to Offers
                </Button>
            </div>

            {/* Hero Section */}
            <div className="px-8 py-16 md:py-24 text-center space-y-6 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    {data.headline}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    {data.subheadline}
                </p>

                {contentLinks.length > 0 && (
                    <div className="py-6">
                        <ContentPreview links={contentLinks} className="max-w-md mx-auto" />
                    </div>
                )}

                <div className="pt-4">
                    <Button
                        size="lg"
                        className="bg-black hover:bg-gray-800 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                        onClick={onPurchase}
                    >
                        {data.call_to_action}
                    </Button>
                </div>
            </div>

            {/* Features Section */}
            {data.features && data.features.length > 0 && (
                <div className="py-16 px-8 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.features_headline || "More than just a tool"}</h2>
                            <p className="text-lg text-gray-600">{data.features_subheadline || "Explore what else we can do for you"}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12 max-w-3xl mx-auto">
                            {data.features.map((feature, i) => {
                                const IconComponent = IconMap[feature.icon] || Star;
                                const colorClass = IconColors[feature.icon] || "bg-gray-100 text-gray-600";
                                return (
                                    <div key={i} className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${colorClass} mb-2`}>
                                            <IconComponent className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Value Stack */}
            <div className="bg-gray-50 px-8 py-12">
                <div className="max-w-2xl mx-auto space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 text-center mb-8">What's Included</h3>
                    <div className="grid gap-4">
                        {data.value_bullets.map((bullet: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <div className="bg-green-100 text-green-700 p-1 rounded-full shrink-0 mt-0.5">
                                    <Check className="h-4 w-4" />
                                </div>
                                <span className="text-gray-800">
                                    {bullet.includes(":") ? (
                                        <>
                                            <span className="font-bold text-gray-900">{bullet.split(":")[0]}:</span>
                                            {bullet.substring(bullet.indexOf(":") + 1)}
                                        </>
                                    ) : (
                                        bullet
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="px-8 py-16 max-w-2xl mx-auto space-y-8">
                <h3 className="text-2xl font-bold text-center text-gray-900">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {data.faqs.map((faq: { question: string; answer: string }, i: number) => (
                        <div key={i} className="border-b border-gray-200 pb-4">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center justify-between">
                                {faq.question}
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-900 text-white py-8 text-center text-sm text-gray-400">
                <p>Generated by AI Offer Generator</p>
            </div>

        </div>
    );
}
