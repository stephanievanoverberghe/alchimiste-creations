export type Tech = 'any' | 'wordpress' | 'react';

export type Surface = 'offers' | 'offer' | 'projects' | 'faq' | 'method';

export type PackSlug = 'essentiel' | 'croissance' | 'signature';

export type FaqItem = {
    id: string;
    q: string;
    a: string;
    tags: string[];
    tech: Tech;
    featured: boolean;
    order: number;
};

export type FaqTag = {
    tag: string;
    count: number;
};
