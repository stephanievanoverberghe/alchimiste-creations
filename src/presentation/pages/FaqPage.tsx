import { getSiteViewModel } from '@/application/site/use-cases/getSiteViewModel';
import { PageHero } from '@/presentation/sections/marketing/PageHero';
import { Section } from '@/presentation/ui/primitives/Section';

export function FaqPage() {
    const { site, faq } = getSiteViewModel();
    return (
        <>
            <PageHero {...site.faq.intro} primary={site.faq.intro.cta.primary} secondary={site.faq.intro.cta.secondary} />
            <Section>
                <div className="space-y-3">
                    {faq.map((item) => (
                        <details key={item.id} className="rounded-2xl border border-sauge/35 p-4 open:bg-sauge/10">
                            <summary className="cursor-pointer font-semibold">{item.question}</summary>
                            <p className="mt-2 text-foreground/80">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </Section>
        </>
    );
}
