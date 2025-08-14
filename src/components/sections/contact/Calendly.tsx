import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarClock, ShieldCheck, LayoutGrid, Layers3 } from 'lucide-react';
import CalendlyIframe from '@/components/integrations/CalendlyIframe';

export const metadata: Metadata = {
    title: 'Contact — Réserver un appel découverte (30 min)',
    description: 'Prends un créneau de 30 minutes pour parler de ton projet (sans pression). Réponse rapide.',
    alternates: { canonical: '/contact' },
    openGraph: { title: 'Contact', description: 'Réserve un appel découverte.' },
};

type Search = { name?: string; email?: string; source?: string };

export default function ContactPage({ searchParams }: { searchParams?: Search }) {
    const name = searchParams?.name?.trim() || undefined;
    const email = searchParams?.email?.trim() || undefined;

    return (
        <section className="relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <CalendarClock className="w-3.5 h-3.5" aria-hidden />
                        Appel découverte — 30 min
                    </span>
                    <h1 className="mt-4 font-title text-3xl md:text-4xl font-bold text-terracotta tracking-widest">Parlons de ton projet</h1>
                    <p className="mt-3 text-foreground/80">
                        Choisis un créneau dans l’agenda ci-dessous. <em className="not-italic">Sans jargon, sans pression.</em>
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-sauge" /> Réponse rapide
                        </div>
                        <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-terracotta/30 bg-terracotta/10 px-3 py-2">
                            <LayoutGrid className="w-3.5 h-3.5 text-terracotta" /> Packs clairs
                        </div>
                        <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2">
                            <CalendarClock className="w-3.5 h-3.5 text-sauge" /> 30 minutes
                        </div>
                    </div>
                </div>

                {/* Calendly */}
                <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-3 md:p-4 shadow-sm">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />
                    <div className="relative z-[1]">
                        <CalendlyIframe url="https://calendly.com/alchimiste-creations/appel-decouverte?hide_event_type_details=1" height={720} name={name} email={email} />
                        <p className="mt-3 text-center text-xs text-foreground/60">
                            Si l’embed ne s’affiche pas,&nbsp;
                            <Link href="https://calendly.com/alchimiste-creations/appel-decouverte" target="_blank" className="underline underline-offset-2">
                                ouvre Calendly dans un nouvel onglet
                            </Link>
                            .
                        </p>
                    </div>
                </div>

                {/* Lien vers les offres */}
                <div className="text-center">
                    <Link
                        href="/offres"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
            bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
            tracking-widest uppercase border-b-2 border-r-2 border-ormat transition
            hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]"
                    >
                        <Layers3 className="w-4 h-4" aria-hidden />
                        Voir mes packs
                    </Link>
                </div>

                {/* Note RGPD courte */}
                <p className="text-center text-[11px] text-foreground/60">
                    Calendly traite tes données pour planifier l’appel. En réservant, tu acceptes leurs{' '}
                    <Link href="https://calendly.com/privacy" target="_blank" className="underline underline-offset-2">
                        règles de confidentialité
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
