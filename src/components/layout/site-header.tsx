'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/content/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    React.useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn('site-header sticky top-0 z-40 transition-all duration-(--motion-base) ease-(--ease-standard)', scrolled ? 'site-header--scrolled' : 'site-header--top')}
        >
            <Container className="grid grid-cols-[1fr_auto] items-center gap-3 py-3 md:grid-cols-[auto_1fr_auto] md:gap-4 md:py-4">
                <div className="flex items-center gap-3 md:gap-4">
                    <Link href="/" className="focus-ring site-header__brand" aria-label={siteContent.brand}>
                        <span className="site-header__brandMark" aria-hidden="true" />
                        <span className="text-sm font-semibold tracking-wide md:text-base">{siteContent.brand}</span>
                    </Link>
                </div>

                {/* Tablet + desktop nav */}
                <nav className="site-header__nav hidden items-center justify-center md:flex" aria-label="Navigation principale">
                    {siteContent.nav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn('focus-ring site-header__link', isActive ? 'site-header__link--active' : 'site-header__link--idle')}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center justify-end gap-2">
                    {/* Secondary CTA desktop only (évite surcharge mobile) */}
                    <Link href={siteContent.ctaSecondary.href} className="focus-ring hidden rounded-xl px-3 py-2 text-xs text-text-muted transition hover:text-text lg:inline-flex">
                        {siteContent.ctaSecondary.label}
                    </Link>

                    <Button href={siteContent.ctaPrimary.href} variant="secondary" className="site-header__primaryCta hidden px-4 py-2 text-xs sm:inline-flex md:text-sm">
                        {siteContent.ctaPrimary.label}
                    </Button>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className={cn('focus-ring site-header__menuButton md:hidden', open ? 'site-header__menuButton--open' : '')}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className="sr-only">Ouvrir le menu</span>
                        <span className="site-header__menuLines" aria-hidden="true" />
                    </button>
                </div>
            </Container>

            {/* Mobile drawer */}
            <div id="mobile-menu" className={cn('md:hidden site-mobile', open ? 'site-mobile--open' : 'site-mobile--closed')}>
                <Container className="py-3">
                    <nav className="grid gap-2" aria-label="Navigation mobile">
                        {siteContent.nav.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'focus-ring rounded-2xl px-3 py-3 text-sm transition',
                                        isActive ? 'bg-surface-elevated text-text shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]' : 'text-text-muted hover:text-text',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <Link
                            href={siteContent.ctaSecondary.href}
                            className="focus-ring rounded-2xl px-3 py-3 text-sm text-text-muted transition hover:bg-surface-elevated/40 hover:text-text sm:hidden"
                        >
                            {siteContent.ctaSecondary.label}
                        </Link>
                        <div className="pt-2 sm:hidden">
                            <Button href={siteContent.ctaPrimary.href} variant="primary" className="w-full">
                                {siteContent.ctaPrimary.label}
                            </Button>
                        </div>
                    </nav>
                </Container>
            </div>
        </header>
    );
}
