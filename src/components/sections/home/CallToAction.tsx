'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CallToActionSection() {
    return (
        <section className="bg-background py-10 md:py-28 px-6 md:px-12 lg:px-[100px] xl:px-[150px] text-center text-foreground">
            <div className="space-y-8">
                <p className="leading-relaxed">Et si on donnait vie à un site qui attire tes clients idéaux, raconte ton histoire et travaille pour toi 24/7 ?</p>
                <p className="mt-4 leading-relaxed">📅 Réserve ton appel découverte offert pour me parler de ton projet et voir comment le concrétiser ensemble.</p>
                <Link
                    href="/contact"
                    className={cn(
                        'inline-block px-6 py-3 text-center rounded-2xl bg-terracotta hover:bg-terracotta/90 text-background text-sm font-semibold tracking-widest uppercase border-b-2 border-r-2 border-ormat transition hover:scale-105 shadow-[0px_2px_6px_rgba(164,75,52,0.25)]'
                    )}
                >
                    Réserver mon appel
                </Link>
            </div>
        </section>
    );
}
