// components/sections/projects/project/Collabs.tsx
import Link from 'next/link';
import { Users } from 'lucide-react';

type Collab = {
    name?: string;
    role?: string;
    portfolio?: string; // URL principale
    site?: string; // alias accepté
    link?: string; // alias accepté
};

type Project = {
    collabs?: Collab[];
};

function initials(name?: string) {
    const n = (name ?? '').trim();
    if (!n) return '—';
    const parts = n.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || '—';
}

export default function CollabsSection({ project }: { project?: Project }) {
    const raw = (project?.collabs ?? []).filter(Boolean);
    const list = raw.filter((c) => (c?.name && c.name.trim()) || (c?.role && c.role.trim()) || c?.portfolio || c?.site || c?.link);

    if (list.length === 0) return null;

    return (
        <section id="projet-collabs" aria-labelledby="projet-collabs-title" className="relative py-16 md:py-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="relative max-w-5xl mx-auto space-y-8">
                {/* En-tête */}
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        <Users className="w-3.5 h-3.5" aria-hidden />
                        Collaborations
                    </span>
                    <h2 id="projet-collabs-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Partenaires du projet
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
                        On crédite les personnes qui ont contribué — transparence et esprit d’équipe.
                    </p>
                </div>

                {/* Cartes collaborateurs */}
                <ul className="grid place-items-center">
                    {list.map((c, i) => {
                        const url = (c.portfolio || c.site || c.link || '').trim();
                        const hasUrl = /^https?:\/\//i.test(url);

                        const content = (
                            <article className="group relative w-full max-w-sm text-center rounded-[20px] border border-sauge/30 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                {/* motif discret */}
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                                        backgroundSize: '16px 16px',
                                        color: 'var(--color-ormat)',
                                    }}
                                    aria-hidden
                                />
                                <div className="relative z-[1] flex flex-col items-center gap-4">
                                    {/* Avatar initiales */}
                                    <span className="grid place-content-center size-12 rounded-full border border-sauge/40 bg-sauge/10 text-sauge font-semibold tracking-wide">
                                        {initials(c.name)}
                                    </span>

                                    {/* Texte */}
                                    <div className="min-w-0">
                                        <h3 className="text-[15px] md:text-base font-semibold text-foreground">{c.name || 'Collaborateur·rice'}</h3>
                                        {c.role && <p className="text-sm text-foreground/75">{c.role}</p>}

                                        {hasUrl && (
                                            <p className="mt-3">
                                                <span className="inline-flex items-center rounded-full border border-ormat/30 bg-ormat/10 text-ormat px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                                                    Voir le portfolio
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );

                        return (
                            <li key={`${c.name ?? 'collab'}-${i}`} className="w-full flex justify-center">
                                {hasUrl ? (
                                    <Link
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full max-w-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 rounded-[22px]"
                                        aria-label={`Ouvrir le portfolio de ${c.name ?? 'ce collaborateur'}`}
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    content
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
