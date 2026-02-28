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
            <h2 className="typography-h2">{title}</h2>
            {description ? <p className="typography-body-lg">{description}</p> : null}
        </header>
    );
}
