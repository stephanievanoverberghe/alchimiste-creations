import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
    return <article className={cn('glass rounded-[var(--radius-lg)] p-6 md:p-8', className)}>{children}</article>;
}
