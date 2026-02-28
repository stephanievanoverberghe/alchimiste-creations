'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BadgeEuro, HelpCircle, LayoutGrid, Layers3, Send, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Item = {
    href: string;
    label: string;
    icon: LucideIcon;
};

const ITEMS: Item[] = [
    { href: '/projets', label: 'Projets', icon: LayoutGrid },
    { href: '/offres', label: 'Offres', icon: BadgeEuro },
    { href: '/methode', label: 'Méthode', icon: Layers3 },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
];

const CTA: Item = { href: '/contact', label: 'Contact', icon: Send };

function isActive(pathname: string, href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ item, pathname }: { item: Item; pathname: string }) {
    const Icon = item.icon;
    const active = isActive(pathname, item.href);

    return (
        <Link
            href={item.href}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
            className={cn(
                'focus-ring relative flex h-14 w-full flex-col items-center justify-center gap-1 rounded-2xl px-1',
                'transition duration-(--motion-fast) ease-(--ease-standard) active:scale-[0.98]',
                'motion-reduce:transition-none motion-reduce:active:scale-100',
                active ? 'text-text' : 'text-text-muted hover:text-text',
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    'absolute top-2 h-1 w-1 rounded-full transition duration-(--motion-fast) ease-(--ease-standard)',
                    'motion-reduce:transition-none',
                    active ? 'bg-primary opacity-100' : 'bg-white/20 opacity-0',
                )}
            />

            <span
                aria-hidden="true"
                className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-2xl',
                    'transition duration-(--motion-fast) ease-(--ease-standard)',
                    'motion-reduce:transition-none',
                    active ? 'bg-white/6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]' : 'bg-transparent',
                )}
            >
                <Icon className="h-5 w-5" />
            </span>

            <span className={cn('text-[11px] font-semibold tracking-tight', active ? 'text-text' : 'text-text-muted')}>{item.label}</span>
        </Link>
    );
}

function Cta({ pathname }: { pathname: string }) {
    const Icon = CTA.icon;
    const active = isActive(pathname, CTA.href);

    return (
        <Link
            href={CTA.href}
            aria-label={CTA.label}
            aria-current={active ? 'page' : undefined}
            className={cn('focus-ring group relative -mt-8 inline-flex flex-col items-center justify-center gap-1', 'active:scale-[0.98] motion-reduce:active:scale-100')}
        >
            <span
                aria-hidden="true"
                className={cn('pointer-events-none absolute -z-10 h-18 w-18 rounded-full blur-2xl', active ? 'bg-primary/22' : 'bg-primary/16 opacity-80 group-hover:opacity-100')}
            />

            <span
                aria-hidden="true"
                className={cn(
                    'inline-flex h-15 w-15 items-center justify-center rounded-full border',
                    'bg-primary text-primary-foreground',
                    'border-white/10 shadow-[0_18px_45px_rgba(4,7,18,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset]',
                    'transition duration-(--motion-fast) ease-(--ease-standard)',
                    'motion-reduce:transition-none',
                    active
                        ? 'ring-2 ring-primary/40 shadow-[0_18px_45px_rgba(4,7,18,0.45),0_0_40px_rgba(122,84,255,0.28)]'
                        : 'group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_45px_rgba(4,7,18,0.45),0_0_48px_rgba(122,84,255,0.22)]',
                )}
            >
                <Icon className="h-6 w-6" />
            </span>

            <span className="text-[10px] font-semibold tracking-wide text-text">{CTA.label}</span>
        </Link>
    );
}

export function MobileBottomNav() {
    const pathname = usePathname();

    const left = ITEMS.slice(0, 2);
    const right = ITEMS.slice(2);

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden">
            <nav aria-label="Navigation mobile" className="pointer-events-auto mx-auto max-w-md">
                <div className={cn('relative rounded-4xl border border-border/70', 'bg-surface/70 backdrop-blur-xl', 'shadow-[0_22px_60px_rgba(4,7,18,0.62)]')}>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/22 to-transparent" />
                    <div aria-hidden="true" className="pointer-events-none absolute -inset-x-6 -top-10 h-24 bg-radial from-primary/10 via-transparent to-transparent blur-2xl" />
                    <div aria-hidden="true" className="pointer-events-none absolute -inset-x-6 -bottom-12 h-24 bg-radial from-accent/8 via-transparent to-transparent blur-2xl" />
                    <div className="grid grid-cols-5 items-end gap-1 px-2 pb-2 pt-3">
                        {left.map((item) => (
                            <NavLink key={item.href} item={item} pathname={pathname} />
                        ))}

                        <div className="flex justify-center">
                            <Cta pathname={pathname} />
                        </div>

                        {right.map((item) => (
                            <NavLink key={item.href} item={item} pathname={pathname} />
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
}
