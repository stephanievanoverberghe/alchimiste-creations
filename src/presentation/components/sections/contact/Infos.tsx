// src/components/sections/contact/Infos.tsx
import Image from 'next/image';
import { CalendarCheck, Languages, MapPin, Clock, Video, Globe2 } from 'lucide-react';

export default function InfosSection() {
    const items = [
        {
            icon: Globe2,
            title: 'Fuseau horaire',
            desc: 'Europe/Paris (CET/CEST)',
            chip: 'UTC+1 / UTC+2',
        },
        {
            icon: CalendarCheck,
            title: 'Disponibilité',
            desc: '1 projet par mois pour garder de la profondeur.',
            chip: 'Qualité > volume',
        },
        {
            icon: Languages,
            title: 'Langues',
            desc: 'Français (native) · English (pro).',
            chip: 'FR • EN',
        },
        {
            icon: MapPin,
            title: 'Zone',
            desc: 'À distance — France & Europe.',
            chip: 'Visio par défaut',
        },
        {
            icon: Video,
            title: 'Format d’échange',
            desc: 'Zoom ou simple appel audio. Email OK.',
            chip: 'Souple',
        },
        {
            icon: Clock,
            title: 'Réactivité',
            desc: 'Réponse sous 24–48h ouvrées.',
            chip: 'Rapide',
        },
    ] as const;

    return (
        <section id="contact-infos" aria-labelledby="contact-infos-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" aria-hidden />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" aria-hidden />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" fill priority className="object-cover h-auto" />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Infos pratiques
                    </span>
                    <h2 id="contact-infos-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Ce qui est utile à savoir
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">Logistique claire pour se caler rapidement — sans frictions.</p>
                </div>

                {/* Carte liste */}
                <article className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-5 md:p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    {/* motif discret */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    {/* Séparateur animé en haut */}
                    <div className="relative z-[1] h-[2px] overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                        <div
                            className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                            aria-hidden
                        />
                    </div>

                    <ul className="relative z-[1] mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {items.map(({ icon: Icon, title, desc, chip }) => (
                            <li key={title} className="flex items-start gap-3">
                                <span className="grid place-content-center size-9 shrink-0 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                    <Icon className="w-4 h-4" aria-hidden />
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-[13px] md:text-[14px] font-semibold text-foreground/90 tracking-wide">{title}</h3>
                                        <span className="inline-flex items-center rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2 py-0.5 text-[10px] uppercase">
                                            {chip}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-foreground/80 leading-relaxed">{desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
        </section>
    );
}
