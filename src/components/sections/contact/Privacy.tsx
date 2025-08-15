// src/components/sections/contact/Privacy.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock, Cookie, Mail } from 'lucide-react';

type PrivacyProps = {
    /** URL de ta politique de confidentialité */
    privacyUrl?: string;
    /** URL (ou ancre) vers tes préférences cookies si tu en as une */
    cookiePrefsUrl?: string;
    /** Email de contact DPO (ou le tien) */
    dpoEmail?: string;
};

export default function PrivacySection({
    privacyUrl = '/legal/politique-de-confidentialite',
    cookiePrefsUrl = '/preferences-cookies',
    dpoEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'orangestreet@live.fr',
}: PrivacyProps) {
    return (
        <section id="contact-privacy" aria-labelledby="contact-privacy-title" className="relative py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            {/* Liseré décoratif en haut */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-background via-ormat/20 to-background" aria-hidden />
            {/* Fond or mobile only */}
            <div className="absolute inset-0 bg-ormat/10 md:hidden z-0" aria-hidden />
            {/* Vague décorative (md+) */}
            <div className="absolute bottom-0 left-0 w-full h-full hidden md:block z-0" aria-hidden>
                <Image src="/deco/about-wave.png" alt="" fill priority className="object-cover h-auto" />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-8 md:space-y-10">
                {/* En-tête */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-terracotta bg-background border border-terracotta/30 rounded-full px-4 py-1">
                        RGPD & confidentialité
                    </span>
                    <h2 id="contact-privacy-title" className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">
                        Transparence sur tes données
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        J’utilise le strict nécessaire pour répondre à ta demande. Tu peux gérer ton consentement et exercer tes droits à tout moment.
                    </p>
                </div>

                {/* Carte contenu */}
                <article className="group relative overflow-hidden rounded-[22px] border border-sauge/30 bg-background/70 p-5 md:p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    {/* motif discret */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', color: 'var(--color-ormat)' }}
                        aria-hidden
                    />

                    {/* Séparateur animé en haut */}
                    <div className="relative z-[1] h-[2px] overflow-hidden">
                        <div className="absolute inset-0 bg-sauge/20" aria-hidden />
                        <div
                            className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-sauge via-terracotta to-sauge transition-[width] duration-500 ease-out group-hover:w-full"
                            aria-hidden
                        />
                    </div>

                    <ul className="relative z-[1] mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {/* Calendly */}
                        <li className="flex items-start gap-3">
                            <span className="grid place-content-center size-9 shrink-0 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                <ShieldCheck className="w-4 h-4" aria-hidden />
                            </span>
                            <div className="flex-1">
                                <h3 className="text-[13px] md:text-[14px] font-semibold text-foreground/90 tracking-wide">Prise de rendez-vous (Calendly)</h3>
                                <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                    Le widget Calendly s’affiche sur cette page. Tes données nécessaires à la réservation (nom, email, créneau) sont traitées par Calendly. Plus
                                    d’infos&nbsp;:{' '}
                                    <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                                        politique de confidentialité Calendly
                                    </a>
                                    .
                                </p>
                            </div>
                        </li>

                        {/* Formulaire */}
                        <li className="flex items-start gap-3">
                            <span className="grid place-content-center size-9 shrink-0 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                <Lock className="w-4 h-4" aria-hidden />
                            </span>
                            <div className="flex-1">
                                <h3 className="text-[13px] md:text-[14px] font-semibold text-foreground/90 tracking-wide">Formulaire de contact</h3>
                                <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                    Le formulaire m’envoie un email sécurisé. Je ne crée pas de base de données marketing par défaut. Tu peux demander la suppression de ton message
                                    à tout moment.
                                </p>
                            </div>
                        </li>

                        {/* Cookies */}
                        <li className="flex items-start gap-3">
                            <span className="grid place-content-center size-9 shrink-0 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                <Cookie className="w-4 h-4" aria-hidden />
                            </span>
                            <div className="flex-1">
                                <h3 className="text-[13px] md:text-[14px] font-semibold text-foreground/90 tracking-wide">Cookies & mesure d’audience</h3>
                                <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                    Pas de cookies publicitaires sans consentement. Si la mesure d’audience est activée, elle respecte le consentement.{' '}
                                    <Link href={cookiePrefsUrl} className="underline underline-offset-2">
                                        Gérer mes préférences
                                    </Link>
                                    .
                                </p>
                            </div>
                        </li>

                        {/* Droits RGPD */}
                        <li className="flex items-start gap-3">
                            <span className="grid place-content-center size-9 shrink-0 rounded-full border border-sauge/40 bg-sauge/10 text-sauge mt-0.5">
                                <Mail className="w-4 h-4" aria-hidden />
                            </span>
                            <div className="flex-1">
                                <h3 className="text-[13px] md:text-[14px] font-semibold text-foreground/90 tracking-wide">Tes droits</h3>
                                <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                                    Accès, rectification, suppression&nbsp;: écris-moi à{' '}
                                    <a href={`mailto:${dpoEmail}`} className="underline underline-offset-2">
                                        {dpoEmail}
                                    </a>
                                    . Les détails sont précisés dans ma{' '}
                                    <Link href={privacyUrl} className="underline underline-offset-2">
                                        politique de confidentialité
                                    </Link>
                                    .
                                </p>
                            </div>
                        </li>
                    </ul>

                    {/* Lien vers ta politique (footer de carte) */}
                    <div className="relative z-[1] mt-5 pt-4 border-t border-sauge/20 text-sm text-foreground/75">
                        Consulte la{' '}
                        <Link href={privacyUrl} className="underline underline-offset-2">
                            politique de confidentialité complète
                        </Link>{' '}
                        pour connaître la base légale, la durée de conservation et les sous-traitants utilisés.
                    </div>
                </article>
            </div>
        </section>
    );
}
