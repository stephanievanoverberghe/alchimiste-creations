'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export default function Footer() {
    return (
        <footer className="relative text-background text-sm lg:text-base pt-10 lg:pt-32 pb-10 px-6 md:px-20 overflow-hidden">
            {/* Image de fond */}
            <div className="absolute inset-0 z-0">
                <Image src="/footer.png" alt="Fond footer" fill priority className="object-cover w-full h-full grayscale-[20%] brightness-[60%] contrast-100" />
                {/* Overlay ardoise */}
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(27, 10, 0, 0.6)' }} />
            </div>

            {/* Contenu principal */}
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-start gap-10">
                {/* Logo */}
                <Link href="/" className="flex justify-center md:justify-start">
                    <Image src="/logo-sceau.png" alt="Logo Alchimiste" width={150} height={150} className="w-20 lg:w-40 h-auto" />
                </Link>

                {/* Navigation */}
                <div className="flex flex-col items-center gap-6 text-center tracking-widest">
                    <Link href="/" className="hover:text-ormat transition">
                        Accueil
                    </Link>
                    <Link href="/a-propos" className="hover:text-ormat transition">
                        Me découvrir
                    </Link>
                    <Link href="/offres" className="hover:text-ormat transition">
                        Créer ensemble
                    </Link>
                    <Link href="/projets" className="hover:text-ormat transition">
                        Projets vivants
                    </Link>
                    <Link href="/contact" className="hover:text-ormat transition">
                        Entrer en lien
                    </Link>
                    <p className="text-ormat text-xs lg:text-sm mt-4">Créer du web vivant, un projet à la fois.</p>
                </div>

                {/* Réseaux sociaux */}
                <div className="flex flex-col items-center md:items-end gap-3">
                    <span className="text-base lg:text-xl font-title tracking-wide">Me rejoindre</span>
                    <div className="flex gap-4 mt-2 text-background text-xl">
                        <a
                            href="https://www.facebook.com/lalchimiste2compostelle?locale=fr_FR"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="hover:text-ormat transition"
                        >
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/stephanie-vanoverberghe/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="hover:text-ormat transition"
                        >
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                        <a href="mailto:orangestreet@live.fr" aria-label="Email" className="hover:text-ormat transition">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Mentions légales */}
            <div className="relative z-10 mt-10 text-center text-[10px] text-muted">
                <p className="text-[11px] text-ormat font-semibold mb-3">© Alchimiste Créations — Tous droits réservés</p>
                <div className="flex flex-wrap justify-center gap-3 mt-1">
                    <Link href="/mentions-legales" className="hover:text-ormat transition">
                        Mentions légales
                    </Link>
                    <span className="text-ormat">|</span>
                    <Link href="/politique-confidentialite" className="hover:text-ormat transition">
                        Politique de confidentialité
                    </Link>
                    <span className="text-ormat">|</span>
                    <Link href="/cgu" className="hover:text-ormat transition">
                        CGU
                    </Link>
                    <span className="text-ormat">|</span>
                    <Link href="/faq" className="hover:text-ormat transition">
                        FAQ
                    </Link>
                </div>
            </div>
        </footer>
    );
}
