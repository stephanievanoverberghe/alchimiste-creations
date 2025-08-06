'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: '/a-propos', label: 'Me découvrir' },
    { href: '/offres', label: 'Créer ensemble' },
    { href: '/methode', label: 'Ma manière de faire' },
    { href: '/projets', label: 'Projets vivants' },
];

// pages sans background décoratif
const simplePages = ['/mentions-legales', '/politique-confidentialite', '/cgu', '/faq'];

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const isSimplePage = simplePages.includes(pathname);

    return (
        <header
            className={cn(
                'w-full px-6 py-4 flex items-center justify-between text-background font-body md:px-8 lg:px-[100px] xl:px-[150px] transition-colors duration-300',
                isSimplePage && 'bg-foreground'
            )}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 z-50">
                <Image src="/logo-sceau.png" alt="Logo Alchimiste" width={60} height={60} className="h-14 w-14 object-contain" priority />
            </Link>

            {/* Burger icon */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden z-50">
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile menu */}
            <nav
                className={cn(
                    'fixed inset-0 bg-foreground text-background flex flex-col items-center justify-center gap-8 text-lg font-semibold transition-transform duration-300 z-40',
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn('tracking-wider transition-colors duration-300 hover:text-ormat', pathname === link.href && 'text-ormat')}
                    >
                        {link.label}
                    </Link>
                ))}

                <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-4 px-6 py-2 border border-ormat text-ormat rounded-xl text-sm transition duration-300 hover:bg-ormat hover:text-foreground"
                >
                    Entrer en lien
                </Link>
            </nav>

            {/* Desktop nav */}
            <nav className="hidden lg:flex gap-6 text-sm">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn('tracking-widest font-bold transition-colors duration-300 hover:text-ormat p-0.5', pathname === link.href && 'text-ormat after:w-full')}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Desktop CTA */}
            <Link
                href="/contact"
                className="hidden tracking-widest lg:inline-block px-4 py-2 rounded-xl border border-ormat text-ormat font-semibold text-sm transition-colors duration-300 hover:bg-ormat hover:text-foreground"
            >
                Entrer en lien
            </Link>
        </header>
    );
}
