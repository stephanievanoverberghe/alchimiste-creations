import BriefExpressSection from '@/components/sections/devis/BriefExpress';
import PacksReminderSection from '@/components/sections/devis/PacksReminder';
import QuickEstimateSection from '@/components/sections/devis/QuickEstimate';

export default function DevisPage() {
    return (
        <div>
            <PacksReminderSection />
            <QuickEstimateSection />
            <BriefExpressSection />
        </div>
    );
}
