import { projectsSchema } from './schemas';

export const projects = projectsSchema.parse([
    {
        slug: 'explorart',
        client: "Explor'Art",
        sector: 'Média culturel',
        challenge: 'Les lecteurs se perdaient entre les rubriques et quittaient le site trop vite.',
        solution: 'On a clarifié le parcours pour que chaque personne trouve rapidement le bon contenu.',
        outcomes: ['Navigation plus simple et intuitive', 'Temps de lecture mieux réparti sur les contenus clés'],
        stack: ['Parcours client', 'Clarté du message', 'Lecture mobile'],
        tag: 'Clarté éditoriale',
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
        challenge: 'Le site ne mettait pas assez en valeur les séries photos sur mobile.',
        solution: 'On a créé une expérience plus immersive et fluide pour valoriser les images dès la première visite.',
        outcomes: ['Photos mieux mises en avant', 'Navigation plus confortable sur téléphone'],
        stack: ['Mise en valeur visuelle', 'Expérience mobile', 'Confort de navigation'],
        tag: 'Image de marque',
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
        challenge: 'Le message n’était pas assez clair pour guider les visiteurs vers la prise de contact.',
        solution: 'On a simplifié les sections et renforcé les appels à l’action pour rendre le parcours évident.',
        outcomes: ['Univers plus rassurant', 'Plus de clarté pour passer à l’action'],
        stack: ['Rassurance', 'Parcours clair', 'Boutons efficaces'],
        tag: 'Clarté & confiance',
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
        challenge: 'Le parcours était dense et pouvait freiner l’envie de réserver.',
        solution: 'On a construit une navigation rythmée et plus lisible pour garder l’attention jusqu’au passage à l’action.',
        outcomes: ['Expérience plus engageante', 'Étapes plus claires pour avancer'],
        stack: ['Storytelling', 'Parcours fluide', 'Interaction'],
        tag: 'Expérience immersive',
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
        challenge: 'Le site ne traduisait pas assez la qualité premium des services proposés.',
        solution: 'On a renforcé l’impact visuel, clarifié les offres et rendu le parcours plus convaincant.',
        outcomes: ['Image plus haut de gamme', 'Offres plus faciles à comparer'],
        stack: ['Positionnement premium', 'Clarté des offres', 'Crédibilité'],
        tag: 'Image premium',
        icon: 'brush',
        image: {
            src: '/images/projects/studio-lumen.png',
            alt: 'Aperçu du projet Studio Lumen',
        },
        liveUrl: 'https://studio-lumen.vercel.app/',
    },
]);
