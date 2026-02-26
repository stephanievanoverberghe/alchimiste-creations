import type { MetadataRoute } from 'next';

const routes = ['', '/offres', '/methode', '/projets', '/faq', '/contact', '/mentions-legales', '/politique-confidentialite'];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://alchimiste-creations.fr';
    const now = new Date();

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
    }));
}
