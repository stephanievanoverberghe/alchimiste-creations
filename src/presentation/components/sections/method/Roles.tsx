'use client';

import Image from 'next/image';
import { Users, UserCheck, Handshake, CheckCircle2, Clock, FileText, LayoutTemplate, Palette, Code2, KeyRound, PlayCircle, Database } from 'lucide-react';

import { resolveDeliverableFormatIcon, type DeliverableFormatIconKey } from '@/application/method/services/resolveDeliverableFormatIcon';
import { methodRolesCopy } from '@/infrastructure/content/method-copy';

type RolesProps = {
    mine?: string[];
    yours?: string[];
    shared?: string[];
    sla?: {
        me?: string;
        you?: string;
    };
    formats?: string[];
};

const formatIcons: Record<DeliverableFormatIconKey, typeof FileText> = {
    layoutTemplate: LayoutTemplate,
    fileText: FileText,
    palette: Palette,
    database: Database,
    code2: Code2,
    playCircle: PlayCircle,
    keyRound: KeyRound,
};

export default function RolesSection({ mine, yours, shared, sla, formats }: RolesProps) {
    const meItems = mine ?? methodRolesCopy.defaults.mine;
    const youItems = yours ?? methodRolesCopy.defaults.yours;
    const sharedItems = shared ?? methodRolesCopy.defaults.shared;
    const responseSla = {
        me: sla?.me ?? methodRolesCopy.defaults.sla.me,
        you: sla?.you ?? methodRolesCopy.defaults.sla.you,
    };

    const deliverableFormats = formats ?? methodRolesCopy.defaults.formats;

    return (
        <section id="roles" aria-labelledby="roles-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-25 xl:px-37.5">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <Users className="w-3.5 h-3.5" aria-hidden />
                        <span>{methodRolesCopy.badge}</span>
                    </span>
                    <h2 id="roles-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        {methodRolesCopy.title}
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{methodRolesCopy.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {[
                        { title: methodRolesCopy.labels.me, icon: UserCheck, items: meItems },
                        { title: methodRolesCopy.labels.you, icon: Users, items: youItems },
                        { title: methodRolesCopy.labels.shared, icon: Handshake, items: sharedItems },
                    ].map(({ title, icon: Icon, items }) => (
                        <article
                            key={title}
                            className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                    <Icon className="w-4 h-4" aria-hidden />
                                </span>
                                <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{title}</h3>
                            </div>

                            <div className="mt-3 relative h-0.5 overflow-hidden">
                                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                                <div className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                            </div>

                            <ul className="mt-3 space-y-2.5">
                                {items.map((item) => (
                                    <li key={item} className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                        <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="rounded-[20px] border border-sauge/30 bg-background p-5">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-sauge" aria-hidden />
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{methodRolesCopy.labels.slaTitle}</p>
                        </div>
                        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <li className="flex items-center gap-2 rounded-xl border border-sauge/20 bg-sauge/5 px-3 py-2">
                                <UserCheck className="w-4 h-4 text-sauge" aria-hidden />
                                <span className="text-sm text-foreground/80">
                                    {methodRolesCopy.labels.me}&nbsp;: {responseSla.me}
                                </span>
                            </li>
                            <li className="flex items-center gap-2 rounded-xl border border-sauge/20 bg-sauge/5 px-3 py-2">
                                <Users className="w-4 h-4 text-sauge" aria-hidden />
                                <span className="text-sm text-foreground/80">
                                    {methodRolesCopy.labels.you}&nbsp;: {responseSla.you}
                                </span>
                            </li>
                        </ul>
                        <p className="mt-2 text-xs text-foreground/70">{methodRolesCopy.labels.slaFootnote}</p>
                    </div>

                    <div className="rounded-[20px] border border-sauge/30 bg-background p-5">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-sauge" aria-hidden />
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">{methodRolesCopy.labels.deliverablesTitle}</p>
                        </div>

                        <ul className="mt-3 flex flex-wrap gap-2">
                            {deliverableFormats.map((format) => {
                                const FormatIcon = formatIcons[resolveDeliverableFormatIcon(format)];

                                return (
                                    <li key={format} className="inline-flex items-center gap-2 rounded-xl border border-sauge/20 bg-sauge/5 px-3 py-1.5 text-sm text-foreground/80">
                                        <FormatIcon className="w-4 h-4 text-sauge" aria-hidden />
                                        <span>{format}</span>
                                    </li>
                                );
                            })}
                        </ul>
                        <p className="mt-2 text-xs text-foreground/70">{methodRolesCopy.labels.deliverablesFootnote}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
