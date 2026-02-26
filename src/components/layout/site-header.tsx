import Link from 'next/link';
import { siteContent } from '@/content/site';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur">
            <Container className="flex items-center justify-between py-4">
                <Link href="/" className="focus-ring text-sm font-semibold tracking-wide">
                    {siteContent.brand}
                </Link>
                <nav className="hidden items-center gap-6 md:flex">
                    {siteContent.nav.map((item) => (
                        <Link key={item.href} href={item.href} className="focus-ring text-sm text-text-muted transition hover:text-text">
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <Button href={siteContent.ctaPrimary.href} variant="secondary" className="px-4 py-2 text-xs md:text-sm">
                    {siteContent.ctaPrimary.label}
                </Button>
            </Container>
        </header>
    );
}
