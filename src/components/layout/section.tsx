import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type SectionProps = {
    id?: string;
    children: ReactNode;
    className?: string;
};

export function Section({ id, children, className }: SectionProps) {
    return (
        <section id={id} className={cn('py-[var(--space-section-y)]', className)}>
            {children}
        </section>
    );
}
