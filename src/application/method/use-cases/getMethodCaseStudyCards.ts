export type MethodCaseStudyProject = {
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
    logo?: string;
    link?: string;
    lien?: string;
    status?: 'coded' | 'wip';
    stack?: 'wordpress' | 'react' | 'mixte' | string;
    kind?: 'vitrine' | 'portfolio' | 'ecommerce' | 'rdv' | string;
    year?: number;
    external?: boolean;
};

export type MethodCaseStudyCard = {
    key: string;
    title: string;
    description: string;
    imageSrc: string;
    logoSrc?: string;
    link: string;
    status?: 'coded' | 'wip';
    stack?: 'wordpress' | 'react' | 'mixte' | string;
    kind?: 'vitrine' | 'portfolio' | 'ecommerce' | 'rdv' | string;
    external: boolean;
};

function normalizeProject(project: MethodCaseStudyProject, index: number): MethodCaseStudyCard {
    const title = project.title ?? project.titre ?? project.name ?? `Projet ${index + 1}`;
    const description = project.description ?? project.sousTitre ?? project.subtitle ?? '';
    const imageSrc = project.imageSrc || project.image || project.cover || '';
    const logoSrc = project.logo || undefined;
    const link =
        project.link ??
        project.lien ??
        (project.slug
            ? `/projets/${project.slug}`
            : `/projets/${title
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9\-]/g, '')}`);

    const status = project.status ?? (project.slug === 'norel-art' ? 'coded' : project.slug === 'ania-sophro' ? 'wip' : undefined);
    const external = typeof project.external === 'boolean' ? project.external : /^https?:\/\//i.test(link);

    return {
        key: (project.slug ?? project.id ?? title).toString(),
        title,
        description,
        imageSrc,
        logoSrc,
        link,
        status,
        stack: project.stack,
        kind: project.kind,
        external,
    };
}

export function getMethodCaseStudyCards(projects: MethodCaseStudyProject[], limit = 2): MethodCaseStudyCard[] {
    return [...projects]
        .sort((a, b) => {
            const firstYear = typeof a.year === 'number' ? a.year : -Infinity;
            const secondYear = typeof b.year === 'number' ? b.year : -Infinity;

            if (secondYear !== firstYear) return secondYear - firstYear;
            if ((b.status === 'wip') !== (a.status === 'wip')) return (b.status === 'wip' ? 1 : 0) - (a.status === 'wip' ? 1 : 0);

            return String(a.titre ?? a.title ?? a.name ?? '').localeCompare(String(b.titre ?? b.title ?? b.name ?? ''));
        })
        .map(normalizeProject)
        .slice(0, limit);
}
