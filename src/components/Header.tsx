'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: '/a-propos', label: 'Me découvrir' },
    { href: '/offres', label: 'Créer ensemble' },
    { href: '/methode', label: 'Mon approche' },
    { href: '/projets', label: 'Projets vivants' },
];

const simplePages = ['/mentions-legales', '/politique-confidentialite', '/cgu', '/faq', '/preferences-cookies'];

const ctaClasses = 'tracking-widest px-4 py-2 rounded-xl border border-ormat text-ormat font-semibold text-sm transition-colors duration-300 hover:bg-ormat hover:text-foreground';

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    // Pages simples + slugs offres
    const isSimplePage = simplePages.includes(pathname);

    // Fermeture avec Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <header
            className={cn(
                'z-50 w-full h-20 md:h-24 px-6 md:px-8 lg:px-[100px] xl:px-[150px] flex items-center justify-between font-body transition-colors duration-300',
                isSimplePage ? 'bg-foreground text-background shadow-sm' : 'absolute top-0 left-0 text-background'
            )}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 z-50" onClick={() => setMenuOpen(false)}>
                <Image src="/logo-sceau.png" alt="Logo Alchimiste" width={60} height={60} priority sizes="(max-width: 768px) 56px, 60px" className="h-14 w-14 object-contain" />
            </Link>

            {/* Burger icon */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden z-50" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen}>
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile menu */}
            <nav
                className={cn(
                    'fixed inset-0 bg-foreground/95 backdrop-blur text-background flex flex-col items-center justify-center gap-8 text-lg font-semibold transition-transform duration-300 z-40',
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href === '/offres' && pathname.startsWith('/offres/'));

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn('tracking-wider transition-colors duration-300 hover:text-ormat', isActive && 'text-ormat')}
                        >
                            {link.label}
                        </Link>
                    );
                })}

                <Link href="/contact" onClick={() => setMenuOpen(false)} className={ctaClasses}>
                    Entrer en lien
                </Link>
            </nav>

            {/* Desktop nav */}
            <nav className="hidden lg:flex gap-6 text-sm">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href === '/offres' && pathname.startsWith('/offres/'));

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'tracking-widest font-bold relative transition-colors duration-300 hover:text-ormat p-0.5',
                                isActive &&
                                    "text-ormat after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-ormat after:transition-all after:duration-300"
                            )}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Desktop CTA */}
            <Link href="/contact" className={`hidden lg:inline-block ${ctaClasses}`}>
                Entrer en lien
            </Link>
        </header>
    );
}
