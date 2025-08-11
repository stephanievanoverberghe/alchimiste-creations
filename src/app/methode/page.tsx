'use client';

import { useEffect } from 'react';

import TLDRSection from '@/components/sections/method/TLDR';
import ProcessSection from '@/components/sections/method/Process';
import ToolsSection from '@/components/sections/method/Tools';
import PrinciplesSection from '@/components/sections/method/Principles';
import RolesSection from '@/components/sections/method/Roles';
import QualitySection from '@/components/sections/method/Quality';
import SEOSection from '@/components/sections/method/SEO';
import DependenciesSection from '@/components/sections/method/Dependencies';
import ChangeManagementSection from '@/components/sections/method/ChangeManagement';
import PlanningSection from '@/components/sections/method/Planning';
import DeliverablesSection from '@/components/sections/method/Deliverables';
import CaseStudiesSection from '@/components/sections/method/CaseStudies';
import FAQSection from '@/components/sections/method/FAQ';
import CTASection from '@/components/sections/method/CallToAction';

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
