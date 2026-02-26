import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { siteContent } from '@/content/site';
import { absoluteUrl, personJsonLd, serviceJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
    metadataBase: new URL(absoluteUrl()),
    title: {
        default: `${siteContent.brand} — ${siteContent.baseline}`,
        template: `%s | ${siteContent.brand}`,
    },
    description: siteContent.valueProposition,
    openGraph: {
        title: siteContent.brand,
        description: siteContent.valueProposition,
        url: absoluteUrl(),
        siteName: siteContent.brand,
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteContent.brand,
        description: siteContent.valueProposition,
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr">
            <body>
                <a href="#main" className="skip-link focus-ring rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground">
                    Aller au contenu
                </a>
                <SiteHeader />
                <main id="main">{children}</main>
                <SiteFooter />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }} />
            </body>
        </html>
    );
}
