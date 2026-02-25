import CallToActionProjects from '@/presentation/components/sections/projects/CallToAction';
import FaqProjects from '@/presentation/components/sections/projects/FaqProjects';
import FeaturedCases from '@/presentation/components/sections/projects/FeaturedCases';
import FiltersSection from '@/presentation/components/sections/projects/Filters';
import ResultsPerfSection from '@/presentation/components/sections/projects/ResultsPerf';
import TestimonialsRibbon from '@/presentation/components/sections/projects/TestimonialsRibbon';

export default function ProjectPage() {
    return (
        <>
            <FiltersSection />
            <FeaturedCases />
            <TestimonialsRibbon max={6} speedSec={40} />
            <ResultsPerfSection />
            <FaqProjects />
            <CallToActionProjects />
        </>
    );
}
