import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Accordion } from '@/components/ui/accordion';
import { SectionHeading } from '@/components/ui/section-heading';
import type { FAQ } from '@/content/schemas';

const items: FAQ[] = [
    {
        question: 'Quelle offre choisir si je démarre mon activité ?',
        answer: 'La One Page est idéale pour démarrer vite avec un message clair et une prise de contact simple.',
    },
    {
        question: 'Pourquoi l’offre “Site vitrine” est la plus choisie ?',
        answer: 'Elle crée une base complète et crédible pour présenter vos services, rassurer vos prospects et soutenir votre acquisition.',
    },
    {
        question: 'La refonte concerne tout le site ?',
        answer: 'La priorité est la page d’accueil, car c’est là que se joue la compréhension de votre offre et le passage à l’action. Les autres pages peuvent suivre.',
    },
    {
        question: 'Dois-je fournir tous les textes ?',
        answer: 'Vous apportez la matière métier. Je vous aide à structurer et clarifier les contenus pour qu’ils soient plus convaincants.',
    },
    {
        question: 'Comment se passe le paiement ?',
        answer: 'En général : acompte au lancement, puis solde à la livraison. Le détail est précisé dans le devis.',
    },
    {
        question: 'Le site est-il optimisé mobile ?',
        answer: 'Oui, chaque offre inclut une version mobile soignée pour conserver lisibilité, fluidité et conversion sur smartphone.',
    },
    {
        question: 'Puis-je faire évoluer le site après la livraison ?',
        answer: 'Oui. Le socle est conçu pour évoluer : nouvelles sections, pages supplémentaires, améliorations conversion.',
    },
];

export function OffersFaqSection() {
    return (
        <Section className="py-8 md:py-12" aria-labelledby="offers-faq-title">
            <Container>
                <SectionHeading
                    id="offers-faq-title"
                    eyebrow="FAQ"
                    title="Questions fréquentes avant de réserver"
                    description="Des réponses courtes pour décider sereinement et avancer sans zone grise."
                />
                <Accordion items={items} />
            </Container>
        </Section>
    );
}
