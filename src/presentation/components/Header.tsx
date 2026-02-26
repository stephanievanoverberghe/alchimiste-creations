'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/utils/cn';
import { Menu, X } from 'lucide-react';
import { headerCopy } from '@/infrastructure/content/layout-copy';

const ctaClasses =
    'tracking-widest px-5 py-2.5 rounded-2xl bg-terracotta text-background font-semibold text-sm ' +
    'border-b-2 border-r-2 border-ormat transition hover:bg-terracotta/90 hover:scale-[1.02] ' +
    'shadow-[0px_2px_6px_rgba(164,75,52,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40';

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isSimplePage = headerCopy.simplePages.includes(pathname);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const headerBase = 'z-50 w-full h-20 md:h-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px] flex items-center justify-between font-body transition-colors duration-300';

    const headerVisual = isSimplePage
        ? 'text-background absolute top-0 left-0 lg:relative lg:bg-foreground lg:text-background lg:shadow-sm'
        : scrolled
          ? 'text-background absolute top-0 left-0 lg:fixed lg:top-0 lg:left-0 lg:bg-foreground/60 lg:backdrop-blur lg:supports-[backdrop-filter]:bg-foreground/80'
          : 'text-background absolute top-0 left-0';

    return (
        <header className={cn(headerBase, headerVisual)}>
            <Link
                href="/"
                className="flex items-center gap-2 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 rounded-xl"
                onClick={() => setMenuOpen(false)}
                aria-label={headerCopy.logoAriaLabel}
            >
                <Image src="/logo-sceau.png" alt={headerCopy.logoAlt} width={60} height={60} priority sizes="(max-width: 768px) 56px, 60px" className="h-14 w-14 object-contain" />
            </Link>

            <button
                onClick={() => setMenuOpen((v) => !v)}
                className="lg:hidden z-50 rounded-xl p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40"
                aria-label={menuOpen ? headerCopy.closeMenuAriaLabel : headerCopy.openMenuAriaLabel}
                aria-expanded={menuOpen}
            >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <nav
                className={cn(
                    'fixed inset-0 bg-foreground/95 backdrop-blur text-background flex flex-col items-center justify-center gap-8 text-lg font-semibold transition-transform duration-300 z-40',
                    menuOpen ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                {headerCopy.navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href === '/offres' && pathname.startsWith('/offres/'));
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                'tracking-wider transition-colors duration-300 hover:text-ormat focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 rounded-xl px-1.5',
                                isActive && 'text-ormat',
                            )}
                        >
                            {link.label}
                        </Link>
                    );
                })}
                <Link href="/devis" onClick={() => setMenuOpen(false)} className={ctaClasses}>
                    {headerCopy.mobileCtaLabel}
                </Link>
            </nav>

            <nav className="hidden lg:flex gap-6 text-sm">
                {headerCopy.navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href === '/offres' && pathname.startsWith('/offres/'));
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                'tracking-widest font-bold relative transition-colors duration-300 hover:text-ormat p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/30 rounded',
                                isActive &&
                                    "text-ormat after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-ormat after:transition-all after:duration-300",
                            )}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <Link href="/devis" className={cn('hidden lg:inline-block', ctaClasses)}>
                {headerCopy.desktopCtaLabel}
            </Link>
        </header>
    );
}
