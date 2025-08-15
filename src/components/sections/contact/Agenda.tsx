'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ClipboardList, Target, Wallet, CalendarClock, Sparkles, LayoutGrid, Images, ChevronRight } from 'lucide-react';

type Props = {
    id?: string;
    /** Lien vers le PDF (ex: /brief-express.pdf dans /public) */
    briefUrl?: string;
    className?: string;
};

export default function AgendaSection({ id = 'contact-agenda', briefUrl, className }: Props) {
    return (
        <section id={id} className={cn('relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px] scroll-mt-24', className)} aria-labelledby="contact-agenda-title">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background pointer-events-none" aria-hidden />

            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0 pointer-events-none" aria-hidden />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0 pointer-events-none" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>
            <div className="relative max-w-5xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Préparer l’appel
                    </span>
                    <h2 id="contact-agenda-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Ce qu’on verra ensemble
                    </h2>
                    <p className="mt-4 text-foreground/80">Le but : lever les doutes, cadrer l’échange et repartir avec des prochains pas clairs.</p>
                </div>

                {/* Grille 2 colonnes : gauche = agenda de l’appel, droite = préparation (avec PDF) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Carte — Agenda de l’appel */}
                    <article className="group relative h-full flex flex-col overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        {/* motif discret */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                            aria-hidden
                        />
                        {/* Header */}
                        <header className="relative z-[1] flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <ClipboardList className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Trame de l’appel (30 min)</h3>
                        </header>
                        {/* Séparateur animé */}
                        <div className="relative z-[1] mt-3 h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                aria-hidden
                            />
                        </div>
                        {/* Corps */}
                        <ul className="relative z-[1] mt-3 space-y-3 text-sm text-foreground/85">
                            <li className="flex items-start gap-3">
                                <span className="grid place-content-center size-8 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <ClipboardList className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-medium">Contexte & audience</p>
                                    <p className="opacity-80">Où tu en es, à qui on s’adresse, ce qui a déjà été fait.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="grid place-content-center size-8 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Target className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-medium">Objectifs & critères de succès</p>
                                    <p className="opacity-80">Ce qu’on veut atteindre et comment on mesurera la réussite.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="grid place-content-center size-8 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Wallet className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-medium">Budget & périmètre</p>
                                    <p className="opacity-80">Fourchette réaliste, options, priorités, ressources.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="grid place-content-center size-8 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <CalendarClock className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-medium">Délais & roadmap</p>
                                    <p className="opacity-80">Fenêtre idéale, jalons clés, prochains pas après l’appel.</p>
                                </div>
                            </li>
                        </ul>
                    </article>

                    {/* Carte — Bien se préparer (avec PDF) */}
                    <article className="group relative h-full flex flex-col overflow-hidden rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        {/* motif discret */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                            aria-hidden
                        />
                        {/* Header */}
                        <header className="relative z-[1] flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Sparkles className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Bien se préparer (optionnel)</h3>
                        </header>
                        {/* Séparateur animé */}
                        <div className="relative z-[1] mt-3 h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div
                                className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                                aria-hidden
                            />
                        </div>
                        {/* Corps : points pratiques que tu voulais */}
                        <ul className="relative z-[1] mt-3 space-y-3 text-sm text-foreground/85">
                            <li className="flex items-start gap-3">
                                <span className="grid place-content-center size-8 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Sparkles className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-medium">1–2 sites qui t’inspirent</p>
                                    <p className="opacity-80">Des liens rapides pour capter ton univers.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="grid place-content-center size-8 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <LayoutGrid className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-medium">La liste des pages</p>
                                    <p className="opacity-80">Accueil, À propos, Prestations, Portfolio, Contact…</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="grid place-content-center size-8 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Images className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-medium">Tes contenus</p>
                                    <p className="opacity-80">Logo, couleurs, textes, photos — prêts ou à créer.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="grid place-content-center size-8 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Target className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-medium">Ton objectif principal</p>
                                    <p className="opacity-80">Vendre, prendre RDV, présenter ton univers…</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="grid place-content-center size-8 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Wallet className="w-4 h-4" aria-hidden />
                                </span>
                                <div>
                                    <p className="font-medium">Budget & échéance préférés</p>
                                    <p className="opacity-80">Une fourchette + une date cible suffisent.</p>
                                </div>
                            </li>
                        </ul>

                        {/* CTA(s) */}
                        <div className="relative z-[1] mt-5 flex flex-wrap items-center gap-2">
                            {briefUrl && (
                                <a
                                    href={briefUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl',
                                        'bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase',
                                        'border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                                    )}
                                >
                                    Brief express (PDF)
                                    <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden />
                                </a>
                            )}
                            <a
                                href="#contact-schedule"
                                className="inline-flex items-center justify-center rounded-2xl border border-sauge/40 bg-sauge/10 px-4 py-2 text-sm font-semibold text-sauge hover:bg-sauge/20"
                            >
                                Ou réserver un créneau
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
