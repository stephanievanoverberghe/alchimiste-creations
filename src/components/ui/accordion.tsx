import { type FAQ } from '@/content/schemas';
import { Plus } from 'lucide-react';

export function Accordion({ items }: { items: FAQ[] }) {
    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <details
                    key={item.question}
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background/40 p-0 transition-all duration-300 open:border-accent/45 open:bg-background/55"
                    style={{ animationDelay: `${index * 80}ms` }}
                >
                    <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 marker:content-none">
                        <span className="font-medium text-text">{item.question}</span>
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/70 transition-all duration-300 group-open:rotate-45 group-open:border-accent/45 group-open:text-accent">
                            <Plus className="h-4 w-4" />
                        </span>
                    </summary>

                    <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-open:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                            <p className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-text-muted">{item.answer}</p>
                        </div>
                    </div>
                </details>
            ))}
        </div>
    );
}
