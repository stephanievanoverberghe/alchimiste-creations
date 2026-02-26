import { getSiteViewModel } from '@/application/site/use-cases/getSiteViewModel';
import { CtaBand } from '@/presentation/sections/shared/CtaBrand';
import { PageHero } from '@/presentation/sections/marketing/PageHero';
import { OfferCard } from '@/presentation/ui/cards/OfferCard';
import { Section } from '@/presentation/ui/primitives/Section';

export function OffersPage() {
    const { site, packs, faq } = getSiteViewModel();
    return (
        <>
            <PageHero {...site.offers.intro} primary={site.offers.intro.cta.primary} secondary={site.offers.intro.cta.secondary} />
            <Section>
                <div className="grid gap-4 lg:grid-cols-3">
                    {packs.map((pack) => (
                        <OfferCard
                            key={pack.slug}
                            name={pack.title}
                            target={pack.idealFor}
                            priceFrom={pack.priceFrom}
                            timeline={pack.timeline}
                            highlights={pack.highlights}
                            href={pack.ctaHref}
                            featured={pack.featured}
                        />
                    ))}
                </div>
            </Section>
            <Section tone="accent">
                <h2 className="text-4xl">Questions fréquentes avant de choisir</h2>
                <div className="mt-8 grid gap-3 md:grid-cols-2">
                    {faq.slice(0, 6).map((item) => (
                        <details key={item.id} className="rounded-2xl border border-terracotta/30 p-4 bg-white/70">
                            <summary className="cursor-pointer font-semibold">{item.question}</summary>
                            <p className="mt-2 text-foreground/80">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </Section>
            <CtaBand title="Vous hésitez entre deux packs ?" body="On choisit ensemble la bonne trajectoire selon vos objectifs, votre timing et votre budget." />
        </>
    );
}
