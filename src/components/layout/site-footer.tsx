import Link from 'next/link';
import { Container } from '@/components/layout/container';

export function SiteFooter() {
    return (
        <footer className="border-t border-border/70 py-10">
            <Container className="flex flex-col gap-4 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
                <p>© {new Date().getFullYear()} Alchimiste Créations. Tous droits réservés.</p>
                <div className="flex gap-4">
                    <Link href="/mentions-legales" className="focus-ring hover:text-text">
                        Mentions légales
                    </Link>
                    <Link href="/politique-confidentialite" className="focus-ring hover:text-text">
                        Confidentialité
                    </Link>
                </div>
            </Container>
        </footer>
    );
}
