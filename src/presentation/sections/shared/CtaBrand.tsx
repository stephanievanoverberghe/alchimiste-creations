import { Button } from '@/presentation/ui/Button';
import { Section } from '@/presentation/ui/primitives/Section';

type CtaBandProps = {
    title: string;
    body: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
};

export function CtaBand({
    title,
    body,
    primaryLabel = 'Réserver un appel',
    primaryHref = '/contact',
    secondaryLabel = 'Demander un devis',
    secondaryHref = '/devis',
}: CtaBandProps) {
    return (
        <Section tone="dark" spacing="md">
            <div className="rounded-3xl border border-[var(--ivoire)]/15 bg-[radial-gradient(circle_at_top_right,rgba(202,157,68,0.25),transparent_45%)] p-6 md:p-10">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--ivoire)]/70">Prêt·e à lancer votre site ?</p>
                <h2 className="mt-3 text-4xl leading-tight md:text-5xl">{title}</h2>
                <p className="mt-4 max-w-2xl text-[var(--ivoire)]/80">{body}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={primaryHref}>{primaryLabel}</Button>
                    <Button href={secondaryHref} variant="secondary" className="border-[var(--ivoire)]/40 text-[var(--ivoire)] hover:bg-[var(--ivoire)]/10">
                        {secondaryLabel}
                    </Button>
                </div>
            </div>
        </Section>
    );
}
