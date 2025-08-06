'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CallToActionSection() {
    return (
        <section className="bg-background py-10 md:py-28 px-6 md:px-12 lg:px-[100px] xl:px-[150px] text-center text-foreground">
            <div className="max-w-3xl mx-auto space-y-8">
                <p className="text-base md:text-lg leading-relaxed">Et si on créait ensemble un espace digital qui vous ressemble vraiment ?</p>
                <Link href="/contact">
                    <Button>Réserver un appel découverte</Button>
                </Link>
                <p className="text-xs md:text-sm mt-4 md:mt-10 text-muted italic">
                    Je ne prends qu’un projet à la fois, pour créer avec soin et présence. Appel sans engagement – juste un moment d’écoute.
                </p>
            </div>
        </section>
    );
}
