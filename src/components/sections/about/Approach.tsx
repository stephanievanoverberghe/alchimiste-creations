'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ApproachSection() {
    return (
        <section className="bg-background py-10 md:py-28 px-6 md:px-12 lg:px-[100px] xl:px-[150px] text-center lg:text-start">
            <div className="text-sm md:text-base leading-relaxed font-light mb-4 md:mb-10">
                <p>Je crée des sites web pour incarner ce qui est souvent tu, flou ou difficile à exprimer.</p>
                <p className="mt-4">
                    Parce que je crois que chaque être humain a quelque chose d’unique à offrir, et que le digital peut devenir un miroir vivant de cette essence.
                </p>
                <p className="mt-4">Je suis une créatrice de ponts. Entre toi et le monde. Entre l’idée et la forme. Entre l’intuition et le code.</p>
            </div>
            <Link href="/contact">
                <Button>Réserver un appel découverte</Button>
            </Link>
        </section>
    );
}
