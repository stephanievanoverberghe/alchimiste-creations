import { HomeRoadmapLayout } from '@/components/roadmap/home-roadmap';
import { CtaStrip } from '@/components/sections/cta-strip';
import {
    HomeArchitectureSection,
    HomeFaqSection,
    HomeHeroSection,
    HomeOffersSection,
    HomeProcessSection,
    HomeProjectsSection,
    HomeProofsSection,
    HomeQualificationSection,
    useHome,
} from '@/components/sections/home';

export default function HomePage() {
    const { content } = useHome();

    return (
        <HomeRoadmapLayout>
            <HomeHeroSection content={content.hero} stats={content.proofs.stats} />
            <HomeQualificationSection content={content.qualification} />
            <HomeProofsSection content={content.proofs} />
            <HomeArchitectureSection content={content.architecture} />
            <HomeProcessSection content={content.process} />
            <HomeOffersSection content={content.offers} />
            <HomeProjectsSection content={content.projects} />
            <HomeFaqSection content={content.faq} />
            <CtaStrip />
        </HomeRoadmapLayout>
    );
}
