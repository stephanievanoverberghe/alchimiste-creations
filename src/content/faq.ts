import { faqSchema, type FaqItem } from '@/content/schemas';

const rawFaq = [
    {
        id: 'timeline',
        question: 'Combien de temps faut-il pour lancer le site ?',
        answer: 'Entre 2 et 8 semaines selon le pack et la disponibilité de vos contenus.',
        featured: true,
    },
    {
        id: 'payment',
        question: 'Peut-on payer en plusieurs fois ?',
        answer: 'Oui, avec un échéancier simple défini au devis.',
        featured: true,
    },
    {
        id: 'ownership',
        question: 'Qui possède le site à la livraison ?',
        answer: 'Vous gardez la propriété du code, des accès et des livrables.',
        featured: false,
    },
] satisfies FaqItem[];

export const faq = faqSchema.parse(rawFaq);
