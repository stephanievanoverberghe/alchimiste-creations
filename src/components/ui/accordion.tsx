import { type FAQ } from '@/content/schemas';

export function Accordion({ items }: { items: FAQ[] }) {
    return (
        <div className="space-y-3">
            {items.map((item) => (
                <details key={item.question} className="glass group rounded-2xl p-5 open:border-primary/40">
                    <summary className="focus-ring cursor-pointer list-none pr-8 font-medium marker:content-none">{item.question}</summary>
                    <p className="pt-3 text-sm leading-relaxed text-text-muted">{item.answer}</p>
                </details>
            ))}
        </div>
    );
}
