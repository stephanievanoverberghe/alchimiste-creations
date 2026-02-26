'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { footerCopy } from '@/infrastructure/content/layout-copy';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden text-background px-6 md:px-10 lg:px-25 xl:px-37.5 pt-12 md:pt-20 pb-10" aria-labelledby={footerCopy.ariaLabelledBy}>
            <h2 id={footerCopy.ariaLabelledBy} className="sr-only">
                {footerCopy.title}
            </h2>

            <div className="absolute inset-0 -z-10">
                <Image src="/footer.png" alt="" role="presentation" fill loading="lazy" sizes="100vw" className="object-cover grayscale-[12%] brightness-[62%] contrast-100" />
                <div className="absolute inset-0 bg-[rgba(27,10,0,0.58)]" aria-hidden />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <section aria-label={footerCopy.sectionAriaLabel} className="rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/" aria-label={footerCopy.homeAriaLabel} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 rounded">
                                <Image src="/logo-sceau.png" alt={footerCopy.logoAlt} width={140} height={140} className="w-20 md:w-24 h-auto" />
                            </Link>
                            <p className="text-ormat text-xs md:text-sm font-semibold tracking-widest">{footerCopy.baseline}</p>
                        </div>

                        <ul className="flex items-center justify-center gap-2">
                            <li>
                                <a
                                    href="https://www.facebook.com/lalchimiste2compostelle?locale=fr_FR"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={footerCopy.socialLinks.facebookAriaLabel}
                                    className="inline-flex items-center justify-center min-w-11 min-h-11 rounded-full border border-sauge/40 bg-sauge/10 text-sauge hover:bg-sauge/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40"
                                >
                                    <FontAwesomeIcon icon={faFacebookF} className="text-base" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/stephanie-vanoverberghe/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={footerCopy.socialLinks.linkedInAriaLabel}
                                    className="inline-flex items-center justify-center min-w-11 min-h-11 rounded-full border border-sauge/40 bg-sauge/10 text-sauge hover:bg-sauge/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40"
                                >
                                    <FontAwesomeIcon icon={faLinkedinIn} className="text-base" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:orangestreet@live.fr"
                                    aria-label={footerCopy.socialLinks.emailAriaLabel}
                                    className="inline-flex items-center justify-center min-w-11 min-h-11 rounded-full border border-sauge/40 bg-sauge/10 text-sauge hover:bg-sauge/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40"
                                >
                                    <FontAwesomeIcon icon={faEnvelope} className="text-base" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" aria-hidden />

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <nav aria-labelledby="footer-nav-explorer">
                            <h3 id="footer-nav-explorer" className="text-[12px] font-bold tracking-[0.25em] uppercase text-terracotta mb-3">
                                {footerCopy.explorerTitle}
                            </h3>
                            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm tracking-widest">
                                {footerCopy.navMain.map(([href, label]) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="inline-block py-1 rounded transition hover:text-ormat focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <nav aria-labelledby="footer-nav-legal">
                            <h3 id="footer-nav-legal" className="text-[12px] font-bold tracking-[0.25em] uppercase text-terracotta mb-3">
                                {footerCopy.legalTitle}
                            </h3>
                            <ul className="space-y-2 text-sm tracking-widest">
                                {footerCopy.navLegal.map(([href, label]) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="inline-block py-1 rounded transition hover:text-ormat focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10 text-center text-[11px] text-background/85">
                        <p className="text-ormat font-semibold">
                            © {year} {footerCopy.copyrightSuffix}
                        </p>
                    </div>
                </section>
            </div>
        </footer>
    );
}
