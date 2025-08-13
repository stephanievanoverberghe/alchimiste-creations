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

type KPI = { label: string; before?: string; after?: string; delta?: string };
type Testi = { quote?: string; author?: string };

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

    // Meta
    sector?: string;
    kind?: string;
    status?: string;
    year?: number;
    location?: { city?: string };
};

const ALL: Project[] = Array.isArray(projectsData) ? (projectsData as Project[]) : [];

function getProject(slug: string) {
    return ALL.find((p) => String(p.slug ?? '') === slug);
}

export function generateStaticParams() {
    return ALL.filter((p) => p.slug).map((p) => ({ slug: String(p.slug) }));
}

// 👇 rendre async + attendre params
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
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

// 👇 rendre async + attendre params
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const p = getProject(slug);
    if (!p) notFound();

    return (
        <>
            <ContextSection project={{ pourQui: p.pourQui, besoin: p.besoin }} />
            <PropositionSection project={{ proposition: p.proposition }} />
            <ResultSection project={{ resultat: p.resultat, results: p.results, media: p.media, titre: p.titre || p.title, title: p.title }} />
            <TestimonialSection project={{ testimonials: p.testimonials, citationClient: p.citationClient, client: p.client, logo: p.logo }} />
            <StackSection project={{ stack: p.stack, stackTags: p.stackTags, tags: p.tags }} />
            <CollabsSection project={{ collabs: (p as { collabs?: { name?: string; role?: string; portfolio?: string; site?: string; link?: string }[] }).collabs }} />
        </>
    );
}
