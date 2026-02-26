'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/content/site';
import { cn } from '@/lib/utils';
import { useSiteHeaderState } from '@/components/layout/use-site-header-state';

type HeaderNavLinkProps = {
    href: string;
    label: string;
    isActive: boolean;
    onLinkRef?: (element: HTMLAnchorElement | null) => void;
};

function HeaderNavLink({ href, label, isActive, onLinkRef }: HeaderNavLinkProps) {
    return (
        <Link ref={onLinkRef} href={href} className={cn('focus-ring site-header__link', isActive ? 'site-header__link--active' : 'site-header__link--idle')}>
            {label}
        </Link>
    );
}

function MobileMenu({ pathname, open, isCompact }: { pathname: string; open: boolean; isCompact: boolean }) {
    if (!isCompact) {
        return null;
    }

    const hasSecondaryCtaInNav = siteContent.nav.some((item) => item.href === siteContent.ctaSecondary.href);

    return (
        <div id="mobile-menu" className={cn('site-mobile', open ? 'site-mobile--open' : 'site-mobile--closed')}>
            <Container className="site-mobile__inner">
                <nav className="grid gap-2" aria-label="Navigation mobile">
                    {siteContent.nav.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{ animationDelay: `${index * 50}ms` }}
                                className={cn(
                                    'focus-ring site-mobile__link rounded-2xl px-3 py-3 text-sm transition',
                                    isActive ? 'bg-surface-elevated text-text shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]' : 'text-text-muted hover:text-text',
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    {!hasSecondaryCtaInNav ? (
                        <Link
                            href={siteContent.ctaSecondary.href}
                            className="focus-ring site-mobile__link rounded-2xl px-3 py-3 text-sm text-text-muted transition hover:bg-surface-elevated/40 hover:text-text sm:hidden"
                        >
                            {siteContent.ctaSecondary.label}
                        </Link>
                    ) : null}
                    <div className="site-mobile__link pt-2 sm:hidden">
                        <Button href={siteContent.ctaPrimary.href} variant="primary" className="w-full">
                            {siteContent.ctaPrimary.label}
                        </Button>
                    </div>
                </nav>
            </Container>
        </div>
    );
}

export function SiteHeader() {
    const pathname = usePathname();
    const { hidden, isCompact, open, scrolled, toggleOpen } = useSiteHeaderState(pathname);
    const hasSecondaryCtaInNav = siteContent.nav.some((item) => item.href === siteContent.ctaSecondary.href);
    const navRef = useRef<HTMLElement | null>(null);
    const indicatorRef = useRef<HTMLSpanElement | null>(null);
    const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

    const activeNavHref = useMemo(() => siteContent.nav.find((item) => item.href === pathname)?.href ?? null, [pathname]);

    const updateActiveIndicator = useCallback(() => {
        const indicatorElement = indicatorRef.current;

        if (!indicatorElement || isCompact || !activeNavHref) {
            indicatorElement?.classList.remove('site-header__activeIndicator--visible');
            return;
        }

        const navElement = navRef.current;
        const activeLink = navLinkRefs.current[activeNavHref];

        if (!navElement || !activeLink) {
            indicatorElement.classList.remove('site-header__activeIndicator--visible');
            return;
        }

        const navRect = navElement.getBoundingClientRect();
        const activeRect = activeLink.getBoundingClientRect();

        indicatorElement.style.width = `${activeRect.width}px`;
        indicatorElement.style.transform = `translateX(${activeRect.left - navRect.left}px)`;
        indicatorElement.classList.add('site-header__activeIndicator--visible');
    }, [activeNavHref, isCompact]);

    useEffect(() => {
        const rafId = window.requestAnimationFrame(updateActiveIndicator);

        window.addEventListener('resize', updateActiveIndicator);
        return () => {
            window.cancelAnimationFrame(rafId);
            window.removeEventListener('resize', updateActiveIndicator);
        };
    }, [updateActiveIndicator]);

    return (
        <header
            className={cn(
                'site-header sticky top-0 z-40 transition-all duration-(--motion-base) ease-(--ease-standard)',
                scrolled ? 'site-header--scrolled' : 'site-header--top',
                hidden && !open ? 'site-header--hidden' : 'site-header--visible',
            )}
        >
            <Container
                className={cn(
                    'site-header__inner grid items-center gap-3',
                    isCompact ? 'grid-cols-[1fr_auto]' : 'grid-cols-[auto_1fr_auto] md:gap-4',
                    open && 'site-header__inner--menuOpen',
                )}
            >
                <div className="flex items-center gap-3 md:gap-4">
                    <Link href="/" className="focus-ring site-header__brand" aria-label={siteContent.brand}>
                        <span className="site-header__brandMark" aria-hidden="true" />
                        <span className="text-sm font-semibold tracking-wide md:text-base">{siteContent.brand}</span>
                    </Link>
                </div>

                {!isCompact ? (
                    <nav ref={navRef} className="site-header__nav flex items-center justify-center" aria-label="Navigation principale">
                        <span ref={indicatorRef} aria-hidden="true" className="site-header__activeIndicator" />
                        {siteContent.nav.map((item) => (
                            <HeaderNavLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                isActive={pathname === item.href}
                                onLinkRef={(element) => {
                                    navLinkRefs.current[item.href] = element;
                                }}
                            />
                        ))}
                    </nav>
                ) : null}

                <div className="flex items-center justify-end gap-2">
                    {!hasSecondaryCtaInNav ? (
                        <Link
                            href={siteContent.ctaSecondary.href}
                            className={cn(
                                'focus-ring rounded-xl px-3 py-2 text-xs text-text-muted transition hover:text-text',
                                isCompact ? 'hidden sm:inline-flex' : 'inline-flex',
                            )}
                        >
                            {siteContent.ctaSecondary.label}
                        </Link>
                    ) : null}

                    <Button
                        href={siteContent.ctaPrimary.href}
                        variant="secondary"
                        className={cn('site-header__primaryCta px-4 py-2 text-xs md:text-sm', isCompact ? 'hidden sm:inline-flex' : 'inline-flex')}
                    >
                        {siteContent.ctaPrimary.label}
                    </Button>

                    {isCompact ? (
                        <button
                            type="button"
                            className={cn('focus-ring site-header__menuButton', open ? 'site-header__menuButton--open' : '')}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                            onClick={toggleOpen}
                        >
                            <span className="site-header__menuLines" aria-hidden="true" />
                        </button>
                    ) : null}
                </div>
            </Container>

            <MobileMenu pathname={pathname} open={open} isCompact={isCompact} />
        </header>
    );
}
