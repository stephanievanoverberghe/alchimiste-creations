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

    return (
        <header
            className={cn(
                'site-header sticky top-0 z-40 transition-all duration-[var(--motion-base)] ease-[var(--ease-standard)]',
                scrolled ? 'site-header--scrolled' : 'site-header--top',
            )}
        >
            <Container className="flex items-center justify-between py-3 md:py-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="focus-ring site-header__brand" aria-label={siteContent.brand}>
                        <span className="site-header__brandMark" aria-hidden="true" />
                        <span className="text-sm font-semibold tracking-wide">{siteContent.brand}</span>
                    </Link>

                    <span className="hidden text-xs text-text-muted md:inline">{/* micro preuve “douce” */}1 projet / mois · réponse sous 48h</span>
                </div>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-6 md:flex" aria-label="Navigation principale">
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

                <div className="flex items-center gap-2">
                    {/* Secondary CTA desktop only (évite surcharge mobile) */}
                    <Link href={siteContent.ctaSecondary.href} className="focus-ring hidden rounded-xl px-3 py-2 text-xs text-text-muted transition hover:text-text md:inline-flex">
                        {siteContent.ctaSecondary.label}
                    </Link>

                    <Button href={siteContent.ctaPrimary.href} variant="secondary" className="px-4 py-2 text-xs md:text-sm">
                        {siteContent.ctaPrimary.label}
                    </Button>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="focus-ring md:hidden rounded-xl px-3 py-2 text-xs text-text-muted hover:text-text"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        Menu
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
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        'focus-ring rounded-xl px-3 py-3 text-sm transition',
                                        isActive ? 'bg-surface-elevated text-text' : 'text-text-muted hover:text-text',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <div className="pt-2">
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
