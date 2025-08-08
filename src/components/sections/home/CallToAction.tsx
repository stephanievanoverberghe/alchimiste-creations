'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CallToActionSection() {
    return (
        <section className="bg-background py-10 md:py-28 px-6 md:px-12 lg:px-[100px] xl:px-[150px] text-center text-foreground">
            <div className="space-y-8">
                <p className="leading-relaxed">Et si on donnait vie à un site qui attire tes clients idéaux, raconte ton histoire et travaille pour toi 24/7 ?</p>
                <p className="mt-4 leading-relaxed">📅 Réserve ton appel découverte offert pour me parler de ton projet et voir comment le concrétiser ensemble.</p>
                <Link href="/contact">
                    <Button>Réserver mon appel</Button>
                </Link>
            </div>
        </section>
    );
}
