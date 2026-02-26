import { getSiteViewModel } from '@/application/site/use-cases/getSiteViewModel';
import { CtaBand } from '@/presentation/sections/shared/CtaBrand';
import { PageHero } from '@/presentation/sections/marketing/PageHero';
import { Section } from '@/presentation/ui/primitives/Section';

export function AboutPage() {
    const { site } = getSiteViewModel();
    return (
        <>
            <PageHero {...site.about.intro} primary={site.about.intro.cta.primary} secondary={site.about.intro.cta.secondary} />
            <Section>
                <div className="grid gap-4 md:grid-cols-2">
                    <article className="rounded-2xl border border-sauge/35 p-6">
                        <h2 className="text-3xl">Ce que je défends</h2>
                        <p className="mt-3 text-foreground/80">Un site n’est pas juste beau: il doit être lisible, crédible et utile à vos prospects.</p>
                    </article>
                    <article className="rounded-2xl border border-sauge/35 p-6">
                        <h2 className="text-3xl">Pour qui</h2>
                        <p className="mt-3 text-foreground/80">Thérapeutes holistiques, artistes et indépendants sensibles qui veulent une présence digitale premium.</p>
                    </article>
                </div>
            </Section>
            <CtaBand
                title="Vous cherchez une collaboration sérieuse et humaine ?"
                body="Si vous aimez la clarté, l’exigence et les échanges fluides, on va bien travailler ensemble."
            />
        </>
    );
}
