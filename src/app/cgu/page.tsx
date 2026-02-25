// app/cgu/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TocClient from '@/presentation/components/legal/TopClient';
import { Home, ScrollText, Link as IconLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Conditions générales d’utilisation (CGU)',
    description:
        'Conditions générales d’utilisation du site Alchimiste Créations : accès, responsabilité, propriété intellectuelle, données personnelles, cookies, droit applicable.',
    alternates: { canonical: '/cgu' },
    openGraph: {
        title: 'Conditions générales d’utilisation (CGU)',
        description: 'Accès, responsabilité, propriété intellectuelle, données personnelles, cookies, droit applicable.',
    },
};

// ------- Config (server-safe)
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'orangestreet@live.fr';
const LAST_UPDATE = '17/08/2025';
const lastUpdateISO = (() => {
    const m = LAST_UPDATE.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return m ? `${m[3]}-${m[2]}-${m[1]}` : '2025-08-17';
})();

// Table des matières
const TOC = [
    { id: 'objet', label: '1. Objet & champ d’application' },
    { id: 'definitions', label: '2. Définitions' },
    { id: 'acces', label: '3. Accès au site' },
    { id: 'utilisation', label: '4. Règles d’utilisation' },
    { id: 'propriete', label: '5. Propriété intellectuelle' },
    { id: 'contenus-tiers', label: '6. Liens & contenus tiers' },
    { id: 'donnees', label: '7. Données personnelles' },
    { id: 'cookies', label: '8. Cookies & consentement' },
    { id: 'securite', label: '9. Sécurité' },
    { id: 'disponibilite', label: '10. Disponibilité du service' },
    { id: 'responsabilite', label: '11. Responsabilité' },
    { id: 'modifs', label: '12. Modifications des CGU' },
    { id: 'droit', label: '13. Droit applicable' },
    { id: 'contact', label: '14. Contact' },
] as const;

// Titre H2 avec ancre
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <h2 id={id} className="group scroll-mt-24 text-xl md:text-2xl font-semibold text-terracotta">
        <a href={`#${id}`} className="inline-flex items-center gap-2">
            <span>{children}</span>
            <IconLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-foreground/60" aria-hidden />
        </a>
    </h2>
);

export default function CguPage() {
    return (
        <section aria-labelledby="cgu-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] bg-background">
            {/* Liseré haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" aria-hidden />
            {/* Fond mobile léger */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" aria-hidden />
            {/* Vague décorative md+ */}
            <div className="absolute inset-0 hidden md:block z-0" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>

            <div className="relative z-[1] max-w-6xl mx-auto space-y-8 md:space-y-10">
                {/* Breadcrumb */}
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
                            <span className="text-foreground">CGU</span>
                        </li>
                    </ol>
                </nav>

                {/* En-tête */}
                <header className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <ScrollText className="w-3.5 h-3.5" aria-hidden />
                        Conditions générales d’utilisation
                    </span>

                    <h1 id="cgu-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        CGU — Alchimiste Créations
                    </h1>

                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Les présentes conditions régissent l’utilisation du site. En naviguant, tu acceptes ces CGU.
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

                    {/* Corps des CGU */}
                    <article className="lg:col-span-8 xl:col-span-9 space-y-8">
                        <section id="objet">
                            <H2 id="objet">1. Objet &amp; champ d’application</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Les présentes conditions générales d’utilisation (CGU) encadrent l’accès et l’usage du site <strong>Alchimiste Créations</strong> (ci-après « le
                                Site »). Toute consultation ou utilisation implique l’acceptation pleine et entière des CGU.
                            </p>
                        </section>

                        <section id="definitions">
                            <H2 id="definitions">2. Définitions</H2>
                            <dl className="mt-2 text-sm md:text-base text-foreground/80">
                                <dt className="font-semibold">Site</dt>
                                <dd className="mb-2">Ensemble des pages et contenus accessibles à l’adresse du domaine.</dd>
                                <dt className="font-semibold">Utilisateur</dt>
                                <dd className="mb-2">Toute personne qui accède au Site.</dd>
                                <dt className="font-semibold">Éditeur</dt>
                                <dd>La personne ou entité exploitant le Site (« Alchimiste Créations »).</dd>
                            </dl>
                        </section>

                        <section id="acces">
                            <H2 id="acces">3. Accès au site</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Le Site est accessible 24/7, sous réserve d’interruptions planifiées ou non pour maintenance, mise à jour ou cas de force majeure. L’accès est
                                gratuit, hors coûts de connexion qui restent à la charge de l’Utilisateur.
                            </p>
                        </section>

                        <section id="utilisation">
                            <H2 id="utilisation">4. Règles d’utilisation</H2>
                            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm md:text-base text-foreground/80">
                                <li>ne pas altérer le bon fonctionnement du Site ;</li>
                                <li>ne pas porter atteinte à la sécurité (tentatives d’intrusion, etc.) ;</li>
                                <li>ne pas extraire ou réutiliser de manière substantielle les contenus sans autorisation ;</li>
                                <li>fournir des informations exactes lors de l’envoi de formulaires.</li>
                            </ul>
                        </section>

                        <section id="propriete">
                            <H2 id="propriete">5. Propriété intellectuelle</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Sauf mention contraire, les contenus (textes, visuels, interfaces, marques, logos) sont protégés et demeurent la propriété de l’Éditeur ou de ses
                                partenaires. Toute reproduction, adaptation ou représentation, totale ou partielle, sans autorisation écrite préalable, est interdite.
                            </p>
                        </section>

                        <section id="contenus-tiers">
                            <H2 id="contenus-tiers">6. Liens &amp; contenus tiers</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Le Site peut intégrer des services tiers (ex. prise de rendez-vous via Calendly) ou proposer des liens externes. L’Éditeur n’est pas responsable des
                                contenus ou pratiques de ces services. Leur usage est soumis à leurs propres conditions.
                            </p>
                        </section>

                        <section id="donnees">
                            <H2 id="donnees">7. Données personnelles</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Le traitement des données est décrit dans la{' '}
                                <Link href="/politique-confidentialite" className="underline underline-offset-4 hover:text-ormat">
                                    Politique de confidentialité
                                </Link>
                                . Elle précise les finalités, la base légale, la durée de conservation et tes droits (accès, rectification, effacement, opposition, limitation,
                                portabilité).
                            </p>
                        </section>

                        <section id="cookies">
                            <H2 id="cookies">8. Cookies &amp; consentement</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Le Site utilise des cookies et technologies similaires. Tu peux gérer tes préférences à tout moment depuis la page{' '}
                                <Link href="/preferences-cookies" className="underline underline-offset-4 hover:text-ormat">
                                    Cookies / préférences
                                </Link>
                                . Certaines fonctionnalités ne se chargent qu’après consentement (ex. contenus tiers).
                            </p>
                        </section>

                        <section id="securite">
                            <H2 id="securite">9. Sécurité</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                L’Éditeur met en œuvre des moyens raisonnables pour protéger le Site. L’Utilisateur est invité à signaler toute vulnérabilité présumée en écrivant à{' '}
                                <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-ormat">
                                    {EMAIL}
                                </a>
                                .
                            </p>
                        </section>

                        <section id="disponibilite">
                            <H2 id="disponibilite">10. Disponibilité du service</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                L’Éditeur s’efforce de maintenir un niveau de disponibilité normal. Des interruptions temporaires peuvent survenir sans préavis pour raisons
                                techniques.
                            </p>
                        </section>

                        <section id="responsabilite">
                            <H2 id="responsabilite">11. Responsabilité</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                L’utilisation du Site se fait aux risques de l’Utilisateur. Le Site est fourni « en l’état ». L’Éditeur ne saurait être tenu responsable des
                                dommages indirects, pertes de données, défauts de compatibilité ou indisponibilités temporaires.
                            </p>
                        </section>

                        <section id="modifs">
                            <H2 id="modifs">12. Modifications des CGU</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                L’Éditeur peut modifier les présentes CGU à tout moment. La date de mise à jour fait foi. La poursuite de la navigation vaut acceptation des CGU
                                modifiées.
                            </p>
                        </section>

                        <section id="droit">
                            <H2 id="droit">13. Droit applicable</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Les CGU sont soumises au droit français. En l’absence de résolution amiable, les tribunaux compétents seront ceux du siège de l’Éditeur.
                            </p>
                        </section>

                        <section id="contact">
                            <H2 id="contact">14. Contact</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Pour toute question concernant ces CGU :{' '}
                                <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-ormat">
                                    {EMAIL}
                                </a>
                                .
                            </p>
                        </section>
                    </article>
                </div>

                {/* Bandeau liens utiles (cohérent avec les autres pages) */}
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
