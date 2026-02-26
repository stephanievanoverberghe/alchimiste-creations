import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { siteContent } from '@/content/site';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer mt-20 border-t border-border/70 py-12">
            <Container className="space-y-10">
                <div className="grid gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-start">
                    <div className="space-y-4">
                        <p className="text-sm font-semibold tracking-wide text-text">{siteContent.brand}</p>
                        <p className="max-w-lg text-sm leading-relaxed text-text-muted">{siteContent.valueProposition}</p>
                        <div>
                            <Button href={siteContent.ctaPrimary.href} variant="primary" className="text-xs sm:text-sm">
                                {siteContent.ctaPrimary.label}
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2">
                        <nav aria-label="Navigation pied de page" className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Navigation</p>
                            <ul className="space-y-2">
                                {siteContent.nav.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} className="focus-ring site-footer__link text-sm text-text-muted">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <nav aria-label="Pages légales" className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Légal</p>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/mentions-legales" className="focus-ring site-footer__link text-sm text-text-muted">
                                        Mentions légales
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/politique-confidentialite" className="focus-ring site-footer__link text-sm text-text-muted">
                                        Politique de confidentialité
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="site-footer__bottom flex flex-col gap-3 border-t border-border/60 pt-5 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {year} {siteContent.brand}. Tous droits réservés.
                    </p>
                    <p>Freelance Next.js · Branding digital · Conversion & performance.</p>
                </div>
            </Container>
        </footer>
    );
}
