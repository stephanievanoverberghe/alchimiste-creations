'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, X as ClearIcon, Tag as TagIcon, ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { useFaqSearch } from '@/presentation/hooks/useFaqSearch';

type Tech = 'any' | 'wordpress' | 'react';
type Surface = 'offers' | 'offer' | 'projects' | 'faq' | 'method';
type PackSlug = 'essentiel' | 'croissance' | 'signature';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function highlight(text: string, raw: string) {
    const query = raw.trim();
    if (!query || query.length < 2) return text;

    const parts = query.split(/\s+/).filter(Boolean);

    if (!parts.length) return text;
    const regex = new RegExp(`(${parts.map(escapeRegExp).join('|')})`, 'gi');
    return text.split(regex).map((token, index) =>
        regex.test(token) ? (
            <mark key={index} className="bg-ormat/20 rounded px-0.5">
                {token}
            </mark>
        ) : (
            <span key={index}>{token}</span>
        ),
    );
}

export default function FAQBareList({
    mode = 'compact',
    withJsonLd = false,
    limit = 6,
    className = '',
    techFilter = 'any',
    surface = 'faq',
    packSlug,
}: {
    mode?: 'compact' | 'full';
    withJsonLd?: boolean;
    limit?: number;
    className?: string;
    techFilter?: Tech;
    surface?: Surface;
    packSlug?: PackSlug;
}) {
    const [openId, setOpenId] = useState<string | null>(null);

    const { items, allTags, rawQuery, activeTag, setRawQuery, setActiveTag } = useFaqSearch({ mode, limit, techFilter, surface, packSlug });

    useEffect(() => {
        setOpenId(null);
    }, [rawQuery, activeTag, mode, techFilter, surface, packSlug]);

    const jsonLd = useMemo(() => {
        if (!withJsonLd) return null;
        return {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.slice(0, 10).map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
        };
    }, [items, withJsonLd]);

    return (
        <>
            {mode === 'full' && (
                <div className="mb-4 md:mb-6 flex flex-col gap-3">
                    <label className="relative block">
                        <span className="sr-only">Rechercher dans la FAQ</span>
                        <input
                            value={rawQuery}
                            onChange={(e) => setRawQuery(e.target.value)}
                            placeholder="Rechercher une question… (paiement, délais, SEO, WordPress…)"
                            className="w-full rounded-2xl border border-sauge/40 bg-background px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sauge/40"
                            aria-label="Rechercher dans la FAQ"
                            autoComplete="off"
                            spellCheck={false}
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" aria-hidden />
                        {rawQuery && (
                            <button
                                type="button"
                                onClick={() => setRawQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-foreground/5"
                                aria-label="Effacer la recherche"
                            >
                                <ClearIcon className="w-4 h-4 text-foreground/60" />
                            </button>
                        )}
                    </label>

                    {allTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveTag(null)}
                                className={cn(
                                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition',
                                    activeTag === null ? 'bg-sauge/15 border-sauge/40 cursor-default' : 'border-sauge/30 hover:bg-sauge/10 cursor-pointer',
                                )}
                            >
                                <TagIcon className="w-3.5 h-3.5" />
                                Tout
                            </button>
                            {allTags.map(({ tag, count }) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                    className={cn(
                                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition',
                                        activeTag === tag ? 'bg-sauge/15 border-sauge/40 cursor-default' : 'border-sauge/30 hover:bg-sauge/10 cursor-pointer',
                                    )}
                                    aria-pressed={activeTag === tag}
                                >
                                    <TagIcon className="w-3.5 h-3.5" />
                                    {tag}
                                    <span className="opacity-70">· {count}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <ul className={`grid grid-cols-1 gap-4 md:gap-5 ${className}`}>
                {items.map((item) => {
                    const isOpen = openId === item.id;
                    return (
                        <li key={item.id} className="relative">
                            <div
                                className={cn(
                                    'group relative rounded-[20px] border bg-background p-0 shadow-sm transition-all',
                                    'border-sauge/30 hover:-translate-y-0.5 hover:shadow-md',
                                )}
                            >
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${item.id}`}
                                    onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                                    className="w-full flex items-start gap-3 px-5 py-4 text-left cursor-pointer"
                                >
                                    <span className="grid place-content-center size-8 shrink-0 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <HelpCircle className="w-4 h-4" aria-hidden />
                                    </span>

                                    <h3 className="flex-1 text-[14px] md:text-base font-semibold text-foreground/90 leading-snug">{highlight(item.q, rawQuery)}</h3>

                                    <span
                                        className={cn(
                                            'ml-2 inline-flex items-center justify-center size-8 rounded-full border transition',
                                            'border-ormat/30 bg-ormat/10 text-ormat',
                                            'group-hover:scale-105',
                                        )}
                                        aria-hidden
                                    >
                                        <ChevronDown className={cn('w-4 h-4 transition-transform duration-300 ease-out', isOpen ? 'rotate-180' : 'rotate-0')} />
                                    </span>
                                </button>

                                <div
                                    id={`faq-panel-${item.id}`}
                                    className={cn('grid transition-[grid-template-rows] duration-300 ease-out px-5', isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr] pb-0')}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-sm text-foreground/80 leading-relaxed">{highlight(item.a, rawQuery)}</p>
                                    </div>
                                </div>

                                <div className="pointer-events-none absolute left-5 right-5 bottom-3 h-[2px] overflow-hidden">
                                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                    <div
                                        className={cn(
                                            'absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out',
                                            'group-hover:w-full',
                                            isOpen ? 'w-1/2' : 'w-0',
                                        )}
                                        aria-hidden
                                    />
                                </div>
                            </div>
                        </li>
                    );
                })}

                {items.length === 0 && (
                    <li className="rounded-[20px] border border-sauge/30 bg-background p-5 text-sm text-foreground/70">
                        Pas de résultat. Essaie avec un autre terme (ex. “paiement”, “délais”, “SEO”, “WordPress”…).
                    </li>
                )}
            </ul>

            <div className="mt-10 flex flex-col items-center lg:items-start gap-3">
                {mode === 'compact' && (
                    <Link
                        href="/faq"
                        className={cn(
                            'inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-center',
                            'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                            'border-b-2 border-r-2 border-ormat transition hover:scale-105',
                            'shadow-[0px_2px_6px_rgba(164,75,52,0.25)]',
                        )}
                    >
                        <HelpCircle className="w-4 h-4" aria-hidden />
                        Voir toutes les questions
                    </Link>
                )}

                <p className="text-xs text-foreground/70 text-center lg:text-left">
                    Il te manque une info ?{' '}
                    <Link href="/contact" className={cn('underline underline-offset-4 decoration-sauge hover:opacity-80')}>
                        Écris-moi
                    </Link>{' '}
                    et je t’aide avec plaisir.
                </p>
            </div>

            {withJsonLd && jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        </>
    );
}
