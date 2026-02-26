import type { MetadataRoute } from 'next';

const base = 'https://alchimiste-creations.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ['/', '/offres', '/methode', '/projets', '/a-propos', '/contact', '/faq', '/mentions-legales', '/politique-confidentialite', '/cgu'];
    return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: 'weekly', priority: route === '/' ? 1 : 0.8 }));
}
