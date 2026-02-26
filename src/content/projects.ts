import { projectsSchema, type Project } from '@/content/schemas';

const rawProjects = [
    {
        slug: 'atelier-aria',
        name: 'Atelier Aria',
        sector: 'Thérapie holistique',
        challenge: 'Rendre l’offre lisible sans perdre la sensibilité de la praticienne.',
        outcome: '+38% de prises de contact en 8 semaines.',
        image: '/projects/atelier-aria.png',
        tags: ['UX', 'Copy', 'SEO local'],
        testimonial: {
            quote: 'Mon site inspire enfin confiance, je reçois des demandes mieux qualifiées.',
            author: 'Marie, praticienne',
        },
    },
    {
        slug: 'rivage-photo',
        name: 'Rivage Photo',
        sector: 'Art & photographie',
        challenge: 'Présenter le portfolio sans alourdir le temps de chargement.',
        outcome: 'LCP stabilisé sous 2.2s mobile.',
        image: '/projects/rivage-photo.png',
        tags: ['Perf', 'Bento layout'],
    },
] satisfies Project[];

export const projects = projectsSchema.parse(rawProjects);
