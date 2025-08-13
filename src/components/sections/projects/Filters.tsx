'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
    Filter,
    X,
    Search as SearchIcon,
    LayoutGrid,
    FileText,
    Code2,
    Monitor,
    Image as ImageIcon,
    ShoppingBag,
    CalendarClock,
    Palette,
    Heart,
    Briefcase,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import rawProjects from '@/data/projects.json';
import CardProject, { type CardProjectData } from '@/components/cards/CardProject';
import ProjectQuickView, { type ProjectQuickViewData } from '@/components/modals/ProjectQuickView';

// ---- Normalisation -----------------
type RawProject = {
    slug?: string;
    id?: string | number;
    titre?: string;
    title?: string;
    sousTitre?: string;
    description?: string;

    // éditorial pour Quick view
    pourQui?: string;
    besoin?: string;
    proposition?: string[];
    resultat?: string;
    citationClient?: string;
    testimonials?: { quote?: string; author?: string }[];

    // visuels / liens
    image?: string;
    imageSrc?: string;
    cover?: string;
    logo?: string;
    lien?: string;
    link?: string;

    // tags / meta
    status?: 'coded' | 'wip';
    stack?: 'wordpress' | 'react' | 'mixte' | string;
    kind?: 'vitrine' | 'portfolio' | 'ecommerce' | 'rdv' | string;
    sector?: 'artistes' | 'therapeutes' | 'independants' | string;
    year?: number;
    location?: { city?: string };
    external?: boolean;
};

type ProjectForView = CardProjectData & {
    year?: number;
    status?: 'coded' | 'wip';
    city?: string;
    stack?: string;
    kind?: string;
    sector?: string;

    // champs éditoriaux utilisés par l’aperçu
    pourQui?: string;
    besoin?: string;
    proposition?: string[];
    resultat?: string;
    citationClient?: string;
    testimonials?: { quote?: string; author?: string }[];
};

function normalize(p: RawProject, idx: number): ProjectForView {
    const title = p.title ?? p.titre ?? `Projet ${idx + 1}`;
    const description = p.description ?? p.sousTitre ?? '';
    const imageSrc = p.image || p.imageSrc || p.cover || '';
    const logoSrc = p.logo || undefined;
    const link =
        p.link ??
        p.lien ??
        (p.slug
            ? `/projets/${p.slug}`
            : `/projets/${title
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, '')}`);
    const external = typeof p.external === 'boolean' ? p.external : /^https?:\/\//i.test(link);

    return {
        key: (p.slug ?? p.id ?? title).toString(),
        title,
        description,
        imageSrc,
        logoSrc,
        link,
        status: p.status,
        stack: p.stack,
        kind: p.kind,
        external,
        year: p.year,
        city: p.location?.city,
        sector: p.sector,

        // éditorial
        pourQui: p.pourQui,
        besoin: p.besoin,
        proposition: p.proposition,
        resultat: p.resultat,
        citationClient: p.citationClient,
        testimonials: p.testimonials,
    };
}
// ------------------------------------------------------------------

type Tech = 'any' | 'wordpress' | 'react';
type Kind = 'any' | 'vitrine' | 'portfolio' | 'ecommerce' | 'rdv';
type Sector = 'any' | 'artistes' | 'therapeutes' | 'independants';

const PER_PAGE = 6;

export default function FiltersSection() {
    const ALL = useMemo(() => ((rawProjects as RawProject[]) ?? []).map(normalize), []);
    const [tech, setTech] = useState<Tech>('any');
    const [kind, setKind] = useState<Kind>('any');
    const [sector, setSector] = useState<Sector>('any');
    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);

    // Quick view state
    const [preview, setPreview] = useState<ProjectForView | null>(null);

    const resetAll = () => {
        setTech('any');
        setKind('any');
        setSector('any');
        setQ('');
        setPage(1);
    };

    const norm = (v?: string) =>
        (v ?? '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        const out = ALL.filter((p) => {
            if (tech !== 'any' && norm(p.stack) !== tech) return false;
            if (kind !== 'any' && norm(p.kind) !== kind) return false;
            if (sector !== 'any' && norm(p.sector) !== sector) return false;

            if (query) {
                const hay = [p.title, p.description, p.stack, p.kind, p.city, p.sector].filter(Boolean).join(' ').toLowerCase();
                if (!hay.includes(query)) return false;
            }
            return true;
        });

        out.sort((a, b) => {
            const ay = typeof a.year === 'number' ? a.year : -Infinity;
            const by = typeof b.year === 'number' ? b.year : -Infinity;
            if (by !== ay) return by - ay;
            if ((b.status === 'wip') !== (a.status === 'wip')) {
                return (b.status === 'wip' ? 1 : 0) - (a.status === 'wip' ? 1 : 0);
            }
            return String(a.title).localeCompare(String(b.title));
        });
        return out;
    }, [ALL, tech, kind, sector, q]);

    const count = filtered.length;

    // Remettre page à 1 dès qu’un filtre/recherche change
    useEffect(() => {
        setPage(1);
    }, [tech, kind, sector, q]);

    // Clamp si on dépasse le nombre de pages après filtrage
    const totalPages = Math.max(1, Math.ceil(count / PER_PAGE));
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [totalPages, page]);

    // Slice de la page courante
    const start = (page - 1) * PER_PAGE;
    const pageItems = filtered.slice(start, start + PER_PAGE);

    // === Styles===
    const switchGroup = 'rounded-2xl border border-sauge/30 bg-background p-1 shrink-0 grid gap-1.5 w-full sm:inline-flex sm:flex-wrap sm:items-center sm:gap-1.5 sm:w-auto';
    const switchBtn =
        'inline-flex items-center justify-center gap-2 w-full sm:w-auto px-2 sm:px-3 py-2 rounded-xl text-xs tracking-[0.14em] uppercase font-semibold transition transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sauge/40 focus-visible:ring-offset-2 whitespace-nowrap';

    const pagerBtnBase = 'inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] border transition';

    // Icônes par type et secteur
    const kindIcon: Record<Kind, React.ComponentType<{ className?: string }>> = {
        any: LayoutGrid,
        vitrine: Monitor,
        portfolio: ImageIcon,
        ecommerce: ShoppingBag,
        rdv: CalendarClock,
    };
    const sectorIcon: Record<Sector, React.ComponentType<{ className?: string }>> = {
        any: LayoutGrid,
        artistes: Palette,
        therapeutes: Heart,
        independants: Briefcase,
    };

    return (
        <section aria-labelledby="projects-filters-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <h2 id="projects-filters-title" className="sr-only">
                Filtres des projets
            </h2>

            <div className="relative max-w-7xl mx-auto space-y-8 md:space-y-10">
                {/* Carte */}
                <div className="z-20">
                    <div className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-5 md:p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        {/* motif discret */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                            aria-hidden
                        />
                        {/* Étiquette */}
                        <div className="relative z-[1]">
                            <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                                <Filter className="w-3.5 h-3.5" aria-hidden />
                                Filtres projets
                            </span>
                        </div>

                        {/* Recherche */}
                        <label className="relative z-[1] mt-4 block">
                            <span className="sr-only">Rechercher</span>
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Rechercher un projet, une techno…"
                                className="w-full pl-9 pr-3 py-2 rounded-xl border border-sauge/30 bg-background/70 text-sm"
                                aria-controls="projects-results"
                            />
                        </label>

                        {/* Groupes de switches (icônes seules en mobile) */}
                        <div className="relative z-[1] mt-4 flex flex-wrap items-center gap-3">
                            {/* Tech */}
                            <div role="group" aria-label="Filtrer par technologie" className={cn(switchGroup, 'grid-cols-3')}>
                                {(['any', 'wordpress', 'react'] as Tech[]).map((t) => {
                                    const active = t === tech;
                                    const aria = t === 'wordpress' ? 'WordPress' : t === 'react' ? 'React/Next.js' : 'Tous';
                                    const label = t === 'wordpress' ? 'WP' : t === 'react' ? 'React' : 'Tous';
                                    const Icon = t === 'wordpress' ? FileText : t === 'react' ? Code2 : LayoutGrid;
                                    return (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setTech(t)}
                                            aria-pressed={active}
                                            aria-current={active ? 'true' : undefined}
                                            aria-label={aria}
                                            title={aria}
                                            className={cn(
                                                switchBtn,
                                                active
                                                    ? 'bg-sauge text-background shadow-sm'
                                                    : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-[1px] hover:shadow-sm'
                                            )}
                                        >
                                            <Icon className="w-4 h-4" aria-hidden />
                                            <span className="hidden sm:inline">{label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Type */}
                            <div role="group" aria-label="Filtrer par type de site" className={cn(switchGroup, 'grid-cols-5')}>
                                {(['any', 'vitrine', 'portfolio', 'ecommerce', 'rdv'] as Kind[]).map((k) => {
                                    const active = k === kind;
                                    const label = k === 'any' ? 'Tous' : k;
                                    const Icon = kindIcon[k];
                                    return (
                                        <button
                                            key={k}
                                            type="button"
                                            onClick={() => setKind(k)}
                                            aria-pressed={active}
                                            aria-current={active ? 'true' : undefined}
                                            aria-label={label === 'Tous' ? 'Tous les types' : `Type ${label}`}
                                            title={label === 'Tous' ? 'Tous les types' : `Type ${label}`}
                                            className={cn(
                                                switchBtn,
                                                active
                                                    ? 'bg-sauge text-background shadow-sm'
                                                    : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-[1px] hover:shadow-sm'
                                            )}
                                        >
                                            <Icon className="w-4 h-4" aria-hidden />
                                            <span className="hidden sm:inline">{label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Secteur */}
                            <div role="group" aria-label="Filtrer par secteur" className={cn(switchGroup, 'grid-cols-4')}>
                                {(['any', 'artistes', 'therapeutes', 'independants'] as Sector[]).map((s) => {
                                    const active = s === sector;
                                    const label = s === 'any' ? 'Tous' : s === 'artistes' ? 'Artistes' : s === 'therapeutes' ? 'Thérapeutes' : 'Indépendants';
                                    const Icon = sectorIcon[s];
                                    return (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setSector(s)}
                                            aria-pressed={active}
                                            aria-current={active ? 'true' : undefined}
                                            aria-label={label}
                                            title={label}
                                            className={cn(
                                                switchBtn,
                                                active
                                                    ? 'bg-sauge text-background shadow-sm'
                                                    : 'cursor-pointer text-sauge hover:bg-sauge/10 hover:-translate-y-[1px] hover:shadow-sm'
                                            )}
                                        >
                                            <Icon className="w-4 h-4" aria-hidden />
                                            <span className="hidden sm:inline">{label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Compteur + reset */}
                        <div className="relative z-[1] mt-4 flex items-center justify-between text-xs text-foreground/70">
                            <span>
                                {count} résultat{count > 1 ? 's' : ''}
                            </span>
                            <button
                                type="button"
                                onClick={resetAll}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-terracotta/30 bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-[0.14em] hover:bg-terracotta/15"
                                title="Réinitialiser les filtres"
                            >
                                <X className="w-4 h-4" /> <span className="hidden sm:inline">Reset</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grille */}
                <div className="relative mt-2">
                    {count === 0 ? (
                        <div className="rounded-[22px] border border-sauge/30 bg-sauge/10 p-8 text-center text-sm text-foreground/80">
                            Aucun projet ne correspond à ces filtres.
                            <button onClick={resetAll} className="ml-2 underline decoration-sauge/60 hover:opacity-80 cursor-pointer">
                                Réinitialiser
                            </button>
                        </div>
                    ) : (
                        <>
                            <ul id="projects-results" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pageItems.map((p) => (
                                    <li key={p.key}>
                                        <CardProject project={p} onPreview={() => setPreview(p)} />
                                    </li>
                                ))}
                            </ul>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <nav className="mt-6 flex items-center justify-center gap-3" aria-label="Pagination">
                                    <button
                                        type="button"
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page <= 1}
                                        className={cn(
                                            pagerBtnBase,
                                            page <= 1
                                                ? 'opacity-50 cursor-not-allowed border-sauge/20 text-foreground/40'
                                                : 'border-sauge/30 cursor-pointer text-sauge hover:bg-sauge/10'
                                        )}
                                    >
                                        <ChevronLeft className="w-4 h-4" aria-hidden /> Précédent
                                    </button>

                                    <span className="text-xs text-foreground/70">
                                        Page {page} / {totalPages}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page >= totalPages}
                                        className={cn(
                                            pagerBtnBase,
                                            page >= totalPages
                                                ? 'opacity-50 cursor-not-allowed border-sauge/20 text-foreground/40'
                                                : 'border-sauge/30 cursor-pointer  text-sauge hover:bg-sauge/10'
                                        )}
                                    >
                                        Suivant <ChevronRight className="w-4 h-4" aria-hidden />
                                    </button>
                                </nav>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Modal Quick view */}
            <ProjectQuickView
                open={!!preview}
                onClose={() => setPreview(null)}
                project={
                    preview
                        ? ({
                              title: preview.title,
                              subtitle: preview.description,
                              logoSrc: preview.logoSrc,
                              link: preview.link,
                              isExternal: preview.external,
                              pourQui: preview.pourQui,
                              besoin: preview.besoin,
                              proposition: preview.proposition,
                              resultat: preview.resultat,
                              citationClient: preview.citationClient,
                              testimonials: preview.testimonials,
                          } as ProjectQuickViewData)
                        : null
                }
            />
        </section>
    );
}
