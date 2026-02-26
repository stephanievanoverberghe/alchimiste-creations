import Link from 'next/link';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    href?: string;
    variant?: 'primary' | 'secondary' | 'ghost';
    className?: string;
};

const base =
    'focus-ring inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-[var(--motion-base)] ease-[var(--ease-standard)]';

const variants = {
    primary: 'bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:brightness-110',
    secondary: 'glass text-text hover:border-primary/60 hover:text-white',
    ghost: 'text-text-muted hover:text-text',
};

export function Button({ children, href, variant = 'primary', className }: ButtonProps) {
    const classes = cn(base, variants[variant], className);
    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }
    return <button className={classes}>{children}</button>;
}
