import { AfterSubmitTimelineSection } from '@/components/sections/devis/AfterSubmitTimeline';
import BriefExpressSection from '@/components/sections/devis/BriefExpress';
import PacksReminderSection from '@/components/sections/devis/PacksReminder';
import QuickEstimateSection from '@/components/sections/devis/QuickEstimate';
import ScheduleInlineSection from '@/components/sections/devis/ScheduleInline';

export default function DevisPage() {
    return (
        <div>
            <PacksReminderSection />
            <QuickEstimateSection />
            <BriefExpressSection id="brief-express" />
            <AfterSubmitTimelineSection />
            <ScheduleInlineSection />
        </div>
    );
}
