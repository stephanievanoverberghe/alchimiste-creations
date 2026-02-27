import { projectsSchema } from './schemas';

export const projects = projectsSchema.parse([
    {
        slug: 'explorart',
        client: "Explor'Art",
        sector: 'Média culturel',
        challenge: 'Créer une plateforme éditoriale dès zéro pour structurer les contenus et donner envie de lire plus longtemps.',
        solution: 'On a conçu un site complet avec une arborescence claire, une hiérarchie visuelle lisible et un parcours fluide sur mobile.',
        outcomes: ['Base solide pour publier régulièrement', 'Lecture plus fluide entre les rubriques clés'],
        stack: ['Création de site', 'Architecture de contenu', 'Expérience mobile'],
        tag: 'Création éditoriale',
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
        sector: 'Portfolio de photographe',
        challenge: 'Construire un portfolio photo de A à Z qui mette immédiatement les séries en valeur sur tous les écrans.',
        solution: 'On a imaginé une direction visuelle immersive et un parcours simple pour laisser toute la place aux images.',
        outcomes: ['Portfolio prêt à présenter les séries professionnelles', 'Navigation intuitive sur mobile et desktop'],
        stack: ['Création de site', 'Direction artistique', 'UX portfolio'],
        tag: 'Création portfolio',
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
        sector: 'Accompagnement bien-être',
        challenge: 'Lancer une présence en ligne crédible dès le départ pour présenter l’accompagnement et faciliter la prise de contact.',
        solution: 'On a créé une vitrine apaisante avec une structure claire, des sections pédagogiques et des CTA bien placés.',
        outcomes: ['Présence digitale alignée avec l’univers bien-être', 'Parcours simple jusqu’au formulaire de contact'],
        stack: ['Création de vitrine', 'Message de confiance', 'Parcours de conversion'],
        tag: 'Création bien-être',
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
        sector: 'Expérience événementielle',
        challenge: 'Créer un site événementiel original depuis une page blanche pour transmettre l’expérience et déclencher les réservations.',
        solution: 'On a conçu une narration visuelle immersive avec un découpage des offres clair et un chemin de réservation progressif.',
        outcomes: ['Concept digital cohérent avec l’expérience proposée', 'Réservation plus naturelle grâce à un parcours guidé'],
        stack: ['Création de site', 'Storytelling immersif', 'Conversion événementielle'],
        tag: 'Création immersive',
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
        challenge: 'Poser les bases d’un site premium entièrement neuf pour incarner le positionnement du studio et valoriser les services.',
        solution: 'On a produit une vitrine haut de gamme avec une identité visuelle forte, des offres lisibles et des preuves de crédibilité.',
        outcomes: ['Site premium prêt à soutenir la prospection', 'Offres compréhensibles en quelques secondes'],
        stack: ['Création de vitrine', 'Positionnement premium', 'Design orienté conversion'],
        tag: 'Création premium',
        icon: 'brush',
        image: {
            src: '/images/projects/studio-lumen.png',
            alt: 'Aperçu du projet Studio Lumen',
        },
        liveUrl: 'https://studio-lumen.vercel.app/',
    },
]);
