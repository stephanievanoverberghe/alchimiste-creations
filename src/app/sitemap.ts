import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';

const routes = ['', '/offres', '/methode', '/projets', '/faq', '/contact', '/mentions-legales', '/politique-confidentialite'];
const projectRoutes = projects.map((project) => `/projets/${project.slug}`);

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://alchimiste-creations.fr';
    const now = new Date();

    return [...routes, ...projectRoutes].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
    }));
}
