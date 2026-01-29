"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AudienceType, MonetizationGoal, UserInput } from "@/types";
import { Loader2, Sparkles, Plus, Trash2, RefreshCcw } from "lucide-react";

interface InputFormProps {
    onSubmit: (data: UserInput) => void;
    isLoading: boolean;
}

// Defined outside component to avoid recreation
const ALL_SUGGESTIONS = [
    { label: "Fitness coach for busy professionals", text: "I am a fitness coach helping busy professionals burn fat and build muscle with 20-minute home workouts." },
    { label: "UGC creator helping brands go viral", text: "I am a UGC creator who creates high-converting, viral-style short-form videos for direct-to-consumer beauty brands." },
    { label: "Mom sharing budget meal prep", text: "I am a busy mom of three sharing budget-friendly, healthy meal prep recipes and time-saving kitchen hacks." },
    { label: "Tech reviewer for coding setups", text: "I review developer productivity tools and desk setups to help software engineers optimize their workflow." },
    { label: "Digital artist teaching Procreate", text: "I teach beginners how to create stunning digital art on an iPad using Procreate with step-by-step tutorials." },
    { label: "Solo traveler on a budget", text: "I share travel hacks and itineraries for solo female travelers exploring Europe on a budget." },
    { label: "Notion template architect", text: "I design complex Notion systems to help freelancers and agencies organize their projects and client communication." }
];

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
    const [bio, setBio] = useState("");
    const [links, setLinks] = useState<string[]>([""]);
    const [audience, setAudience] = useState<AudienceType>("general");
    const [goal, setGoal] = useState<MonetizationGoal>("quick_cash");
    const [currentSuggestions, setCurrentSuggestions] = useState(ALL_SUGGESTIONS.slice(0, 3));

    const addLink = () => setLinks([...links, ""]);
    const removeLink = (index: number) => setLinks(links.filter((_, i) => i !== index));
    const updateLink = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };

    const handleRefreshSuggestions = () => {
        // Shuffle and pick 3
        const shuffled = [...ALL_SUGGESTIONS].sort(() => 0.5 - Math.random());
        setCurrentSuggestions(shuffled.slice(0, 3));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            creator_bio: bio,
            content_links: links.filter((l) => l.trim() !== ""),
            audience_type: audience,
            monetization_goal: goal,
        });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto border-white/10 glass-card">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    AI Offer Generator
                </CardTitle>
                <CardDescription className="text-center text-lg">
                    Turn your audience into income in seconds.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="bio">Creator Bio / About You</Label>
                        <Textarea
                            id="bio"
                            placeholder="I help busy moms meal prep on a budget..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="min-h-[100px]"
                            required
                        />
                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-muted-foreground">Not sure what to write? Tap a persona to auto-fill:</p>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-white"
                                    onClick={handleRefreshSuggestions}
                                    title="Refresh suggestions"
                                >
                                    <RefreshCcw className="h-3 w-3" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {currentSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setBio(suggestion.text)}
                                        className="text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 text-left"
                                        aria-label={`Auto-fill bio for ${suggestion.label}`}
                                    >
                                        {suggestion.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Top Content Links</Label>
                            <span className="text-xs text-muted-foreground font-normal">Optional, but helps generate better offers</span>
                        </div>
                        {links.map((link, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                {link.startsWith("data:image") ? (
                                    <div className="relative group w-full">
                                        <div className="flex items-center gap-4 bg-secondary/30 p-2 rounded-md border border-white/10">
                                            <img src={link} alt="Upload preview" className="h-10 w-10 rounded object-cover border border-white/20" />
                                            <span className="text-xs text-muted-foreground truncate flex-1">Image Uploaded</span>
                                        </div>
                                    </div>
                                ) : (
                                    <Input
                                        placeholder="https://youtube.com/..."
                                        value={link}
                                        onChange={(e) => updateLink(index, e.target.value)}
                                    />
                                )}
                                {links.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeLink(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addLink}
                            className="mt-2"
                        >
                            <Plus className="h-3 w-3 mr-2" /> Add Link
                        </Button>
                        <div className="inline-block ml-2">
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                className="hidden"
                                id="image-upload"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    if (file.size > 5 * 1024 * 1024) {
                                        alert("File size must be less than 5MB");
                                        return;
                                    }

                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        const result = event.target?.result as string;
                                        if (result) {
                                            setLinks((prev) => [...prev, result]);
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                    // Reset input so same file can be selected again if needed
                                    e.target.value = "";
                                }}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('image-upload')?.click()}
                                className="mt-2 text-muted-foreground hover:text-white"
                            >
                                <Sparkles className="h-3 w-3 mr-2 text-indigo-400" /> Upload Image
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Primary Audience</Label>
                            <Select
                                value={audience}
                                onValueChange={(v) => setAudience(v as AudienceType)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select audience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="creators">Creators</SelectItem>
                                    <SelectItem value="founders">Founders</SelectItem>
                                    <SelectItem value="students">Students</SelectItem>
                                    <SelectItem value="professionals">Professionals</SelectItem>
                                    <SelectItem value="general">General Public</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Monetization Goal</Label>
                            <Select
                                value={goal}
                                onValueChange={(v) => setGoal(v as MonetizationGoal)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select goal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="quick_cash">Quick Cash</SelectItem>
                                    <SelectItem value="recurring_revenue">Recurring Revenue</SelectItem>
                                    <SelectItem value="authority">Authority / High Ticket</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full text-lg h-12"
                        variant="premium"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Profile...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-5 w-5" /> Generate Offers
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
