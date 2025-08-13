// components/modals/ProjectQuickView.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProjectQuickViewData = {
    title: string;
    subtitle?: string;
    logoSrc?: string;
    link: string;
    isExternal?: boolean;

    // éditorial
    pourQui?: string;
    besoin?: string;
    proposition?: string[];
    resultat?: string;
    citationClient?: string;
    testimonials?: { quote?: string; author?: string }[];
};

export default function ProjectQuickView({ open, onClose, project, className }: { open: boolean; onClose: () => void; project: ProjectQuickViewData | null; className?: string }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open || !project) return null;

    const quote = project.citationClient || project.testimonials?.[0]?.quote || undefined;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className={cn('fixed inset-0 z-[90] flex items-center px-3 md:px-0 justify-center', 'bg-black/40 backdrop-blur-sm', className)}
            onClick={onClose}
        >
            <article
                className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-auto rounded-[22px] border border-sauge/30 bg-background shadow-xl p-5 md:p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fermer"
                    className="absolute right-3 top-3 inline-flex items-center justify-center rounded-xl border border-ormat/30 bg-ormat/10 p-1.5 text-ormat hover:bg-ormat/15"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Header visuel (logo + titre) */}
                <div className="flex items-start gap-4">
                    <div className="relative grid place-content-center size-16 rounded-xl border border-sauge/30 bg-sauge/10 shrink-0">
                        {project.logoSrc ? (
                            <Image src={project.logoSrc} alt={`${project.title} — logo`} fill className="object-contain p-3" sizes="64px" />
                        ) : (
                            <span className="text-xs text-ormat">Logo</span>
                        )}
                    </div>

                    <header>
                        <h3 className="text-xl md:text-2xl font-semibold tracking-wide text-foreground">{project.title}</h3>
                        {project.subtitle && <p className="text-sm text-foreground/80 mt-0.5">{project.subtitle}</p>}
                    </header>
                </div>

                {/* Séparateur fin */}
                <div className="mt-4 relative h-[2px] overflow-hidden">
                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                    <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-sauge via-terracotta to-sauge opacity-60" aria-hidden />
                </div>

                {/* Corps éditorial */}
                <div className="mt-4 grid gap-3 text-sm text-foreground/85">
                    {project.pourQui && (
                        <p>
                            <span className="font-semibold">Qui :</span> {project.pourQui}
                        </p>
                    )}
                    {project.besoin && (
                        <p>
                            <span className="font-semibold">Intention :</span> {project.besoin}
                        </p>
                    )}
                    {!!project.proposition?.length && (
                        <ul className="mt-1 space-y-1.5">
                            {project.proposition.slice(0, 5).map((bp) => (
                                <li key={bp} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 w-4 h-4 text-sauge shrink-0" aria-hidden />
                                    <span>{bp}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {project.resultat && (
                        <p className="mt-1">
                            <span className="font-semibold">Résultat :</span> {project.resultat}
                        </p>
                    )}
                    {quote && (
                        <blockquote className="relative mt-2 rounded-xl border border-sauge/30 bg-sauge/10 p-3">
                            <Quote className="absolute -left-2 -top-2 w-5 h-5 text-sauge/70" aria-hidden />
                            <p className="pl-4 italic">“{quote}”</p>
                        </blockquote>
                    )}
                </div>

                {/* CTA bas (full align) */}
                <div className="mt-5 flex justify-end">
                    <Link
                        href={project.link}
                        prefetch={project.isExternal ? false : undefined}
                        target={project.isExternal ? '_blank' : undefined}
                        rel={project.isExternal ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold uppercase tracking-[0.14em] border border-terracotta/30 bg-terracotta/10 text-terracotta hover:bg-terracotta/15 transition"
                    >
                        Voir le projet <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </article>
        </div>
    );
}
