'use client';

export default function NoGoSection() {
    const donts = [
        'Des sites copiés-collés à partir de templates impersonnels',
        'Un projet bâclé en 48h juste pour « être en ligne »',
        'Du jargon technique qui te laisse dans le flou',
        'Un design qui ne reflète pas ton univers',
    ];

    const dos = [
        'Une création artisanale, pensée pour toi et avec toi',
        'Un rythme de travail qui respecte la qualité et la précision',
        'Une communication claire et transparente à chaque étape',
        'Un site qui respire ton énergie et attire les bonnes personnes',
    ];

    return (
        <section className="relative py-10 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
            <div className="max-w-5xl mx-auto space-y-10">
                {/* Titre + intro */}
                <div className="text-center lg:text-left">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase text-terracotta bg-terracotta/10 border border-terracotta/30 rounded-full px-4 py-1">
                        Ma philosophie
                    </span>
                    <h2 className="mt-6 text-terracotta font-title text-3xl md:text-4xl font-bold tracking-widest leading-tight">Ce que tu ne trouveras pas chez moi</h2>
                    <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
                        Travailler ensemble, c’est plus qu’un contrat. C’est un engagement réciproque. Alors autant être clairs dès le départ : voici ce que je refuse… et ce que je
                        défends.
                    </p>
                </div>

                {/* Grille */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Colonne "je ne fais pas" */}
                    <div className="bg-ivory/80 rounded-[30px] border border-sauge/30 p-6 shadow-sm">
                        <h3 className="text-sm md:text-base font-semibold tracking-widest text-terracotta mb-5">❌ Pas chez moi</h3>
                        <ul className="space-y-3">
                            {donts.map((line, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>{line}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne "je propose" */}
                    <div className="bg-ivory/80 rounded-[30px] border border-sauge/30 p-6 shadow-sm">
                        <h3 className="text-sm md:text-base font-semibold tracking-widest text-sauge mb-5">✅ Ce que je propose</h3>
                        <ul className="space-y-3">
                            {dos.map((line, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-sauge" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{line}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
