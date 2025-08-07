'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface ValueCardProps {
    title: string;
    children: ReactNode;
    color: 'ormat' | 'sauge' | 'terracotta' | 'brun';
}

const colorMap = {
    ormat: 'border-ormat',
    sauge: 'border-sauge',
    terracotta: 'border-terracotta',
    brun: 'border-foreground',
};

export default function ValueCard({ title, children, color }: ValueCardProps) {
    return (
        <div className={clsx('bg-background rounded-xl border-[1.5px] px-6 py-8 w-full text-center transition duration-300', colorMap[color])}>
            <h3 className="text-base lg:text-xl font-bold tracking-wide md:tracking-widest pb-3 md:pb-4 lg:pb-6">{title}</h3>
            <p className="text-xs md:text-sm font-light">{children}</p>
        </div>
    );
}
