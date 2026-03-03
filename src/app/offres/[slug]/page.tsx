import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Accordion } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { offers } from '@/content/offers';
import type { FAQ } from '@/content/schemas';
import { formatPrice, formatTimeline } from '@/features/offers/lib/offer-formatters';
import { getOfferBySlug } from '@/features/offers/lib/get-offer-by-slug';
import { cn } from '@/lib/utils';
import { breadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

type OfferPageProps = {
    params: Promise<{ slug: string }>;
};

const processSteps = [
    {
        title: '1. Appel / cadrage',
        description: 'On clarifie vos objectifs, vos priorités et le périmètre idéal pour avancer vite sans vous disperser.',
    },
    {
        title: '2. Design + intégration',
        description: 'Je conçois une interface claire et premium puis je l’intègre avec un code sur mesure, propre et performant.',
    },
    {
        title: '3. Mise en ligne + suivi',
        description: 'Je vous accompagne pour la mise en ligne et je reste disponible pour les ajustements utiles après lancement.',
    },
] as const;

function getOfferFaqs(slug: string): FAQ[] {
    if (slug === 'creation-one-page') {
        return [
            {
                question: 'Quels contenus dois-je fournir pour une One Page ?',
                answer: 'Le minimum utile : vos services, vos différences, des preuves (avis/réalisations) et un moyen de contact.',
            },
            {
                question: 'En combien de temps le site peut-il être en ligne ?',
                answer: 'La plupart des projets One Page se lancent en 1 à 2 semaines selon votre réactivité sur les contenus.',
            },
            {
                question: 'Le design est-il unique ?',
                answer: 'Oui, chaque page est conçue sur mesure selon votre positionnement. Aucun template générique.',
            },
            {
                question: 'Puis-je faire évoluer la One Page plus tard ?',
                answer: 'Oui, c’est une base évolutive. Vous pourrez ajouter des sections, puis des pages si nécessaire.',
            },
            {
                question: 'La One Page inclut-elle le SEO ?',
                answer: 'Oui, le socle SEO technique est inclus (structure, balises, indexabilité) pour un démarrage propre.',
            },
            {
                question: 'Qui est propriétaire du site ?',
                answer: 'Vous êtes propriétaire du site livré et de ses contenus.',
            },
        ];
    }

    if (slug === 'refonte-site-internet') {
        return [
            {
                question: 'Faut-il refaire tout le site lors d’une refonte ?',
                answer: 'Pas forcément. On priorise les pages à fort impact, souvent la page d’accueil et le parcours de conversion.',
            },
            {
                question: 'Pouvez-vous conserver certains contenus existants ?',
                answer: 'Oui, on conserve ce qui fonctionne et on retravaille uniquement ce qui freine la compréhension ou la conversion.',
            },
            {
                question: 'La refonte peut-elle améliorer la crédibilité perçue ?',
                answer: 'Oui, c’est même un objectif central : message clarifié, design cohérent et preuves mieux mises en avant.',
            },
            {
                question: 'Est-ce compatible avec le SEO existant ?',
                answer: 'Oui, la refonte est pensée pour préserver les bases utiles et améliorer la structure technique.',
            },
            {
                question: 'Proposez-vous un suivi après la mise en ligne ?',
                answer: 'Oui, un suivi est prévu pour ajuster les points prioritaires après les premiers retours.',
            },
            {
                question: 'Peut-on planifier la refonte sans bloquer l’activité ?',
                answer: 'Oui, le projet est organisé par étapes pour limiter les interruptions et garder un rythme maîtrisé.',
            },
        ];
    }

    return [
        {
            question: 'Quels contenus sont nécessaires pour un site vitrine ?',
            answer: 'Vos services, votre positionnement, des éléments de preuve (avis, cas clients) et vos informations de contact.',
        },
        {
            question: 'Combien de pages recommandez-vous au démarrage ?',
            answer: 'En général 4 à 8 pages suffisent pour être clair, crédible et orienté prise de contact.',
        },
        {
            question: 'Le site est-il adapté au mobile ?',
            answer: 'Oui, la lecture et les CTA sont optimisés pour smartphone, tablette et desktop.',
        },
        {
            question: 'Le SEO est-il prévu dans l’offre ?',
            answer: 'Oui, les bases SEO techniques sont intégrées pour poser des fondations solides dès le lancement.',
        },
        {
            question: 'Puis-je demander des évolutions après livraison ?',
            answer: 'Oui, le site est conçu pour évoluer : nouvelles pages, nouvelles sections et optimisations conversion.',
        },
        {
            question: 'Comment se passe la validation du projet ?',
            answer: 'Vous validez chaque grande étape pour garder une vision claire et éviter les surprises en fin de projet.',
        },
    ];
}

export function generateStaticParams() {
    return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: OfferPageProps): Promise<Metadata> {
    const { slug } = await params;
    const offer = getOfferBySlug(slug);

    if (!offer) {
        return {
            title: 'Offre introuvable',
        };
    }

    return {
        title: `${offer.name} | Offre`,
        description: offer.summary,
    };
}

export default async function OfferDetailsPage({ params }: OfferPageProps) {
    const { slug } = await params;
    const offer = getOfferBySlug(slug);

    if (!offer) {
        notFound();
    }

    const visibleDeliverables = offer.deliverables.slice(0, 8);
    const additionalDeliverables = offer.deliverables.slice(8);
    const faqs = getOfferFaqs(offer.slug);

    return (
        <>
            <Section className="pb-8 pt-6 md:pb-10 md:pt-12" aria-labelledby="offer-title">
                <Container>
                    <nav aria-label="Fil d’Ariane" className="mb-5 text-sm text-text-muted">
                        <ol className="flex flex-wrap items-center gap-2">
                            <li>
                                <Link href="/" className="focus-ring rounded-md hover:text-text">
                                    Accueil
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li>
                                <Link href="/offres" className="focus-ring rounded-md hover:text-text">
                                    Offres
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li className="text-text">{offer.name}</li>
                        </ol>
                    </nav>

                    <div className="grid items-start gap-6 md:grid-cols-12 md:gap-8">
                        <div className="space-y-5 md:col-span-7">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge>Offre</Badge>
                                {offer.featured ? <Badge className="border-primary/50 bg-primary/10 text-primary">Le plus choisi</Badge> : null}
                            </div>

                            <h1 id="offer-title" className="typography-h1 text-balance">
                                {offer.name}
                            </h1>

                            <p className="typography-body-lg">{offer.punchline}</p>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <Card className="border border-border/70 bg-background/40 p-4">
                                    <p className="text-xs uppercase tracking-wide text-text-muted">Prix à partir de</p>
                                    <p className="mt-2 text-sm font-semibold text-text">{formatPrice(offer.priceFrom)}</p>
                                </Card>
                                <Card className="border border-border/70 bg-background/40 p-4">
                                    <p className="text-xs uppercase tracking-wide text-text-muted">Timeline</p>
                                    <p className="mt-2 text-sm font-semibold text-text">{formatTimeline(offer.timeline)}</p>
                                </Card>
                                <Card className="border border-border/70 bg-background/40 p-4">
                                    <p className="text-xs uppercase tracking-wide text-text-muted">Idéal pour</p>
                                    <p className="mt-2 text-sm font-semibold text-text">{offer.bestFor ?? 'Activités qui veulent accélérer leurs demandes qualifiées.'}</p>
                                </Card>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-1">
                                <Button href="/contact">Réserver un appel</Button>
                                <Button href="/contact#devis" variant="secondary">
                                    Demander un devis
                                </Button>
                            </div>
                        </div>

                        <Card className="overflow-hidden border border-border/70 bg-surface/70 p-0 md:col-span-5">
                            <div className="flex min-h-72 flex-col justify-between bg-linear-to-br from-primary/15 via-accent/10 to-surface p-6">
                                <Badge className="w-fit bg-background/70">Aperçu de l’offre</Badge>
                                <p className="mt-3 text-sm text-text-muted">{offer.summary}</p>
                                <p className="mt-6 text-sm font-medium text-text">Un rendu visuel sur mesure vous est présenté dès la phase de cadrage.</p>
                            </div>
                        </Card>
                    </div>
                </Container>
            </Section>

            <Section className="py-8 md:py-12" aria-labelledby="offer-deliverables-title">
                <Container>
                    <SectionHeading
                        id="offer-deliverables-title"
                        eyebrow="Ce que vous obtenez"
                        title="Un livrable concret, prêt à soutenir vos demandes"
                        description="Vous avancez avec un cadre clair, une exécution sur mesure et une mise en ligne accompagnée."
                    />
                    <Card className="border border-border/70 p-6">
                        <ul className="space-y-3 text-sm text-text-muted" aria-label="Liste des livrables inclus">
                            {visibleDeliverables.map((deliverable) => (
                                <li key={deliverable} className="flex gap-2">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                    <span>{deliverable}</span>
                                </li>
                            ))}
                        </ul>
                        {additionalDeliverables.length ? (
                            <div className="mt-5 border-t border-border/60 pt-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Et aussi</p>
                                <ul className="mt-3 space-y-3 text-sm text-text-muted">
                                    {additionalDeliverables.map((deliverable) => (
                                        <li key={deliverable} className="flex gap-2">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                            <span>{deliverable}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </Card>
                </Container>
            </Section>

            <Section className="py-8 md:py-12" aria-labelledby="offer-why-title">
                <Container>
                    <SectionHeading
                        id="offer-why-title"
                        eyebrow="Pourquoi cette offre"
                        title="Une solution pensée pour votre phase actuelle"
                        description="L’objectif est simple : clarifier votre positionnement et faciliter le passage à l’action."
                    />
                    <Card className="space-y-4 border border-border/70 p-6">
                        {offer.bestFor ? (
                            <p className="text-sm text-text-muted">
                                <strong className="text-text">Cette offre est idéale si :</strong> {offer.bestFor}
                            </p>
                        ) : null}

                        {offer.highlights?.length ? (
                            <ul className="flex flex-wrap gap-2" aria-label="Points forts de l’offre">
                                {offer.highlights.map((highlight) => (
                                    <li key={highlight} className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs font-medium text-text-muted">
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        ) : null}

                        {offer.note ? (
                            <aside className="rounded-lg border border-primary/30 bg-primary/5 p-4" aria-label="Note importante sur l’offre">
                                <p className="text-sm text-text-muted">{offer.note}</p>
                            </aside>
                        ) : null}
                    </Card>
                </Container>
            </Section>

            <Section className="py-8 md:py-12" aria-labelledby="offer-pricing-title">
                <Container>
                    <SectionHeading
                        id="offer-pricing-title"
                        eyebrow="Budget"
                        title="Ce qui fait évoluer le prix"
                        description="Un cadre transparent pour estimer le bon périmètre sans mauvaise surprise."
                    />
                    <Card className="border border-border/70 p-6">
                        <ul className="space-y-2 text-sm text-text-muted">
                            {(offer.priceFactors ?? []).map((factor) => (
                                <li key={factor}>• {factor}</li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm font-medium text-text">Je vous confirme un devis après un échange rapide.</p>
                    </Card>
                </Container>
            </Section>

            <Section className="py-8 md:py-12" aria-labelledby="offer-process-title">
                <Container>
                    <SectionHeading
                        id="offer-process-title"
                        eyebrow="Process"
                        title="Process en 3 étapes"
                        description="Un déroulé simple pour avancer avec visibilité, sans surcharge inutile."
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                        {processSteps.map((step) => (
                            <Card key={step.title} className="border border-border/70 p-5">
                                <h3 className="text-base font-semibold text-text">{step.title}</h3>
                                <p className="mt-2 text-sm text-text-muted">{step.description}</p>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>
            <Section className="py-8 md:py-12" aria-labelledby="offer-faq-title">
                <Container>
                    <SectionHeading
                        id="offer-faq-title"
                        eyebrow="FAQ"
                        title="Questions fréquentes sur cette offre"
                        description="Des réponses courtes pour vous aider à décider sereinement."
                    />
                    <Accordion items={faqs} />
                </Container>
            </Section>

            <Section className="pb-28 pt-8 md:pb-12 md:pt-12" aria-labelledby="offer-final-cta-title">
                <Container>
                    <Card className="border border-primary/40 bg-linear-to-br from-primary/10 via-surface to-surface-elevated p-6 md:p-8">
                        <h2 id="offer-final-cta-title" className="typography-h3 text-balance">
                            Vous voulez un site plus clair, plus crédible et orienté demandes ?
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm text-text-muted md:text-base">
                            En 20 minutes, on valide le meilleur périmètre pour cette offre et les prochaines étapes concrètes.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Button href="/contact">Réserver un appel</Button>
                            <Button href="/contact#devis" variant="secondary">
                                Demander un devis
                            </Button>
                        </div>
                        <Link href="/offres" className={cn('focus-ring mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-strong')}>
                            <ArrowLeft className="h-4 w-4" />
                            Retour aux offres
                        </Link>
                    </Card>
                </Container>
            </Section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbJsonLd([
                            { name: 'Accueil', path: '/' },
                            { name: 'Offres', path: '/offres' },
                            { name: offer.name, path: `/offres/${offer.slug}` },
                        ]),
                    ),
                }}
            />
        </>
    );
}
