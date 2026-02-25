import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TocClient from '@/presentation/components/legal/TopClient';
import { Home, FileText, Link as IconLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Mentions légales',
    description: 'Éditeur du site, hébergeur, propriété intellectuelle, données personnelles, responsabilité et contact.',
    alternates: { canonical: '/mentions-legales' },
    openGraph: {
        title: 'Mentions légales',
        description: 'Éditeur, hébergeur, propriété intellectuelle, données personnelles et responsabilité.',
    },
};

// --------- Config & helpers (server-safe)
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'orangestreet@live.fr';
const LAST_UPDATE = '17/08/2025';
const lastUpdateISO = (() => {
    const m = LAST_UPDATE.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return m ? `${m[3]}-${m[2]}-${m[1]}` : '2025-08-17';
})();

const ORG = {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Alchimiste Créations',
    owner: process.env.NEXT_PUBLIC_SITE_OWNER || 'Stéphanie Vanoverberghe',
    legalForm: process.env.NEXT_PUBLIC_COMPANY_STATUS || 'Entreprise individuelle',
    shareCapital: process.env.NEXT_PUBLIC_COMPANY_CAPITAL || '',
    siren: process.env.NEXT_PUBLIC_COMPANY_SIREN || '',
    rcs: process.env.NEXT_PUBLIC_COMPANY_RCS || '',
    vat: process.env.NEXT_PUBLIC_COMPANY_VAT || '',
    address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '',
    city: process.env.NEXT_PUBLIC_COMPANY_CITY || '',
    country: process.env.NEXT_PUBLIC_COMPANY_COUNTRY || 'France',
    phone: process.env.NEXT_PUBLIC_PHONE || '',
};

const HOST = {
    name: process.env.NEXT_PUBLIC_HOST_NAME || '',
    address: process.env.NEXT_PUBLIC_HOST_ADDRESS || '',
    website: process.env.NEXT_PUBLIC_HOST_WEBSITE || '',
    phone: process.env.NEXT_PUBLIC_HOST_PHONE || '',
};

// Table des matières (sections)
const TOC = [
    { id: 'editeur', label: '1. Éditeur du site' },
    { id: 'hebergeur', label: '2. Hébergeur' },
    { id: 'contact', label: '3. Contact' },
    { id: 'propriete', label: '4. Propriété intellectuelle' },
    { id: 'donnees', label: '5. Données personnelles' },
    { id: 'cookies', label: '6. Cookies & consentement' },
    { id: 'responsabilite', label: '7. Responsabilité' },
    { id: 'credits', label: '8. Crédits' },
] as const;

// Titres H2 avec ancre
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <h2 id={id} className="group scroll-mt-24 text-xl md:text-2xl font-semibold text-terracotta">
        <a href={`#${id}`} className="inline-flex items-center gap-2">
            <span>{children}</span>
            <IconLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-foreground/60" aria-hidden />
        </a>
    </h2>
);

// Ligne d’infos en dl/dt/dd
function Row({ label, value }: { label: string; value?: string }) {
    if (!value) return null;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-3 py-1">
            <dt className="text-foreground/70">{label}</dt>
            <dd className="font-medium">{value}</dd>
        </div>
    );
}

export default function MentionsLegalesPage() {
    return (
        <section aria-labelledby="legals-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] bg-background">
            {/* Liséré haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" aria-hidden />
            {/* Fond or (mobile) */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" aria-hidden />
            {/* Vague décorative (md+) */}
            <div className="absolute inset-0 hidden md:block z-0" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>

            <div className="relative z-[1] max-w-6xl mx-auto space-y-8 md:space-y-10">
                {/* Breadcrumb cohérent */}
                <nav aria-label="Fil d’Ariane" className="text-sm">
                    <ol className="flex flex-wrap items-center gap-2 text-foreground/70">
                        <li className="inline-flex items-center gap-1">
                            <Home className="w-4 h-4" aria-hidden />
                            <Link href="/" className="underline underline-offset-4 hover:text-ormat">
                                Accueil
                            </Link>
                        </li>
                        <li aria-hidden className="opacity-60">
                            /
                        </li>
                        <li>
                            <span className="text-foreground">Mentions légales</span>
                        </li>
                    </ol>
                </nav>

                {/* En-tête */}
                <header className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <FileText className="w-3.5 h-3.5" aria-hidden />
                        Ressources & légal
                    </span>

                    <h1 id="legals-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Mentions légales
                    </h1>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Éditeur, hébergeur, propriété intellectuelle, données personnelles, responsabilité et crédits.
                    </p>

                    <p className="mt-1 text-xs text-foreground/60">
                        Dernière mise à jour : <time dateTime={lastUpdateISO}>{LAST_UPDATE}</time>
                    </p>
                </header>

                {/* Grille : Sommaire + contenu */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    {/* Sommaire (client) */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        <TocClient items={TOC} />
                    </div>

                    {/* Contenu principal */}
                    <article className="lg:col-span-8 xl:col-span-9 space-y-8">
                        <section id="editeur">
                            <H2 id="editeur">1. Éditeur du site</H2>
                            <dl className="mt-2">
                                <Row label="Dénomination" value={ORG.name} />
                                <Row label="Responsable de publication" value={ORG.owner} />
                                <Row label="Forme juridique" value={ORG.legalForm} />
                                <Row label="Capital social" value={ORG.shareCapital} />
                                <Row label="SIREN / SIRET" value={ORG.siren} />
                                <Row label="RCS" value={ORG.rcs} />
                                <Row label="TVA intracommunautaire" value={ORG.vat} />
                                <Row label="Adresse" value={[ORG.address, ORG.city, ORG.country].filter(Boolean).join(', ')} />
                                <Row label="Téléphone" value={ORG.phone} />
                                <Row label="E-mail" value={EMAIL} />
                            </dl>
                        </section>

                        <section id="hebergeur">
                            <H2 id="hebergeur">2. Hébergeur</H2>
                            <dl className="mt-2">
                                <Row label="Nom" value={HOST.name} />
                                <Row label="Adresse" value={HOST.address} />
                                <Row label="Site web" value={HOST.website} />
                                <Row label="Téléphone" value={HOST.phone} />
                            </dl>
                            {!HOST.name && (
                                <p className="text-xs text-foreground/60 mt-1">
                                    (Renseigne ton hébergeur dans les variables <code className="px-1 py-0.5 rounded bg-foreground/10">NEXT_PUBLIC_HOST_*</code>.)
                                </p>
                            )}
                        </section>

                        <section id="contact">
                            <H2 id="contact">3. Contact</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Pour toute question ou signalement, écris à{' '}
                                <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-ormat">
                                    {EMAIL}
                                </a>
                                .
                            </p>
                        </section>

                        <section id="propriete">
                            <H2 id="propriete">4. Propriété intellectuelle</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                L’ensemble des contenus du site (textes, visuels, éléments graphiques, logos, structure, code) est protégé par le droit d’auteur et les droits de
                                propriété intellectuelle. Toute reproduction, représentation, adaptation ou diffusion, totale ou partielle, sans autorisation écrite préalable est
                                interdite.
                            </p>
                        </section>

                        <section id="donnees">
                            <H2 id="donnees">5. Données personnelles</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Le traitement des données est détaillé dans la{' '}
                                <Link href="/politique-confidentialite" className="underline underline-offset-4 hover:text-ormat">
                                    Politique de confidentialité
                                </Link>{' '}
                                (finalités, base légale, durées, droits RGPD et modalités d’exercice).
                            </p>
                        </section>

                        <section id="cookies">
                            <H2 id="cookies">6. Cookies & consentement</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Tu peux gérer tes choix à tout moment depuis la page{' '}
                                <Link href="/preferences-cookies" className="underline underline-offset-4 hover:text-ormat">
                                    Préférences cookies
                                </Link>
                                . Certaines fonctionnalités (contenus tiers) ne se chargent qu’après consentement.
                            </p>
                        </section>

                        <section id="responsabilite">
                            <H2 id="responsabilite">7. Responsabilité</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                L’Éditeur met tout en œuvre pour assurer l’exactitude et la mise à jour des informations diffusées, sans garantir l’absence d’erreurs ou
                                d’omissions. L’utilisation du site se fait sous la responsabilité de l’Utilisateur. L’Éditeur ne saurait être tenu responsable des dommages
                                indirects ou de l’indisponibilité temporaire du service.
                            </p>
                        </section>

                        <section id="credits">
                            <H2 id="credits">8. Crédits</H2>
                            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm md:text-base text-foreground/80">
                                <li>Design & développement&nbsp;: {ORG.name}</li>
                                <li>Typographies & visuels&nbsp;: crédits indiqués le cas échéant.</li>
                            </ul>
                        </section>
                    </article>
                </div>

                {/* Bandeau liens utiles (cohérent) */}
                <div className="grid gap-2 sm:grid-cols-2 text-xs text-foreground/80">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2">
                        🔒 Voir la{' '}
                        <Link href="/politique-confidentialite" className="underline underline-offset-4 hover:text-ormat">
                            Politique de confidentialité
                        </Link>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-xl border border-terracotta/30 bg-terracotta/10 px-3 py-2">
                        ⚙️ Gérer mes{' '}
                        <Link href="/preferences-cookies" className="underline underline-offset-4 hover:text-ormat">
                            cookies & consentement
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
