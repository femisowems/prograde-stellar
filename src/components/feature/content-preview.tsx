import { ExternalLink, ImageIcon, PlayCircle } from "lucide-react";

interface ContentPreviewProps {
    className?: string;
    links: string[];
}

export function ContentPreview({ links = [], className = "" }: ContentPreviewProps) {
    if (!links || links.length === 0) return null;

    // Helper to determine media type and priority
    const getMediaType = (link: string) => {
        if (link.match(/(youtube\.com|youtu\.be|vimeo\.com|\.mp4$)/i)) return { type: 'video', priority: 3 };
        if (link.startsWith("data:image") || link.match(/\.(jpeg|jpg|gif|png)$/i)) return { type: 'image', priority: 2 };
        return { type: 'link', priority: 1 };
    };

    // 1. Map to objects with metadata
    // 2. Sort by priority (descending)
    // 3. Take top 2
    const displayItems = links
        .map(link => ({ link, ...getMediaType(link) }))
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 2);

    const isSingleItem = displayItems.length === 1;

    return (
        <div className={`space-y-4 ${className}`}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Featured Content
            </h3>
            <div className={`grid gap-3 ${isSingleItem ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {displayItems.map((item, i) => {
                    const { link, type } = item;

                    if (type === 'video') {
                        // Basic video placeholder since we aren't embedding robust players yet
                        return (
                            <a
                                key={i}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative block overflow-hidden rounded-lg border border-white/10 bg-black ${isSingleItem ? 'aspect-video max-h-80' : 'aspect-video'}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                                    <PlayCircle className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
                                </div>
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-xs text-white font-medium backdrop-blur-sm">
                                    Watch Video
                                </div>
                            </a>
                        )
                    }

                    if (type === 'image') {
                        return (
                            <div key={i} className={`group relative rounded-lg overflow-hidden border border-white/10 bg-black/40 ${isSingleItem ? 'aspect-video max-h-80' : 'aspect-video'}`}>
                                <img
                                    src={link}
                                    alt="Creator Content"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <ImageIcon className="text-white drop-shadow-md" />
                                </div>
                            </div>
                        );
                    }

                    // Link Preview
                    return (
                        <a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all group h-full"
                        >
                            <div className="bg-indigo-500/20 p-2.5 rounded-full mr-3 text-indigo-300 group-hover:text-indigo-200 shrink-0">
                                <ExternalLink className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-200 group-hover:text-white truncate">
                                    {link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                </p>
                                <p className="text-xs text-muted-foreground font-mono truncate opacity-70">
                                    {link}
                                </p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
