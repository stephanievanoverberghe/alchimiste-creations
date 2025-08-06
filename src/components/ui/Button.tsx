'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export default function Button({ className, children, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta/90 cursor-pointer text-background text-sm font-semibold tracking-widest uppercase transition hover:scale-105',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
