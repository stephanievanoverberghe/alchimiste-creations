import { cn } from '@/lib/utils';
import { type CSSProperties, type ReactNode } from 'react';

export function Card({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
    return (
        <article className={cn('glass rounded-lg p-6 md:p-8', className)} style={style}>
            {children}
        </article>
    );
}
