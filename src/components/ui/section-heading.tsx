import { Badge } from '@/components/ui/badge';

type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
    return (
        <header className="mb-8 max-w-3xl space-y-4 md:mb-12">
            {eyebrow ? <Badge>{eyebrow}</Badge> : null}
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
            {description ? <p className="text-pretty text-base text-text-muted md:text-lg">{description}</p> : null}
        </header>
    );
}
