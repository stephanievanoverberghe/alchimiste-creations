import { z } from 'zod';

const ctaSchema = z.object({
    primary: z.object({ label: z.string(), href: z.string().startsWith('/') }),
    secondary: z.object({ label: z.string(), href: z.string().startsWith('/') }),
});

const pageIntroSchema = z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
    cta: ctaSchema,
});

const problemSchema = z.object({ title: z.string(), text: z.string() });
const stepSchema = z.object({ title: z.string(), text: z.string() });
const testimonialSchema = z.object({ quote: z.string(), author: z.string() });

const siteSchema = z.object({
    home: z.object({
        hero: pageIntroSchema,
        problems: z.array(problemSchema).min(3),
        process: z.array(stepSchema).min(4),
        finalCtaTitle: z.string(),
        finalCtaBody: z.string(),
    }),
    offers: z.object({ intro: pageIntroSchema }),
    method: z.object({ intro: pageIntroSchema }),
    projects: z.object({ intro: pageIntroSchema, testimonials: z.array(testimonialSchema).min(2) }),
    about: z.object({ intro: pageIntroSchema }),
    contact: z.object({ intro: pageIntroSchema, reassurance: z.array(z.string()).min(3) }),
    faq: z.object({ intro: pageIntroSchema }),
});

export const siteContent = siteSchema.parse({
    home: {
        hero: {
            eyebrow: 'Studio web à Lille + remote',
            title: 'Un site clair, vivant et rassurant qui attire les bons clients.',
            description: 'Je transforme votre identité en expérience web premium: message limpide, design sensible, parcours qui convertit sans forcer.',
            cta: {
                primary: { label: 'Réserver un appel', href: '/contact' },
                secondary: { label: 'Demander un devis', href: '/contact' },
            },
        },
        problems: [
            { title: 'Message flou', text: 'Vos visiteurs ne comprennent pas en 5 secondes ce que vous proposez.' },
            { title: 'Image incohérente', text: 'Le site ne reflète pas votre niveau de qualité ni votre univers.' },
            { title: 'Peu de demandes', text: 'Le parcours freine la prise de contact au lieu de la faciliter.' },
        ],
        process: [
            { title: '1. Cadrage', text: 'Objectifs, audience, offre, angle éditorial.' },
            { title: '2. Direction', text: 'Wireframes, ton, hiérarchie et parcours de conversion.' },
            { title: '3. Production', text: 'Intégration Next.js, responsive, perf, accessibilité.' },
            { title: '4. Transmission', text: 'Formation, documentation et suivi de lancement.' },
        ],
        finalCtaTitle: 'On construit un site qui vous ressemble et qui performe.',
        finalCtaBody: 'Réponse sous 48h, process clair, pas de jargon: juste des décisions nettes et un résultat solide.',
    },
    offers: {
        intro: {
            eyebrow: 'Offres',
            title: 'Trois packs, un même niveau d’exigence.',
            description: 'Choisissez la profondeur d’accompagnement adaptée à votre stade de croissance.',
            cta: { primary: { label: 'Réserver un appel', href: '/contact' }, secondary: { label: 'Voir les projets', href: '/projets' } },
        },
    },
    method: {
        intro: {
            eyebrow: 'Méthode',
            title: 'Une méthode cadrée pour avancer sereinement.',
            description: 'Chaque étape est expliquée, validée et livrée avec des critères qualité précis.',
            cta: { primary: { label: 'Réserver un appel', href: '/contact' }, secondary: { label: 'Voir les offres', href: '/offres' } },
        },
    },
    projects: {
        intro: {
            eyebrow: 'Projets',
            title: 'Des cas concrets, des résultats mesurables.',
            description: 'Avant/après, défis réels, décisions design/tech et impact business.',
            cta: { primary: { label: 'Réserver un appel', href: '/contact' }, secondary: { label: 'Demander un devis', href: '/contact' } },
        },
        testimonials: [
            { quote: 'Mon site m’aide enfin à signer les bons clients.', author: 'Camille — Thérapeute' },
            { quote: 'On sent la qualité, les visiteurs restent plus longtemps.', author: 'Noé — Artiste' },
        ],
    },
    about: {
        intro: {
            eyebrow: 'À propos',
            title: 'Front-end + Product Design au service de votre singularité.',
            description: 'Je conçois des expériences web élégantes, lisibles et orientées conversion durable.',
            cta: { primary: { label: 'Réserver un appel', href: '/contact' }, secondary: { label: 'Voir la méthode', href: '/methode' } },
        },
    },
    contact: {
        intro: {
            eyebrow: 'Contact',
            title: 'Parlons de votre projet, simplement.',
            description: 'Un échange de 30 minutes pour clarifier besoins, budget, timing et prochaines étapes.',
            cta: { primary: { label: 'Réserver un appel', href: '/contact' }, secondary: { label: 'Demander un devis', href: '/contact' } },
        },
        reassurance: ['Réponse sous 48h', 'Aucun engagement après l’appel', 'Process transparent et devis détaillé'],
    },
    faq: {
        intro: {
            eyebrow: 'FAQ',
            title: 'Tout ce qu’il faut savoir avant de lancer votre site.',
            description: 'Délais, budget, SEO, propriété du site, maintenance: réponses courtes et concrètes.',
            cta: { primary: { label: 'Réserver un appel', href: '/contact' }, secondary: { label: 'Demander un devis', href: '/contact' } },
        },
    },
});

export type SiteContent = z.infer<typeof siteSchema>;
