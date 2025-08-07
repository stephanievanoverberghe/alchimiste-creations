'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CallToActionSection() {
    return (
        <section className="relative text-background py-10 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Image de fond fixée à la section (pas au viewport entier) */}
            <div
                className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: "url('/packs.png')",
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Overlay ardoise */}
                <div className="absolute inset-0 bg-foreground/10" />
            </div>

            <div className="relative z-10 text-center tracking-wide space-y-2">
                <div className="text-sm md:text-base leading-relaxed font-light mb-4 md:mb-10">
                    <p>Tu ne sais pas exactement ce qu’il te faut ? Tu veux que l’on imagine ensemble une solution qui respecte ton rythme et ton énergie ?</p>
                    <p className="mt-4">
                        Je propose aussi des accompagnements sur mesure, à partir d’une simple idée, d’un carnet ou d’un besoin intérieur. On part de toi, pas d’un modèle.
                    </p>
                </div>
                <Link href="/contact">
                    <Button>Parlons-en</Button>
                </Link>
            </div>
        </section>
    );
}
