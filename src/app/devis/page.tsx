export default function DevisPage() {
    return (
        <div>
            <section className="py-12 md:py-16 px-6 md:px-8 lg:px-[100px] xl:px-[150px]">
                <div className="max-w-4xl mx-auto text-center text-foreground/80">
                    <p className="text-sm md:text-base">
                        Tu peux aussi{' '}
                        <a href="/contact" className="underline underline-offset-2">
                            réserver un appel de 30 min
                        </a>{' '}
                        pour cadrer ensemble avant le devis.
                    </p>
                </div>
            </section>
        </div>
    );
}
