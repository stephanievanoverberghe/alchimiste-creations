'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduced(mq.matches);

        onChange();
        mq.addEventListener?.('change', onChange);
        return () => mq.removeEventListener?.('change', onChange);
    }, []);

    return reduced;
}

function useHideOnScroll() {
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const MIN_Y_TO_START = 24;
        const DELTA = 10;
        const HIDE_AFTER = 64;

        lastY.current = window.scrollY || 0;

        const update = () => {
            ticking.current = false;

            const y = window.scrollY || 0;
            const diff = y - lastY.current;

            if (y < MIN_Y_TO_START) {
                setHidden(false);
                lastY.current = y;
                return;
            }

            if (Math.abs(diff) < DELTA) return;

            if (diff > 0 && y > HIDE_AFTER) setHidden(true);

            if (diff < 0) setHidden(false);

            lastY.current = y;
        };

        const onScroll = () => {
            if (ticking.current) return;
            ticking.current = true;
            window.requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return hidden;
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
    const prefersReducedMotion = usePrefersReducedMotion();
    const shouldHide = useHideOnScroll();

    const left = ITEMS.slice(0, 2);
    const right = ITEMS.slice(2);

    type AnimState = 'shown' | 'showing' | 'hiding' | 'hidden';
    const [anim, setAnim] = useState<AnimState>('shown');
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

        if (prefersReducedMotion) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAnim(shouldHide ? 'hidden' : 'shown');
            return;
        }

        if (shouldHide) {
            if (anim === 'hidden' || anim === 'hiding') return;

            setAnim('hiding');
            timeoutRef.current = window.setTimeout(() => setAnim('hidden'), 240);
            return;
        }

        if (anim === 'shown' || anim === 'showing') return;

        setAnim('showing');
        timeoutRef.current = window.setTimeout(() => setAnim('shown'), 240);
    }, [shouldHide, prefersReducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

    const isInteractive = anim === 'shown' || anim === 'showing';
    const isGone = anim === 'hidden';

    return (
        <div
            className={cn(
                'fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden',
                'will-change-transform',
                prefersReducedMotion
                    ? isGone
                        ? 'opacity-0'
                        : 'opacity-100'
                    : anim === 'showing'
                      ? 'animate-[mobileNavIn_240ms_cubic-bezier(0.2,0.8,0.2,1)_both]'
                      : anim === 'hiding'
                        ? 'animate-[mobileNavOut_220ms_cubic-bezier(0.4,0,1,1)_both]'
                        : anim === 'hidden'
                          ? 'translate-y-[110%] opacity-0'
                          : 'translate-y-0 opacity-100',
            )}
            style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
            aria-hidden={!isInteractive}
        >
            <nav aria-label="Navigation mobile" className="mx-auto max-w-md">
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
