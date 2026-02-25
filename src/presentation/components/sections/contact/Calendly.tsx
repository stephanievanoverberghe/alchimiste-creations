import Link from 'next/link';
import Image from 'next/image';
import { CalendarClock, ShieldCheck, LayoutGrid, Layers3 } from 'lucide-react';
import CalendlyGate from '@/presentation/components/integrations/CalendlyGate';

type Search = { name?: string; email?: string; source?: string };

export default function ContactPage({ searchParams }: { searchParams?: Search }) {
    const name = searchParams?.name?.trim() || undefined;
    const email = searchParams?.email?.trim() || undefined;
    const source = searchParams?.source?.trim() || undefined;

    return (
        <section className="relative overflow-x-hidden py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background pointer-events-none" aria-hidden />

            {/* Fond or avec opacité 10% UNIQUEMENT sur mobile */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0 pointer-events-none" aria-hidden />

            {/* Vague décorative visible uniquement à partir de md */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0 pointer-events-none" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>

            <div className="relative z-[1] max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center group">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <CalendarClock className="w-3.5 h-3.5" aria-hidden />
                        Appel découverte — 30 min
                    </span>

                    <h2 className="mt-4 font-title text-3xl md:text-4xl font-bold text-terracotta tracking-widest">Parlons de ton projet</h2>

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
                <div
                    id="contact-schedule"
                    className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-3 md:p-4 shadow-sm scroll-mt-24 focus:outline-none"
                    tabIndex={-1}
                    aria-label="Calendrier de réservation"
                >
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />
                    <div className="relative z-[1]">
                        <CalendlyGate
                            url="https://calendly.com/alchimiste-creations/appel-decouverte?hide_event_type_details=1"
                            height={0}
                            name={name}
                            email={email}
                            source={source}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Lien vers les offres */}
                <div className="text-center">
                    <Link
                        href="/offres"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
            bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold
            tracking-widest uppercase border-b-2 border-r-2 border-ormat transition
            hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40"
                    >
                        <Layers3 className="w-4 h-4" aria-hidden />
                        Voir mes packs
                    </Link>
                </div>

                {/* Note RGPD courte */}
                <p className="text-center text-[11px] text-foreground/60">
                    Calendly traite tes données pour planifier l’appel. En réservant, tu acceptes leurs{' '}
                    <Link
                        href="https://calendly.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 rounded"
                    >
                        règles de confidentialité
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
