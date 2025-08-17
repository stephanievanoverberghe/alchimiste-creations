'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ShieldCheck, Home, ExternalLink, Link as IconLink } from 'lucide-react';

// Table des matières (stable hors composant)
const TOC_ITEMS = [
    { id: 'intro', label: '1. Qui traite vos données ?' },
    { id: 'collecte', label: '2. Quelles données sont collectées ?' },
    { id: 'finalites', label: '3. Finalités & bases légales' },
    { id: 'destinataires', label: '4. Destinataires & sous-traitants' },
    { id: 'transferts', label: '5. Transferts hors UE' },
    { id: 'conservation', label: '6. Durées de conservation' },
    { id: 'droits', label: '7. Vos droits (RGPD)' },
    { id: 'cookies', label: '8. Cookies & consentement' },
    { id: 'securite', label: '9. Sécurité' },
    { id: 'contact', label: '10. Contact' },
    { id: 'maj', label: '11. Mises à jour' },
] as const;

export default function PrivacyPolicyPage() {
    // ------- Config dynamique (fallbacks sûrs)
    const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'orangestreet@live.fr';
    const HOST_NAME = process.env.NEXT_PUBLIC_HOST_NAME || 'Vercel Inc.';
    const HOST_ADDRESS = process.env.NEXT_PUBLIC_HOST_ADDRESS || '340 S Lemon Ave #4133, Walnut, CA 91789, USA';
    const HOST_WEBSITE = process.env.NEXT_PUBLIC_HOST_WEBSITE || process.env.NEXT_PUBLIC_HOST_VERCEL || 'https://vercel.com/';

    const HAS_HCAPTCHA = Boolean(process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY);
    const USES_WEB3FORMS = Boolean(process.env.WEB3FORMS_KEY);

    // date de mise à jour — format affiché JJ/MM/AAAA
    const LAST_UPDATE = '17/08/2025';
    const lastUpdateISO = useMemo(() => {
        const m = LAST_UPDATE.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        return m ? `${m[3]}-${m[2]}-${m[1]}` : '2025-08-17';
    }, [LAST_UPDATE]);

    // section active (surbrillance TOC)
    const [activeId, setActiveId] = useState<string>(TOC_ITEMS[0].id);

    // Observe les sections pour mettre à jour le TOC actif
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
                if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
            },
            { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] }
        );
        TOC_ITEMS.forEach((it) => {
            const el = document.getElementById(it.id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    // composant titre de section + ancre
    const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
        <h2 id={id} className="group scroll-mt-24 text-xl md:text-2xl font-semibold text-terracotta">
            <a href={`#${id}`} className="inline-flex items-center gap-2">
                <span>{children}</span>
                <IconLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-foreground/60" aria-hidden />
            </a>
        </h2>
    );

    return (
        <section aria-labelledby="privacy-page-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] bg-background">
            {/* Liséré haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" aria-hidden />
            {/* Fond or (mobile) */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" aria-hidden />
            {/* Vague décorative (md+) */}
            <div className="absolute inset-0 hidden md:block z-0" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" role="presentation" fill priority className="object-cover" sizes="100vw" />
            </div>

            <div className="relative z-[1] max-w-6xl mx-auto space-y-8 md:space-y-10">
                {/* Breadcrumb minimal */}
                <nav aria-label="Fil d’Ariane" className="text-sm">
                    <ol className="flex flex-wrap items-center gap-2 text-foreground/70">
                        <li className="inline-flex items-center gap-1">
                            <Home className="w-4 h-4" aria-hidden />
                            <NextLink href="/" className="underline underline-offset-4 hover:text-ormat">
                                Accueil
                            </NextLink>
                        </li>
                        <li aria-hidden className="opacity-60">
                            /
                        </li>
                        <li>
                            <span className="text-foreground">Politique de confidentialité</span>
                        </li>
                    </ol>
                </nav>

                {/* Header */}
                <header className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden />
                        Politique de confidentialité
                    </span>

                    <h1 id="privacy-page-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Vos données, nos engagements
                    </h1>

                    <p className="mt-3 text-foreground/80">Transparence, sobriété des données et respect de votre consentement.</p>
                    <p className="mt-1 text-xs text-foreground/60">
                        Dernière mise à jour : <time dateTime={lastUpdateISO}>{LAST_UPDATE}</time>
                    </p>
                </header>

                {/* Corps : grille sommaire + contenu */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    {/* Sommaire mobile (accordéon) */}
                    <details className="lg:hidden rounded-[16px] border border-sauge/30 bg-background/70 p-4">
                        <summary className="cursor-pointer text-sm font-semibold">Sommaire</summary>
                        <ul className="mt-3 space-y-2 text-sm">
                            {TOC_ITEMS.map((it) => (
                                <li key={it.id}>
                                    <a
                                        href={`#${it.id}`}
                                        className={`underline underline-offset-4 ${activeId === it.id ? 'text-ormat font-semibold' : 'text-foreground/80 hover:text-ormat'}`}
                                    >
                                        {it.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </details>

                    {/* Sommaire desktop (sticky) */}
                    <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
                        <nav aria-label="Sommaire" className="sticky top-24 rounded-[16px] border border-sauge/30 bg-background/70 p-4 text-sm">
                            <ul className="space-y-1">
                                {TOC_ITEMS.map((it) => (
                                    <li key={it.id}>
                                        <a
                                            href={`#${it.id}`}
                                            aria-current={activeId === it.id ? 'true' : undefined}
                                            className={`block rounded px-2 py-1 transition ${
                                                activeId === it.id ? 'bg-sauge/15 text-ormat font-semibold' : 'text-foreground/80 hover:text-ormat hover:bg-sauge/10'
                                            }`}
                                        >
                                            {it.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    {/* Contenu principal */}
                    <article className="lg:col-span-8 xl:col-span-9 space-y-8">
                        <section id="intro">
                            <H2 id="intro">1. Qui traite vos données&nbsp;?</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Le site <strong>Alchimiste Créations</strong> (l’«&nbsp;éditeur&nbsp;») est responsable des traitements effectués via ce site (formulaires, prise de
                                rendez-vous, emails). L’hébergement est assuré par <strong>{HOST_NAME}</strong>, {HOST_ADDRESS}&nbsp;—&nbsp;
                                <a
                                    href={HOST_WEBSITE}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-4 hover:text-ormat inline-flex items-center gap-1"
                                >
                                    {HOST_WEBSITE}
                                    <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                                </a>
                                .
                            </p>
                        </section>

                        <section id="collecte">
                            <H2 id="collecte">2. Quelles données sont collectées&nbsp;?</H2>
                            <ul className="mt-2 list-disc pl-5 space-y-2 text-sm md:text-base text-foreground/80">
                                <li>
                                    <strong>Formulaire «&nbsp;Brief express&nbsp;»</strong>&nbsp;: identité (prénom, email, entreprise), fuseau/pays, informations projet (type,
                                    refonte, URL), objectifs, contenus/fonctionnalités, budget, délai, contexte, références, pièces jointes (selon limites indiquées), consentement
                                    RGPD.
                                </li>
                                <li>
                                    <strong>Prise de rendez-vous</strong> (Calendly)&nbsp;: nom, email, créneau sélectionné et métadonnées liées à l’événement.
                                </li>
                                <li>
                                    <strong>Contact direct</strong> (email)&nbsp;: adresse email et contenu du message.
                                </li>
                                <li>
                                    <strong>Consentement & cookies</strong>&nbsp;: un cookie technique <code className="px-1 py-0.5 rounded bg-foreground/10">ac_consent</code>{' '}
                                    stocke vos préférences (180&nbsp;jours).
                                </li>
                                <li>
                                    <strong>Journaux techniques</strong>&nbsp;: logs serveur et mesures anti-abus strictement nécessaires.
                                </li>
                            </ul>
                        </section>

                        <section id="finalites">
                            <H2 id="finalites">3. Finalités & bases légales</H2>
                            <ul className="mt-2 list-disc pl-5 space-y-2 text-sm md:text-base text-foreground/80">
                                <li>
                                    <strong>Répondre à vos demandes</strong> (devis, contact)&nbsp;: mesures précontractuelles / contrat.
                                </li>
                                <li>
                                    <strong>Planifier un rendez-vous</strong>&nbsp;: intérêt légitime et exécution de votre demande.
                                </li>
                                <li>
                                    <strong>Amélioration du site & mesures agrégées</strong> (si «&nbsp;analytics&nbsp;»)&nbsp;: consentement.
                                </li>
                                <li>
                                    <strong>Sécurité & prévention de la fraude</strong>&nbsp;: intérêt légitime.
                                </li>
                                <li>
                                    <strong>Prospection</strong> (modérée)&nbsp;: consentement et/ou intérêt légitime, selon le contexte.
                                </li>
                            </ul>
                        </section>

                        <section id="destinataires">
                            <H2 id="destinataires">4. Destinataires & sous-traitants</H2>
                            <div className="mt-2 space-y-2 text-sm md:text-base text-foreground/80">
                                <p>Nous partageons uniquement ce qui est nécessaire avec des prestataires fiables&nbsp;:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                        <strong>Hébergement</strong>&nbsp;: {HOST_NAME} ({HOST_WEBSITE}).
                                    </li>
                                    <li>
                                        <strong>Prise de rendez-vous</strong>&nbsp;: Calendly (chargé seulement si «&nbsp;contenus tiers&nbsp;» accepté).
                                    </li>
                                    {HAS_HCAPTCHA && (
                                        <li>
                                            <strong>Protection anti-spam</strong>&nbsp;: hCaptcha (selon votre consentement).
                                        </li>
                                    )}
                                    {USES_WEB3FORMS ? (
                                        <li>
                                            <strong>Formulaires</strong>&nbsp;: Web3Forms (envoi sécurisé du brief).
                                        </li>
                                    ) : (
                                        <li>
                                            <strong>Formulaires</strong>&nbsp;: route API interne (pas de script tiers).
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </section>

                        <section id="transferts">
                            <H2 id="transferts">5. Transferts hors UE</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Certains prestataires peuvent traiter des données hors UE (ex.&nbsp;États-Unis). Des garanties (CCT, mesures complémentaires) sont mises en œuvre.
                            </p>
                        </section>

                        <section id="conservation">
                            <H2 id="conservation">6. Durées de conservation</H2>
                            <ul className="mt-2 list-disc pl-5 space-y-2 text-sm md:text-base text-foreground/80">
                                <li>
                                    <strong>Devis / contacts</strong>&nbsp;: jusqu’à 24&nbsp;mois après le dernier échange si pas de suite.
                                </li>
                                <li>
                                    <strong>Contractuel & facturation</strong>&nbsp;: durées légales.
                                </li>
                                <li>
                                    <strong>Cookie de consentement</strong>&nbsp;: 180&nbsp;jours.
                                </li>
                            </ul>
                        </section>

                        <section id="droits">
                            <H2 id="droits">7. Vos droits (RGPD)</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Droits d’accès, rectification, effacement, limitation, opposition, portabilité, retrait du consentement. Réclamation possible auprès de la CNIL.
                            </p>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Exercer vos droits&nbsp;:{' '}
                                <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-ormat">
                                    {EMAIL}
                                </a>
                                .
                            </p>
                        </section>

                        <section id="cookies">
                            <H2 id="cookies">8. Cookies & consentement</H2>
                            <div className="mt-2 space-y-2 text-sm md:text-base text-foreground/80">
                                <p>
                                    Catégories&nbsp;: <em>nécessaires</em> (toujours actifs), <em>préférences</em>, <em>analytics</em>, <em>fonctionnels</em> (contenus tiers),{' '}
                                    <em>marketing</em>. Stockage dans <code className="px-1 py-0.5 rounded bg-foreground/10">ac_consent</code> (180&nbsp;jours).
                                </p>
                                <p>
                                    <NextLink href="/preferences-cookies" className="underline underline-offset-4 hover:text-ormat">
                                        Modifier mes préférences
                                    </NextLink>
                                    . Compatible Google Consent Mode v2.
                                </p>
                            </div>
                        </section>

                        <section id="securite">
                            <H2 id="securite">9. Sécurité</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Mesures techniques & organisationnelles proportionnées (chiffrement en transit, accès limités, anti-abus). Restez vigilants (mots de passe,
                                partages).
                            </p>
                        </section>

                        <section id="contact">
                            <H2 id="contact">10. Contact</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Toute question RGPD&nbsp;:{' '}
                                <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-ormat">
                                    {EMAIL}
                                </a>
                                .
                            </p>
                        </section>

                        <section id="maj">
                            <H2 id="maj">11. Mises à jour</H2>
                            <p className="mt-2 text-sm md:text-base text-foreground/80">
                                Cette page peut évoluer (réglementation/pratiques). Dernière mise à jour&nbsp;: <time dateTime={lastUpdateISO}>{LAST_UPDATE}</time>.
                            </p>
                        </section>
                    </article>
                </div>

                {/* Bandeau aide / liens utiles */}
                <div className="grid gap-2 sm:grid-cols-2 text-xs text-foreground/80">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-sauge/30 bg-sauge/10 px-3 py-2">
                        ⚙️ Gérer mes préférences&nbsp;:{' '}
                        <NextLink href="/preferences-cookies" className="underline underline-offset-4 hover:text-ormat">
                            Cookies & consentement
                        </NextLink>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-xl border border-terracotta/30 bg-terracotta/10 px-3 py-2">
                        📬 Contacter l’éditeur&nbsp;:{' '}
                        <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-ormat">
                            {EMAIL}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
