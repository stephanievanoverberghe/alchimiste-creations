'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils'; // facultatif si tu utilises classnames conditionnelles

type ButtonProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export default function Button({ href, children, className }: ButtonProps) {
    return (
        <Link
            href={href}
            className={cn(
                'inline-block rounded-full border border-[#D5A85A] bg-[#A44B34] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-background shadow-md transition hover:scale-105 hover:shadow-lg',
                className
            )}
        >
            {children}
        </Link>
    );
}
