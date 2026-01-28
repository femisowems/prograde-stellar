"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AudienceType, MonetizationGoal, UserInput } from "@/types";
import { Loader2, Sparkles, Plus, Trash2 } from "lucide-react";

interface InputFormProps {
    onSubmit: (data: UserInput) => void;
    isLoading: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
    const [bio, setBio] = useState("");
    const [links, setLinks] = useState<string[]>([""]);
    const [audience, setAudience] = useState<AudienceType>("general");
    const [goal, setGoal] = useState<MonetizationGoal>("quick_cash");

    const addLink = () => setLinks([...links, ""]);
    const removeLink = (index: number) => setLinks(links.filter((_, i) => i !== index));
    const updateLink = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
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
                    </div>

                    <div className="space-y-2">
                        <Label>Top Content Links</Label>
                        {links.map((link, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    placeholder="https://youtube.com/..."
                                    value={link}
                                    onChange={(e) => updateLink(index, e.target.value)}
                                />
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
