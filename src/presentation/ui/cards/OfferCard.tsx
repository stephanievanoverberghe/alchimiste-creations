import { Button } from '@/presentation/ui/Button';
import { cn } from '@/shared/utils/cn';

type OfferCardProps = {
    name: string;
    target: string;
    priceFrom: string;
    timeline: string;
    highlights: string[];
    href: string;
    featured?: boolean;
};

export function OfferCard({ name, target, priceFrom, timeline, highlights, href, featured = false }: OfferCardProps) {
    return (
        <article
            className={cn(
                'rounded-3xl border p-6 md:p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1',
                featured ? 'border-ormat/50 bg-gradient-to-b from-ormat/10 to-[var(--ivoire)]' : 'border-sauge/40 bg-[var(--ivoire)]',
            )}
        >
            <p className="mb-2 text-xs uppercase tracking-[0.12em] text-foreground/70">{target}</p>
            <h3 className="text-3xl leading-none text-foreground">{name}</h3>
            <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-terracotta">{priceFrom}</p>
                <p className="text-sm text-foreground/70">{timeline}</p>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block size-1.5 rounded-full bg-sauge" aria-hidden />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <Button href={href} variant={featured ? 'primary' : 'secondary'} className="mt-6 w-full">
                Découvrir l'offre
            </Button>
        </article>
    );
}
