// app/projets/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import projectsData from '@/data/projects.json';

import ContextSection from '@/components/sections/projects/project/Context';
import PropositionSection from '@/components/sections/projects/project/Proposition';
import ResultSection from '@/components/sections/projects/project/Result';
import TestimonialSection from '@/components/sections/projects/project/Testimonial';
import StackSection from '@/components/sections/projects/project/Stack';
import CollabsSection from '@/components/sections/projects/project/Collabs';
import NavSection from '@/components/sections/projects/project/Nav';
import RelatedSection from '@/components/sections/projects/project/Related';
import CallToActionSection from '@/components/sections/projects/project/CallToAction';

type KPI = { label: string; before?: string; after?: string; delta?: string };
type Testi = { quote?: string; author?: string };

type URLs = {
    live?: string;
    caseStudy?: string;
    [key: string]: string | undefined;
};

type Project = {
    slug?: string;
    titre?: string;
    title?: string;
    sousTitre?: string;
    seo?: { title?: string; description?: string };
    media?: { cover?: string };
    logo?: string;

    // Contexte
    pourQui?: string;
    besoin?: string;

    // Proposition
    proposition?: string[];

    // Résultats
    resultat?: string;
    results?: { period?: string; kpis?: KPI[]; highlights?: string[] };

    // Témoignages
    client?: string;
    citationClient?: string;
    testimonials?: Testi[];

    // Stack & tags
    stack?: string;
    stackTags?: string[];
    tags?: string[];

    // Nav
    priority?: number;

    // Meta
    sector?: string;
    kind?: string;
    status?: string;
    year?: number;
    location?: { city?: string };
    pack?: 'essentiel' | 'croissance' | 'signature' | 'surmesure' | string;

    // Liens
    lien?: string;
    urls?: URLs;
};

const ALL: Project[] = Array.isArray(projectsData) ? (projectsData as Project[]) : [];

function getProject(slug: string) {
    return ALL.find((p) => String(p.slug ?? '') === slug);
}

export function generateStaticParams() {
    return ALL.filter((p) => p.slug).map((p) => ({ slug: String(p.slug) }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = params;
    const p = getProject(slug);
    if (!p) return { title: 'Projet introuvable — Alchimiste Créations' };

    const title = p.seo?.title || p.titre || p.title || 'Projet';
    const description = p.seo?.description || p.sousTitre || undefined;
    const ogImage = p.media?.cover || p.logo || '/og/projects.png';
    const url = `/projets/${slug}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url, images: ogImage ? [{ url: ogImage }] : undefined },
    };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const p = getProject(slug);
    if (!p) notFound();

    // ordre d’affichage pour la nav : priority ASC, puis year DESC, sinon ordre source
    const ordered = [...ALL].sort((a, b) => {
        const pa = a.priority ?? Number.MAX_SAFE_INTEGER;
        const pb = b.priority ?? Number.MAX_SAFE_INTEGER;
        if (pa !== pb) return pa - pb;
        const ya = a.year ?? 0;
        const yb = b.year ?? 0;
        if (ya !== yb) return yb - ya;
        return 0;
    });

    const idx = ordered.findIndex((x) => String(x.slug) === slug);
    const prev = idx > 0 ? ordered[idx - 1] : undefined;
    const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : undefined;

    return (
        <>
            <ContextSection project={{ pourQui: p.pourQui, besoin: p.besoin }} />
            <PropositionSection project={{ proposition: p.proposition }} />
            <ResultSection
                project={{
                    resultat: p.resultat,
                    results: p.results,
                    media: p.media,
                    titre: p.titre ?? p.title,
                    title: p.title,
                    urls: p.urls, // ✅ lien “live” dispo dans ResultSection
                }}
            />
            <TestimonialSection project={{ testimonials: p.testimonials, citationClient: p.citationClient, client: p.client, logo: p.logo }} />
            <StackSection project={{ stack: p.stack, stackTags: p.stackTags, tags: p.tags }} />
            <CollabsSection project={{ collabs: (p as { collabs?: { name?: string; role?: string; portfolio?: string; site?: string; link?: string }[] }).collabs }} />
            <NavSection
                prev={prev ? { slug: String(prev.slug), titre: prev.titre, title: prev.title, logo: prev.logo } : undefined}
                next={next ? { slug: String(next.slug), titre: next.titre, title: next.title, logo: next.logo } : undefined}
            />
            <RelatedSection currentSlug={p.slug as string} sector={p.sector} kind={p.kind} />
            <CallToActionSection project={p} note="Réponse sous 24–48h — on fait le point en 30 min." />
        </>
    );
}
