import Link from 'next/link';
import { cn } from '@/shared/utils/cn';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-terracotta text-[var(--ivoire)] hover:bg-terracotta/90 focus-visible:ring-terracotta/40',
    secondary: 'bg-transparent border border-terracotta/50 text-terracotta hover:bg-terracotta/10 focus-visible:ring-terracotta/30',
    ghost: 'bg-transparent text-foreground hover:bg-foreground/5 focus-visible:ring-sauge/40',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-5 text-sm md:text-base',
    lg: 'h-12 px-6 text-base',
};

type BaseProps = {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
};

type LinkButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export function Button(props: LinkButtonProps | NativeButtonProps) {
    const { children, variant = 'primary', size = 'md', className } = props;
    const classes = cn(
        'inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variantClasses[variant],
        sizeClasses[size],
        className,
    );

    if ('href' in props && props.href) {
        const { href, ...linkProps } = props;
        return (
            <Link href={href} className={classes} {...linkProps}>
                {children}
            </Link>
        );
    }

    const { type = 'button', ...buttonProps } = props as NativeButtonProps;
    return (
        <button type={type} className={classes} {...buttonProps}>
            {children}
        </button>
    );
}
