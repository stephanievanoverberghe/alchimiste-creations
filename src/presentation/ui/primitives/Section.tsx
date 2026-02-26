import { cn } from '@/shared/utils/cn';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SectionTone = 'light' | 'accent' | 'dark';
type SectionSpacing = 'sm' | 'md' | 'lg';

const toneClasses: Record<SectionTone, string> = {
    light: 'bg-[var(--ivoire)] text-foreground',
    accent: 'bg-sauge/15 text-foreground',
    dark: 'bg-[var(--ardoise)] text-[var(--ivoire)]',
};

const spacingClasses: Record<SectionSpacing, string> = {
    sm: 'py-10 md:py-14',
    md: 'py-14 md:py-20',
    lg: 'py-20 md:py-28',
};

export type SectionProps = ComponentPropsWithoutRef<'section'> & {
    children: ReactNode;
    tone?: SectionTone;
    spacing?: SectionSpacing;
    withContainer?: boolean;
};

export function Container({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
    return <div className={cn('mx-auto w-full max-w-300 px-6 md:px-8 lg:px-10', className)} {...props} />;
}

export function Section({ children, className, tone = 'light', spacing = 'md', withContainer = true, ...props }: SectionProps) {
    return (
        <section className={cn(toneClasses[tone], spacingClasses[spacing], className)} {...props}>
            {withContainer ? <Container>{children}</Container> : children}
        </section>
    );
}
