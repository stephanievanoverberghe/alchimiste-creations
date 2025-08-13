import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export type RawProject = {
    slug?: string;
    titre?: string;
    title?: string;
    sousTitre?: string;
    description?: string;
    pourQui?: string;
    besoin?: string;
    proposition?: string[];
    resultat?: string;
    citationClient?: string;
    temoignage?: string;
    testimonials?: { quote?: string; author?: string }[];
    kind?: string;
    stack?: string;
    status?: string;
    logo?: string;
    image?: string;
    media?: { cover?: string };
    lien?: string;
    urls?: { caseStudy?: string };
    external?: boolean;
    featured?: boolean;
    priority?: number;
    year?: number;
};

export type CardFeaturedCasesProps = {
    project: RawProject;
    className?: string;
    ctaLabel?: string;
};

const FALLBACK_LOGO = '/images/placeholders/logo.png';

export default function CardFeaturedCases({ project, className, ctaLabel = 'Voir le projet' }: CardFeaturedCasesProps) {
    const title = (project.titre && project.titre.trim()) || (project.title && project.title.trim()) || 'Projet';

    const subtitle = (project.sousTitre && project.sousTitre.trim()) || (project.description && project.description.trim()) || undefined;

    const logoSrc = (project.logo && project.logo.trim()) || FALLBACK_LOGO;

    const link = (project.lien && project.lien.trim()) || (project.urls?.caseStudy && project.urls.caseStudy.trim()) || (project.slug ? `/projets/${project.slug}` : '#');

    const isExternal = typeof project.external === 'boolean' ? project.external : /^https?:\/\//i.test(link);

    const citation =
        (project.citationClient && project.citationClient.trim()) ||
        (project.temoignage && project.temoignage.trim()) ||
        (project.testimonials && project.testimonials[0]?.quote) ||
        undefined;

    const points = Array.isArray(project.proposition) ? project.proposition.filter((s): s is string => typeof s === 'string').slice(0, 3) : [];

    return (
        <Link
            href={link}
            prefetch={isExternal ? false : undefined}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={`${ctaLabel} : ${title}`}
            className={cn(
                'group relative block cursor-pointer',
                // focus ring sur le wrapper
                'rounded-[20px] focus:outline-none h-full focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                className
            )}
        >
            <article className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-sauge/30 bg-background shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md pb-4">
                {/* Media */}
                <div className="relative aspect-[16/10]">
                    <div className="absolute inset-0 flex items-center justify-center bg-background text-ormat">
                        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden />
                        {logoSrc ? (
                            <Image src={logoSrc} alt={`${title} — logo`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-8" priority={false} />
                        ) : (
                            <div className="relative z-[1] px-6 py-4 rounded-md border border-ormat/30 bg-background/60 text-ormat text-xs tracking-wider uppercase">
                                Logo à venir
                            </div>
                        )}
                    </div>

                    {/* Badges */}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                        {project.kind && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-terracotta">
                                {labelKind(project.kind)}
                            </span>
                        )}
                        {project.stack && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-sauge/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sauge">
                                {labelStack(project.stack)}
                            </span>
                        )}
                        {project.status === 'wip' && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-ormat/30 bg-ormat/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ormat">
                                En cours
                            </span>
                        )}
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/0 to-transparent" />
                </div>

                {/* Contenu */}
                <div className="p-5 md:p-6 space-y-3 flex flex-col flex-1 pb-6">
                    <header className="space-y-1">
                        <h3 className="text-lg md:text-xl font-semibold tracking-wide text-foreground">{title}</h3>
                        {subtitle && <p className="text-sm text-foreground/80">{subtitle}</p>}
                    </header>

                    <div className="space-y-2 text-sm text-foreground/85">
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
                        {!!points.length && (
                            <ul className="mt-1 space-y-1.5">
                                {points.map((bp) => (
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
                    </div>

                    {citation && (
                        <blockquote className="relative mt-2 rounded-xl border border-sauge/30 bg-sauge/10 p-3 text-sm text-foreground/85">
                            <Quote className="absolute -left-2 -top-2 w-5 h-5 text-sauge/70" aria-hidden />
                            <p className="pl-4 italic">“{citation}”</p>
                        </blockquote>
                    )}

                    {/* Faux CTA (visuel) — toute la carte est cliquable via le Link parent */}
                    <div className="mt-auto pt-3 text-end">
                        <span
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]
                         text-terracotta/90 group-hover:text-terracotta transition-colors"
                        >
                            <span className="border-b border-transparent group-hover:border-terracotta/50 transition-colors">{ctaLabel}</span>
                            <ArrowRight className="w-4 h-4 -translate-x-0.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </div>
                </div>

                {/* Séparateur animé */}
                <div className="pointer-events-none absolute left-4 right-4 bottom-4 h-[2px] overflow-hidden">
                    <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                    <div
                        className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                        aria-hidden
                    />
                </div>
            </article>
        </Link>
    );
}

/* ---------- Helpers ---------- */
function labelKind(k?: string) {
    switch ((k ?? '').toLowerCase()) {
        case 'ecommerce':
            return 'E-commerce';
        case 'vitrine':
            return 'Site vitrine';
        case 'portfolio':
            return 'Portfolio';
        case 'rdv':
            return 'RDV';
        default:
            return 'Projet';
    }
}
function labelStack(s?: string) {
    switch ((s ?? '').toLowerCase()) {
        case 'react':
            return 'React';
        case 'wordpress':
            return 'WP';
        case 'mixte':
            return 'Stack mixte';
        default:
            return s ?? '';
    }
}
