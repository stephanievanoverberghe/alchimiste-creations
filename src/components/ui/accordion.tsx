'use client';

import { type FAQ } from '@/content/schemas';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';

export function Accordion({ items }: { items: FAQ[] }) {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);
    const accordionId = useId();

    const toggleItem = (index: number) => {
        setOpenIndexes((prev) => (prev.includes(index) ? prev.filter((itemIndex) => itemIndex !== index) : [...prev, index]));
    };

    return (
        <div className="space-y-3">
            {items.map((item, index) => {
                const isOpen = openIndexes.includes(index);
                const triggerId = `${accordionId}-trigger-${index}`;
                const panelId = `${accordionId}-panel-${index}`;

                return (
                    <article
                        key={item.question}
                        className="faq-accordion relative overflow-hidden rounded-2xl border border-border/70 bg-background/40 p-0 transition-all duration-300"
                        data-state={isOpen ? 'open' : 'closed'}
                        style={{ animationDelay: `${index * 80}ms` }}
                    >
                        <div aria-hidden="true" className="faq-accordion__glow" />
                        <h3>
                            <button
                                id={triggerId}
                                type="button"
                                className="focus-ring flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-4 text-left"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggleItem(index)}
                            >
                                <span className="faq-accordion__question font-medium text-text">{item.question}</span>
                                <span className="faq-accordion__icon mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/70 transition-all duration-300">
                                    <Plus className="h-4 w-4" />
                                </span>
                            </button>
                        </h3>

                        <div id={panelId} role="region" aria-labelledby={triggerId} className="faq-accordion__content grid" data-state={isOpen ? 'open' : 'closed'}>
                            <div className="faq-accordion__content-inner overflow-hidden">
                                <p className="faq-accordion__answer border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-text-muted">{item.answer}</p>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
