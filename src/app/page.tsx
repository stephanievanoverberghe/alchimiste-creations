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
    useHome,
} from '@/components/sections/home';

export default function HomePage() {
    const { content } = useHome();

    return (
        <HomeRoadmap>
            <HomeHeroSection content={content.hero} stats={content.proofs.stats} />
            <HomeQualificationSection content={content.qualification} />
            <HomeProofsSection content={content.proofs} />
            <HomeArchitectureSection content={content.architecture} />
            <HomeProcessSection content={content.process} />
            <HomeOffersSection content={content.offers} />
            <HomeProjectsSection content={content.projects} />
            <HomeFaqSection content={content.faq} />
            <CtaStrip />
        </HomeRoadmap>
    );
}
