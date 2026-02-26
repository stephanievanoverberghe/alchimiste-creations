import { Button } from '@/presentation/ui/Button';
import { Section } from '@/presentation/ui/primitives/Section';

type PageHeroProps = {
    eyebrow: string;
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
};

export function PageHero({ eyebrow, title, description, primary, secondary }: PageHeroProps) {
    return (
        <Section
            spacing="lg"
            className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(202,157,68,0.22),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(176,185,133,0.2),transparent_48%),var(--ivoire)]"
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-30 [background-image:radial-gradient(rgba(27,10,0,0.08)_1px,transparent_1px)] [background-size:8px_8px]"
                aria-hidden
            />
            <div className="relative max-w-3xl">
                <p className="text-xs uppercase tracking-[0.14em] text-terracotta">{eyebrow}</p>
                <h1 className="mt-4 text-5xl leading-[1.05] text-foreground md:text-6xl">{title}</h1>
                <p className="mt-5 text-lg text-foreground/80">{description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={primary.href}>{primary.label}</Button>
                    <Button href={secondary.href} variant="secondary">
                        {secondary.label}
                    </Button>
                </div>
            </div>
        </Section>
    );
}
