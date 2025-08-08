'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

export default function QuoteSection() {
    return (
        <section className="relative text-background py-16 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Image de fond */}
            <div
                className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: "url('/home/quote.png')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-foreground/10" />
            </div>

            {/* Guillemets décoratifs */}
            <div className="absolute top-8 left-6 md:top-12 md:left-12 text-ormat/20 text-7xl md:text-8xl z-0">
                <FontAwesomeIcon icon={faQuoteLeft} />
            </div>
            <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 text-ormat/20 text-7xl md:text-8xl z-0">
                <FontAwesomeIcon icon={faQuoteRight} />
            </div>

            {/* Contenu */}
            <div className="relative z-10 text-center space-y-5">
                <p className="italic">Créer, pour moi, c’est traduire l’invisible en structure vivante.</p>
                <p className="italic">Transformer le brut en beau, le flou en clarté, le sensible en interface.</p>
                <p className="text-base md:text-lg lg:text-xl italic font-bold my-6 text-ormat">Je ne vends pas du code. Je crée du lien.</p>
                <p className="italic">Chaque site est pensé pour raconter ton histoire, mettre en lumière ta singularité et faciliter la rencontre avec ceux qui te cherchent.</p>

                <p className="tracking-widest text-xs italic mt-8">Stéphanie – Alchimiste Créations</p>
            </div>
        </section>
    );
}
