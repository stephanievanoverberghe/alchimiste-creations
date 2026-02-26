import { siteContent } from '@/content/site';

const siteUrl = 'https://alchimiste-creations.fr';

export function absoluteUrl(path = '') {
    return `${siteUrl}${path}`;
}

export function personJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteContent.brand,
        jobTitle: 'Freelance Front-End Developer',
        url: siteUrl,
    };
}

export function serviceJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Création de sites premium orientés conversion',
        provider: { '@type': 'Person', name: siteContent.brand },
        areaServed: 'France',
    };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };
}
