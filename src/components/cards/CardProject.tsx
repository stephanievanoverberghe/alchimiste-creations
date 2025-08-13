'use client';

import Link from 'next/link';
import Image from 'next/image';

export type CardProjectData = {
    key: string;
    title: string;
    description?: string;
    imageSrc?: string;
    logoSrc?: string;
    link?: string; // ← rendu optionnel (on fabrique un fallback)
    status?: 'coded' | 'wip';
    stack?: 'wordpress' | 'react' | 'mixte' | string;
    kind?: 'vitrine' | 'portfolio' | 'ecommerce' | 'rdv' | string;
    pack?: 'essentiel' | 'croissance' | 'signature' | 'surmesure' | string;
    external?: boolean;
};

const kindLabel = (k?: string) => {
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
};

const stackLabel = (s?: string) => {
    switch ((s ?? '').toLowerCase()) {
        case 'react':
            return 'React';
        case 'wordpress':
            return 'WP';
        case 'mixte':
            return 'Stack mixte';
        default:
            return s;
    }
};

const slugify = (s: string) =>
    s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export default function CardProject({ project, onPreview }: { project: CardProjectData; onPreview?: () => void }) {
    const isWip = project.status === 'wip';

    const safeTitle = project.title || 'Projet';
    const href = project.link ?? `/projets/${slugify(safeTitle)}`;
    const isExternal = project.external ?? /^https?:\/\//i.test(href);

    return (
        <Link
            href={href}
            aria-label={`Voir le projet : ${safeTitle}`}
            prefetch={isExternal ? false : undefined}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group relative flex h-full flex-col rounded-[20px] overflow-hidden border border-sauge/30 bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 pb-8"
        >
            {/* Media : toujours logo + motif */}
            <div className="relative aspect-[16/10]">
                <div className="absolute inset-0 flex items-center justify-center bg-background text-ormat">
                    {/* Motif de fond */}
                    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden />
                    {project.logoSrc ? (
                        <Image src={project.logoSrc} alt={`${safeTitle} — logo`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-8" priority={false} />
                    ) : (
                        <div className="relative z-[1] px-6 py-4 rounded-md border border-ormat/30 bg-background/60 text-ormat text-xs tracking-wider uppercase">Logo à venir</div>
                    )}
                </div>

                {/* Badges overlay (pas de “Site codé”) */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {project.kind && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-terracotta">
                            {kindLabel(project.kind)}
                        </span>
                    )}
                    {project.stack && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-sauge/30 bg-sauge/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sauge">
                            {stackLabel(project.stack)}
                        </span>
                    )}
                    {isWip && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-ormat/30 bg-ormat/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ormat">
                            En cours
                        </span>
                    )}
                </div>

                {/* Bouton Aperçu (overlay) */}
                {onPreview && (
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onPreview();
                        }}
                        className="absolute cursor-pointer right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-sauge/30 bg-background/80 backdrop-blur px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sauge hover:bg-sauge/10"
                        aria-label={`Aperçu : ${project.title}`}
                    >
                        Aperçu
                    </button>
                )}

                {/* Gradient bas pour cohérence visuelle */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/0 to-transparent" />
            </div>

            {/* Contenu */}
            <div className="p-5">
                <h3 className="text-lg font-semibold tracking-wide text-foreground">{safeTitle}</h3>
                {project.description && <p className="mt-1 text-sm text-foreground/80 line-clamp-2">{project.description}</p>}
            </div>

            {/* Séparateur animé aligné en bas */}
            <div className="pointer-events-none absolute left-4 right-4 bottom-4 h-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                <div
                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                    aria-hidden
                />
            </div>
        </Link>
    );
}
