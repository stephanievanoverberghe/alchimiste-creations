import CallToActionProjects from '@/components/sections/projects/CallToAction';
import FaqProjects from '@/components/sections/projects/FaqProjects';
import FeaturedCases from '@/components/sections/projects/FeaturedCases';
import FiltersSection from '@/components/sections/projects/Filters';
import ResultsPerfSection from '@/components/sections/projects/ResultsPerf';
import TestimonialsRibbon from '@/components/sections/projects/TestimonialsRibbon';

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
