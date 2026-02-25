import { AfterSubmitTimelineSection } from '@/presentation/components/sections/devis/AfterSubmitTimeline';
import BriefExpressSection from '@/presentation/components/sections/devis/BriefExpress';
import CallToActionDevis from '@/presentation/components/sections/devis/CallToAction';
import FaqDevisSection from '@/presentation/components/sections/devis/FaqDevis';
import PacksReminderSection from '@/presentation/components/sections/devis/PacksReminder';
import QuickEstimateSection from '@/presentation/components/sections/devis/QuickEstimate';
import ScheduleInlineSection from '@/presentation/components/sections/devis/ScheduleInline';

export default function DevisPage() {
    return (
        <div>
            <PacksReminderSection />
            <QuickEstimateSection />
            <BriefExpressSection id="brief-express" />
            <AfterSubmitTimelineSection />
            <ScheduleInlineSection />
            <FaqDevisSection />
            <CallToActionDevis />
        </div>
    );
}
