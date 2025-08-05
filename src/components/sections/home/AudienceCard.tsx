'use client';

import Image from 'next/image';

interface AudienceCardProps {
    icon: string;
    alt: string;
    title: string;
    description: string;
}

export default function AudienceCard({ icon, alt, title, description }: AudienceCardProps) {
    return (
        <div className="bg-background rounded-2xl px-4 py-8 border-b-2 border-b-ormat border-r-2 border-r-ormat flex flex-col items-center gap-3 md:px-6 md:py-10">
            <Image src={icon} alt={alt} width={100} height={100} className="w-12 h-12 md:w-[100px] md:h-[100px]" />
            <h3 className="text-base md:text-base lg:text-xl font-bold tracking-wide md:tracking-widest">{title}</h3>
            <p className="text-xs md:text-sm font-light max-w-[250px]">{description}</p>
        </div>
    );
}
