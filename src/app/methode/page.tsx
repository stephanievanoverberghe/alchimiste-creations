'use client';

import { useEffect } from 'react';

import TLDRSection from '@/presentation/components/sections/method/TLDR';
import ProcessSection from '@/presentation/components/sections/method/Process';
import ToolsSection from '@/presentation/components/sections/method/Tools';
import PrinciplesSection from '@/presentation/components/sections/method/Principles';
import RolesSection from '@/presentation/components/sections/method/Roles';
import QualitySection from '@/presentation/components/sections/method/Quality';
import SEOSection from '@/presentation/components/sections/method/SEO';
import DependenciesSection from '@/presentation/components/sections/method/Dependencies';
import ChangeManagementSection from '@/presentation/components/sections/method/ChangeManagement';
import PlanningSection from '@/presentation/components/sections/method/Planning';
import DeliverablesSection from '@/presentation/components/sections/method/Deliverables';
import CaseStudiesSection from '@/presentation/components/sections/method/CaseStudies';
import FAQSection from '@/presentation/components/sections/method/FAQ';
import CTASection from '@/presentation/components/sections/method/CallToAction';

export default function MethodPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            <TLDRSection />
            <PrinciplesSection />
            <RolesSection />
            <ToolsSection />
            <ProcessSection />
            <QualitySection />
            <SEOSection />
            <DependenciesSection />
            <ChangeManagementSection />
            <PlanningSection />
            <DeliverablesSection />
            <CaseStudiesSection />
            <FAQSection />
            <CTASection />
        </div>
    );
}
