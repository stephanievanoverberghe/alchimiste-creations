// components/method/MethodDependenciesSection.tsx
'use client';

import { Box, FileText, Image as ImageIcon, KeySquare, Globe, ShieldCheck, FolderOpen, Type, Link2, ListChecks } from 'lucide-react';

export default function DependenciesSection() {
    const prereq = [
        { icon: FileText, label: 'Textes principaux (Google Doc / Markdown)' },
        { icon: ImageIcon, label: 'Images/visuels (WebP/AVIF) + crédits' },
        { icon: KeySquare, label: 'Accès (hébergeur, DNS, Analytics, CMS)' },
        { icon: Globe, label: 'Nom de domaine & paramètres DNS' },
        { icon: ShieldCheck, label: 'Contraintes légales (mentions, RGPD)' },
    ];

    const formats = [
        { icon: FileText, label: 'Google Doc structuré (H1–H3, listes, liens internes)' },
        { icon: ImageIcon, label: 'Dossier /images trié par page (WebP/AVIF)' },
        { icon: Type, label: 'Typographies (licences + WOFF2)' },
        { icon: FolderOpen, label: 'Espace partagé (Drive/Notion) unique' },
    ];

    const best = [
        { icon: Link2, label: 'Droits/licences clairs (photos, polices, logos)' },
        { icon: Type, label: 'Ton éditorial clair & orienté bénéfices' },
        { icon: FileText, label: 'Longueurs indicatives : 250–600 mots/page clé' },
        { icon: ListChecks, label: 'Checklist d’envoi : textes, images, accès' },
    ];

    return (
        <section id="dependances" aria-labelledby="dependances-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Box className="w-3.5 h-3.5" aria-hidden />
                        <span>Dépendances & contenus</span>
                    </span>
                    <h2 id="dependances-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Ce dont j’ai besoin pour démarrer vite et bien
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Un cadre simple pour éviter les allers-retours inutiles&nbsp;: prérequis, formats attendus et bonnes pratiques de contenu.
                    </p>
                </div>

                {/* Grille 3 cartes */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {/* Prérequis */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <KeySquare className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Avant de démarrer (prérequis)</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {prereq.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Icon className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Globe className="w-3.5 h-3.5" /> DNS/SSL
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <ShieldCheck className="w-3.5 h-3.5" /> RGPD
                            </span>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Partage des accès hébergeur + registrar, doc “Mentions légales & politique de confidentialité”, dossier images existant.
                            </p>
                        </div>
                    </article>

                    {/* Formats attendus */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <FolderOpen className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Formats attendus</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {formats.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Icon className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <FileText className="w-3.5 h-3.5" /> Google Doc
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <ImageIcon className="w-3.5 h-3.5" /> WebP/AVIF
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-xs">
                                <Type className="w-3.5 h-3.5" /> WOFF2
                            </span>
                        </div>

                        <div className="mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Drive partagé&nbsp;: <em>/Site</em> → <em>/Textes</em> (1 doc/page) • <em>/Images</em> (dossiers par page) • <em>/Fonts</em> (licences + WOFF2).
                            </p>
                        </div>
                    </article>

                    {/* Bonnes pratiques contenus */}
                    <article className="group h-full flex flex-col rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:col-span-2 xl:col-span-1">
                        <div className="flex items-center gap-3">
                            <span className="grid place-content-center size-9 rounded-full border border-sauge/40 bg-sauge/10 text-sauge">
                                <ListChecks className="w-4 h-4" aria-hidden />
                            </span>
                            <h3 className="text-[11px] tracking-[0.14em] uppercase font-semibold text-terracotta">Bonnes pratiques de contenu</h3>
                        </div>

                        <div className="mt-3 relative h-[2px] overflow-hidden">
                            <div className="absolute inset-0 bg-sauge/20" />
                            <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full" />
                        </div>

                        <ul className="mt-4 space-y-2">
                            {best.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-start gap-2.5">
                                    <span className="grid place-content-center size-7 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                        <Icon className="w-3.5 h-3.5" aria-hidden />
                                    </span>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{label}</span>
                                </li>
                            ))}
                        </ul>

                        <div className=" pt-4 mt-3 rounded-xl border border-sauge/20 bg-sauge/5 p-3">
                            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-sauge/90">Exemple</p>
                            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                Hero direct (bénéfice, preuve, CTA), sections en listes courtes, visuels légendés, liens vers /offres et /contact.
                            </p>
                        </div>
                    </article>
                </div>

                <p className="text-xs text-foreground/70">* Un seul espace partagé fait foi (Drive/Notion). J’aide à trier/convertir si besoin (images → WebP, polices → WOFF2).</p>
            </div>
        </section>
    );
}
