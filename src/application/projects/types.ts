export type KPI = { label: string; before?: string; after?: string; delta?: string };
export type Testimonial = { quote?: string; author?: string };

export type ProjectUrls = {
    live?: string;
    caseStudy?: string;
    [key: string]: string | undefined;
};

export type Project = {
    slug?: string;
    titre?: string;
    title?: string;
    sousTitre?: string;
    seo?: { title?: string; description?: string };
    media?: { cover?: string };
    logo?: string;
    pourQui?: string;
    besoin?: string;
    proposition?: string[];
    resultat?: string;
    results?: { period?: string; kpis?: KPI[]; highlights?: string[] };
    client?: string;
    citationClient?: string;
    testimonials?: Testimonial[];
    stack?: string;
    stackTags?: string[];
    tags?: string[];
    priority?: number;
    sector?: string;
    kind?: string;
    status?: string;
    year?: number;
    location?: { city?: string };
    pack?: 'essentiel' | 'croissance' | 'signature' | 'surmesure' | string;
    lien?: string;
    urls?: ProjectUrls;
    collabs?: { name?: string; role?: string; portfolio?: string; site?: string; link?: string }[];
};

export type ProjectSeo = {
    title: string;
    description?: string;
    ogImage: string;
    url: string;
};
