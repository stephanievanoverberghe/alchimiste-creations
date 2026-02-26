import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSeo, getProjectSiblings, getProjectStaticParams } from '@/application/projects';
import type { Project } from '@/application/projects';

import ContextSection from '@/presentation/components/sections/projects/project/Context';
import PropositionSection from '@/presentation/components/sections/projects/project/Proposition';
import ResultSection from '@/presentation/components/sections/projects/project/Result';
import TestimonialSection from '@/presentation/components/sections/projects/project/Testimonial';
import StackSection from '@/presentation/components/sections/projects/project/Stack';
import CollabsSection from '@/presentation/components/sections/projects/project//Collabs';
import NavSection from '@/presentation/components/sections/projects/project/Nav';
import RelatedSection from '@/presentation/components/sections/projects/project/Related';
import CallToActionSection from '@/presentation/components/sections/projects/project/CallToAction';

export function generateStaticParams() {
    return getProjectStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const seo = getProjectSeo(slug);
    if (!seo) return { title: 'Projet introuvable — Alchimiste Créations' };

    return {
        title: seo.title,
        description: seo.description,
        alternates: { canonical: seo.url },
        openGraph: { title: seo.title, description: seo.description, url: seo.url, images: seo.ogImage ? [{ url: seo.ogImage }] : undefined },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const p = getProjectBySlug(slug);
    if (!p) notFound();
    const { previous, next } = getProjectSiblings(slug);

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
                    urls: p.urls,
                }}
            />
            <TestimonialSection project={{ testimonials: p.testimonials, citationClient: p.citationClient, client: p.client, logo: p.logo }} />
            <StackSection project={{ stack: p.stack, stackTags: p.stackTags, tags: p.tags }} />
            <CollabsSection
                project={{
                    collabs: (p as { collabs?: { name?: string; role?: string; portfolio?: string; site?: string; link?: string }[] }).collabs,
                }}
            />
            <NavSection
                prev={previous ? { slug: String(previous.slug), titre: previous.titre, title: previous.title, logo: previous.logo } : undefined}
                next={next ? { slug: String(next.slug), titre: next.titre, title: next.title, logo: next.logo } : undefined}
            />
            <RelatedSection currentSlug={p.slug as string} sector={p.sector} kind={p.kind} />
            <CallToActionSection project={p} note="Réponse sous 24–48h — on fait le point en 30 min." />
        </>
    );
}
