'use client';

import { MessageSquare, Wrench, LayoutTemplate, FileText, GitBranch, BarChart3, CalendarClock, Phone, Mail, PlayCircle, ClipboardList, CheckCircle2 } from 'lucide-react';

type ToolsProps = {
    outils?: string[];
    rituels?: {
        label: string;
        detail: string;
    }[];
    sourceOfTruth?: string;
};

export default function ToolsSection({ outils, rituels, sourceOfTruth }: ToolsProps) {
    const TOOLS = outils ?? ['Figma', 'Notion', 'Slack/Email', 'Git (GitHub)', 'Analytics (Plausible/GA4)', 'Replay vidéo (OBS Studio)'];

    const RITUELS = rituels ?? [
        { label: 'Kick-off', detail: '60–90 min — objectifs, audience, arbo & jalons' },
        { label: 'Point hebdo', detail: '15–20 min — avancement + prochaines actions' },
        { label: 'Canal support', detail: 'Message unique → réponse sous 24–48 h ouvrées' },
        { label: 'Récap de fin d’étape', detail: 'Checklists, décisions, prochaines livraisons' },
    ];

    const SOT = sourceOfTruth ?? 'Notion';

    const iconForTool = (name: string) => {
        if (/figma/i.test(name)) return <LayoutTemplate className="w-4 h-4 text-sauge" aria-hidden />;
        if (/notion/i.test(name)) return <FileText className="w-4 h-4 text-sauge" aria-hidden />;
        if (/slack|mail|email/i.test(name)) return <MessageSquare className="w-4 h-4 text-sauge" aria-hidden />;
        if (/git|github|gitlab/i.test(name)) return <GitBranch className="w-4 h-4 text-sauge" aria-hidden />;
        if (/analytic|plausible|ga4|matomo/i.test(name)) return <BarChart3 className="w-4 h-4 text-sauge" aria-hidden />;
        if (/replay|loom|video/i.test(name)) return <PlayCircle className="w-4 h-4 text-sauge" aria-hidden />;
        return <Wrench className="w-4 h-4 text-sauge" aria-hidden />;
    };

    return (
        <section id="outils" aria-labelledby="outils-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête (badge + H2 + phrase) */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <MessageSquare className="w-3.5 h-3.5" aria-hidden />
                        <span>Outils & rituels</span>
                    </span>
                    <h2 id="outils-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Outils & rituels de communication
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Suivi clair et transparence à chaque étape : des outils simples, un rythme léger, et un seul canal <em className="not-italic">source of truth</em> pour ne
                        rien perdre.
                    </p>
                </div>

                {/* Grille : Outils (chips) + Rituels (liste) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Outils */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <Wrench className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Outils</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-3 flex flex-wrap gap-2">
                            {TOOLS.map((t) => (
                                <li key={t} className="inline-flex items-center gap-2 rounded-xl border border-sauge/20 bg-sauge/5 px-3 py-1.5 text-sm text-foreground/80">
                                    {iconForTool(t)}
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Source of truth</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                {SOT} centralise les décisions, les liens et les livrables. Les échanges se font dans un <strong>seul</strong> fil pour éviter la dispersion.
                            </p>
                        </div>
                    </article>

                    {/* Rituels */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <CalendarClock className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Rituels</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-3 space-y-2.5">
                            {RITUELS.map((r) => (
                                <li key={r.label} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                    <div>
                                        <p className="text-sm font-medium tracking-wide">{r.label}</p>
                                        <p className="text-sm text-foreground/80">{r.detail}</p>
                                    </div>
                                </li>
                            ))}
                            {/* canaux rapides en option */}
                            <li className="flex items-start gap-2.5">
                                <ClipboardList className="w-4 h-4 mt-0.5 text-sauge" aria-hidden />
                                <div>
                                    <p className="text-sm font-medium tracking-wide">Canaux rapides</p>
                                    <p className="text-sm text-foreground/80">
                                        Appel (si besoin) <Phone className="inline w-3.5 h-3.5" /> — Recap par email <Mail className="inline w-3.5 h-3.5" /> systématique.
                                    </p>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-4 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Engagement de réponse</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Les messages reçoivent une réponse sous <strong>24–48 h ouvrées</strong>. Les validations se font dans les fenêtres prévues à chaque jalon.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
