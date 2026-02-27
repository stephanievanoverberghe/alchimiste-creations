import { CtaStrip } from '@/components/sections/cta-strip';
import { HomeRoadmap, HomeDiagnosticSection, HomeFaqSection, HomeHeroSection, HomeMethodSection, HomeOffersSection, HomeProjectsSection } from '@/features/home/sections';
import { homeContent } from '@/content/home';

export default function HomePage() {
    const content = homeContent;

    return (
        <HomeRoadmap>
            <HomeHeroSection content={content.hero} stats={content.proofs.stats} />
            <HomeDiagnosticSection qualification={content.qualification} proofs={content.proofs} />
            <HomeMethodSection architecture={content.architecture} process={content.process} />
            <HomeOffersSection content={content.offers} />
            <HomeProjectsSection content={content.projects} />
            <HomeFaqSection content={content.faq} />
            <CtaStrip />
        </HomeRoadmap>
    );
}
