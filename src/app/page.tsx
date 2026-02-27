import { CtaStrip } from '@/components/sections/cta-strip';
import {
    HomeRoadmap,
    HomeArchitectureSection,
    HomeFaqSection,
    HomeHeroSection,
    HomeOffersSection,
    HomeProcessSection,
    HomeProjectsSection,
    HomeProofsSection,
    HomeQualificationSection,
} from '@/components/sections/home';

import type { HomeHeroVariant } from '@/components/sections/home/use-home-hero';
import { homeContent } from '@/content/home';

type HomePageSearchParams = Promise<{
    hero?: string;
}>;

type HomePageProps = {
    searchParams: HomePageSearchParams;
};

const getHeroVariant = (heroParam?: string): HomeHeroVariant => (heroParam === 'b' ? 'b' : 'a');

export default async function HomePage({ searchParams }: HomePageProps) {
    const params = await searchParams;
    const heroVariant = getHeroVariant(params?.hero);

    return (
        <HomeRoadmap>
            <HomeHeroSection variant={heroVariant} />
            <HomeQualificationSection content={homeContent.qualification} />
            <HomeProofsSection content={homeContent.proofs} />
            <HomeArchitectureSection content={homeContent.architecture} />
            <HomeProcessSection content={homeContent.process} />
            <HomeOffersSection content={homeContent.offers} />
            <HomeProjectsSection content={homeContent.projects} />
            <HomeFaqSection content={homeContent.faq} />
            <CtaStrip />
        </HomeRoadmap>
    );
}
