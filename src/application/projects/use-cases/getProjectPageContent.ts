import { projects } from '@/infrastructure/content';
import type { Project, ProjectSeo } from '@/application/projects/types';

const ALL: Project[] = Array.isArray(projects) ? (projects as Project[]) : [];

export function getProjectBySlug(slug: string): Project | undefined {
    return ALL.find((project) => String(project.slug ?? '') === slug);
}

export function getProjectStaticParams() {
    return ALL.filter((project) => project.slug).map((project) => ({ slug: String(project.slug) }));
}

export function getProjectSeo(slug: string): ProjectSeo | undefined {
    const project = getProjectBySlug(slug);
    if (!project) return undefined;

    return {
        title: project.seo?.title || project.titre || project.title || 'Projet',
        description: project.seo?.description || project.sousTitre || undefined,
        ogImage: project.media?.cover || project.logo || '/og/projects.png',
        url: `/projets/${slug}`,
    };
}

export function getProjectSiblings(slug: string) {
    const ordered = [...ALL].sort((a, b) => {
        const aPriority = a.priority ?? Number.MAX_SAFE_INTEGER;
        const bPriority = b.priority ?? Number.MAX_SAFE_INTEGER;
        if (aPriority !== bPriority) return aPriority - bPriority;

        const aYear = a.year ?? 0;
        const bYear = b.year ?? 0;
        if (aYear !== bYear) return bYear - aYear;

        return 0;
    });

    const index = ordered.findIndex((project) => String(project.slug) === slug);

    return {
        previous: index > 0 ? ordered[index - 1] : undefined,
        next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
    };
}
