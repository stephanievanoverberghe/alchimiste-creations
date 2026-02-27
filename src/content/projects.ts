import { projectsSchema } from './schemas';

export const projects = projectsSchema.parse([
    {
        slug: 'explorart',
        client: "Explor'Art",
        sector: 'Plateforme éditoriale',
        challenge: 'Structurer un blog d’art autour de 7 piliers forts sans perdre l’utilisateur dans la navigation.',
        solution: 'Architecture éditoriale claire, navigation par piliers, UI bento modulaire et base Next.js maintenable.',
        outcomes: ['Lecture plus fluide et hiérarchie claire', 'Navigation simplifiée entre les piliers'],
        stack: ['Next.js', 'TypeScript', 'Tailwind', 'MongoDB'],
        tag: 'Content & UX',
        icon: 'layout',
        image: {
            src: '/images/projects/explorart.webp',
            alt: "Aperçu du projet Explor'Art",
        },
        liveUrl: 'https://explorart-blog.vercel.app/',
        featured: true,
    },

    {
        slug: 'rivage-photo',
        client: 'Rivage Photo',
        sector: 'Portfolio photographe',
        challenge: 'Mettre en valeur des séries photos immersives tout en gardant un site rapide et confortable sur mobile.',
        solution: 'Galerie optimisée, hiérarchie visuelle épurée, UI premium sombre et optimisation des images.',
        outcomes: ['Meilleure mise en avant des séries', 'Chargement optimisé sur mobile'],
        stack: ['Next.js', 'TypeScript', 'Tailwind', 'Image Optimization'],
        tag: 'Portfolio & Performance',
        icon: 'camera',
        image: {
            src: '/images/projects/rivage-photo.webp',
            alt: 'Aperçu du projet Rivage Photo',
        },
        liveUrl: 'https://rivage-photo.vercel.app/',
        featured: true,
    },

    {
        slug: 'ancre-toi',
        client: 'Ancre-toi',
        sector: 'Projet bien-être',
        challenge: 'Créer un univers digital apaisant tout en gardant une structure claire orientée conversion.',
        solution: 'Design doux et immersif, sections structurées, CTA visibles et message simplifié.',
        outcomes: ['Univers cohérent et rassurant', 'Parcours plus clair vers la prise de contact'],
        stack: ['Next.js', 'Tailwind', 'UI Design'],
        tag: 'Branding & Clarté',
        icon: 'sparkles',
        image: {
            src: '/images/projects/ancre-toi.webp',
            alt: 'Aperçu du projet Ancre-toi',
        },
        liveUrl: 'https://ancretoi.vercel.app/',
    },

    {
        slug: 'mysteres-a-la-carte',
        client: 'Mystères à la carte',
        sector: 'Expérience interactive',
        challenge: 'Proposer une expérience immersive et narrative sans sacrifier la lisibilité et la performance.',
        solution: 'Narration structurée, composants dynamiques, hiérarchie claire et animations légères.',
        outcomes: ['Expérience immersive maîtrisée', 'Navigation plus intuitive'],
        stack: ['Next.js', 'TypeScript', 'Motion UI'],
        tag: 'Storytelling & Interaction',
        icon: 'wand2',
        image: {
            src: '/images/projects/mysteres.webp',
            alt: 'Aperçu du projet Mystères à la carte',
        },
        liveUrl: 'https://mysteres-a-la-carte.vercel.app/',
    },

    {
        slug: 'studio-lumen',
        client: 'Studio Lumen',
        sector: 'Studio créatif',
        challenge: 'Refléter une image premium et moderne avec une structure claire orientée client.',
        solution: 'Direction artistique immersive, bento layout, preuves sociales intégrées et CTA stratégiques.',
        outcomes: ['Image plus premium', 'Lecture plus structurée des offres'],
        stack: ['Next.js', 'Tailwind', 'SEO'],
        tag: 'Direction artistique',
        icon: 'brush',
        image: {
            src: '/images/projects/studio-lumen.png',
            alt: 'Aperçu du projet Studio Lumen',
        },
        liveUrl: 'https://studio-lumen.vercel.app/',
    },
]);
