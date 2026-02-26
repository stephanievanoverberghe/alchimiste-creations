import { getSiteViewModel } from '@/application/site/use-cases/getSiteViewModel';
import { CtaBand } from '@/presentation/sections/shared/CtaBrand';
import { PageHero } from '@/presentation/sections/marketing/PageHero';
import { Section } from '@/presentation/ui/primitives/Section';

const quality = [
    'Accessibilité: structure sémantique, navigation clavier, contrastes AA.',
    'Performance: images optimisées, composants serveur, JS limité.',
    'SEO: metadata, maillage interne, données structurées, sitemap.',
];

export function MethodPage() {
    const { site } = getSiteViewModel();
    return (
        <>
            <PageHero {...site.method.intro} primary={site.method.intro.cta.primary} secondary={site.method.intro.cta.secondary} />
            <Section>
                <h2 className="text-4xl">Le process</h2>
                <ol className="mt-8 space-y-4">
                    {site.home.process.map((step) => (
                        <li key={step.title} className="rounded-2xl border border-sauge/35 p-5">
                            <h3 className="text-2xl">{step.title}</h3>
                            <p className="mt-2 text-foreground/80">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </Section>
            <Section tone="accent">
                <h2 className="text-4xl">Qualité embarquée</h2>
                <ul className="mt-8 space-y-3">
                    {quality.map((item) => (
                        <li key={item} className="rounded-2xl border border-terracotta/25 bg-white/70 p-4">
                            {item}
                        </li>
                    ))}
                </ul>
            </Section>
            <CtaBand title="Une méthode stable, un rendu premium." body="Vous savez toujours où vous en êtes: décisions, livrables, validations." />
        </>
    );
}
