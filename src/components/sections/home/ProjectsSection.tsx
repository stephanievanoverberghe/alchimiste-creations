import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import rawData from '@/data/projects.json';
import ProjectCard from './ProjectCard';
import ContactTeaserCard from './ContactTeaserCard';

type RawProject = {
    slug?: string;
    id?: string | number;
    title?: string;
    titre?: string;
    name?: string;
    description?: string;
    sousTitre?: string;
    subtitle?: string;
    imageSrc?: string;
    image?: string;
    cover?: string;
    link?: string;
    lien?: string;
    status?: 'coded' | 'wip';
};

export type ProjectUI = {
    key: string;
    title: string;
    description: string;
    imageSrc: string;
    link: string;
    status?: 'coded' | 'wip';
};

function normalizeProject(p: RawProject, idx: number): ProjectUI {
    const title = p.title ?? p.titre ?? p.name ?? `Projet ${idx + 1}`;
    const description = p.description ?? p.sousTitre ?? p.subtitle ?? '';
    const imageSrc = p.imageSrc || p.image || p.cover || ''; // "" si vide
    const link =
        p.link ??
        p.lien ??
        (p.slug
            ? `/projets/${p.slug}`
            : `/projets/${(title || 'projet')
                  .toString()
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9\-]/g, '')}`);

    const status = p.status ?? (p.slug === 'norel-art' ? 'coded' : p.slug === 'ania-sophro' ? 'wip' : undefined);

    return { key: (p.slug ?? p.id ?? title).toString(), title, description, imageSrc, link, status };
}

type Props = { projects?: RawProject[]; ctaHref?: string };

export default function ProjectsSection({ projects, ctaHref = '/projets' }: Props) {
    const source: RawProject[] = Array.isArray(projects) && projects.length ? projects : (rawData as RawProject[]);
    const mapped: ProjectUI[] = source.map(normalizeProject);

    // On affiche les 3 DERNIERS si disponibles
    const finalData: ProjectUI[] = mapped.slice(-3);

    // Nombre de teasers à ajouter pour compléter à 3
    const missing = Math.max(0, 3 - finalData.length);

    return (
        <section className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sauge via-terracotta to-sauge" />
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" />
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0">
                <Image src="/deco/about-wave.png" alt="Vague décorative" className="h-auto" fill priority />
            </div>

            <div className="relative mx-auto w-full max-w-5xl">
                {/* En-tête */}
                <div className="text-center lg:text-left mb-12">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        Réalisations
                    </span>

                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Des sites vivants, alignés, pensés pour faire vibrer ton univers
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Voici un aperçu de mes derniers projets&nbsp;: du <em>sur-mesure codé</em> et des vitrines sensibles, créés en co-création et pensés pour inspirer confiance
                        dès les premières secondes.
                    </p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                    {finalData.map((p) => (
                        <li key={p.key} className="h-full">
                            <ProjectCard project={p} />
                        </li>
                    ))}

                    {Array.from({ length: missing }).map((_, i) => (
                        <li key={`contact-teaser-${i}`} className="h-full">
                            <ContactTeaserCard />
                        </li>
                    ))}
                </ul>

                <div className="mt-12 text-center">
                    <Link
                        href={ctaHref}
                        className={cn(
                            'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                        )}
                    >
                        Voir tous les projets
                    </Link>
                </div>
            </div>
        </section>
    );
}
