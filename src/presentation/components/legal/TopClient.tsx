'use client';

import { useEffect, useState } from 'react';

type TocItem = { id: string; label: string };
export default function TocClient({ items }: { items: readonly TocItem[] }) {
    const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
                if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
            },
            { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] }
        );

        items.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });

        return () => obs.disconnect();
    }, [items]);

    return (
        <>
            {/* Sommaire mobile */}
            <details className="lg:hidden rounded-[16px] border border-sauge/30 bg-background/70 p-4">
                <summary className="cursor-pointer text-sm font-semibold">Sommaire</summary>
                <ul className="mt-3 space-y-2 text-sm">
                    {items.map((it) => (
                        <li key={it.id}>
                            <a
                                href={`#${it.id}`}
                                className={`underline underline-offset-4 ${activeId === it.id ? 'text-ormat font-semibold' : 'text-foreground/80 hover:text-ormat'}`}
                            >
                                {it.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </details>

            {/* Sommaire desktop (sticky) */}
            <nav aria-label="Sommaire" className="hidden lg:block sticky top-24 rounded-[16px] border border-sauge/30 bg-background/70 p-4 text-sm">
                <ul className="space-y-1">
                    {items.map((it) => (
                        <li key={it.id}>
                            <a
                                href={`#${it.id}`}
                                aria-current={activeId === it.id ? 'true' : undefined}
                                className={`block rounded px-2 py-1 transition ${
                                    activeId === it.id ? 'bg-sauge/15 text-ormat font-semibold' : 'text-foreground/80 hover:text-ormat hover:bg-sauge/10'
                                }`}
                            >
                                {it.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
