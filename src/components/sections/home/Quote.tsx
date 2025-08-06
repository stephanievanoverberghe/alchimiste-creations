'use client';

export default function QuoteSection() {
    return (
        <section className="relative text-background py-10 md:py-28 px-6 md:px-8 lg:px-[100px] xl:px-[150px] overflow-hidden">
            {/* Image de fond fixée à la section (pas au viewport entier) */}
            <div
                className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: "url('/home/quote.png')",
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Overlay ardoise */}
                <div className="absolute inset-0 bg-foreground/10" />
            </div>

            {/* Citation */}
            <div className="relative z-10 max-w-4xl mx-auto text-center tracking-wide space-y-2">
                <p className="text-sm md:text-lg lg:text-xl italic">Créer, pour moi, c’est traduire l’invisible en structure vivante.</p>
                <p className="text-sm md:text-lg lg:text-xl  italic">C’est transformer le brut en beau, le flou en clarté, le sensible en interface.</p>
                <p className="text-sm md:text-lg lg:text-xl italic font-bold mt-6">Je ne vends pas du code. Je crée du lien.</p>
                <p className="tracking-widest text-sm md:text-lg text-center mt-6">Stéphanie</p>
            </div>
        </section>
    );
}
