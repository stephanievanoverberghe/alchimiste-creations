import Image from 'next/image';
import { CalendarCheck, Languages, MapPin, Clock, Video, Globe2 } from 'lucide-react';
import { getContactInfosContent } from '@/application/contact';

const content = getContactInfosContent();

const iconByName = {
    globe: Globe2,
    calendar: CalendarCheck,
    languages: Languages,
    mapPin: MapPin,
    video: Video,
    clock: Clock,
} as const;

export default function InfosSection() {
    return (
        <section id="contact-infos" aria-labelledby="contact-infos-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-background via-ormat/20 to-background" aria-hidden />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" aria-hidden />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" fill priority className="object-cover h-auto" />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        {content.badge}
                    </span>
                    <h2 id="contact-infos-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {content.title}
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{content.description}</p>
                </div>

                <article className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-5 md:p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    <div className="relative z-1 h-0.5 overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                        <div
                            className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                            aria-hidden
                        />
                    </div>

                    <ul className="relative z-1 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {content.items.map(({ icon, title, desc, chip }) => {
                            const Icon = iconByName[icon];

                            return (
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
                            );
                        })}
                    </ul>
                </article>
            </div>
        </section>
    );
}
