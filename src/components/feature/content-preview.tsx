import { ExternalLink, ImageIcon } from "lucide-react";

interface ContentPreviewProps {
    className?: string;
    links: string[];
}

export function ContentPreview({ links = [], className = "" }: ContentPreviewProps) {
    if (!links || links.length === 0) return null;

    // Limit to first 2 items as per requirement
    const displayLinks = links.slice(0, 2);

    return (
        <div className={`space-y-4 ${className}`}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Featured Content
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayLinks.map((link, i) => {
                    const isImage = link.startsWith("data:image");

                    if (isImage) {
                        return (
                            <div key={i} className="group relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/40">
                                <img
                                    src={link}
                                    alt="Creator Content"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <ImageIcon className="text-white drop-shadow-md" />
                                </div>
                            </div>
                        );
                    }

                    // Simple link preview card
                    return (
                        <a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all group"
                        >
                            <div className="bg-indigo-500/20 p-2 rounded-full mr-3 text-indigo-300 group-hover:text-indigo-200">
                                <ExternalLink className="h-4 w-4" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs text-muted-foreground font-mono truncate max-w-full">
                                    {link.replace(/^https?:\/\/(www\.)?/, '')}
                                </p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
