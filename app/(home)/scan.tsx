
import { Navigation } from "@/components/Navigation";
import WarningScanner from "@/components/scanner/WarningScanner";
import { Steps } from "@/components/Steps";

export default function DocumentScanner() {

    return (
        <Navigation
            showExit={true}
            showElevated={true}
            showBackButton={false}
        >
            <Steps
                currentStep={1}
                totalSteps={2}
                stepTitle="Scan ID Card"
                stepLabels={["Scan ID", "Profile"]}
            />
            <WarningScanner />
        </Navigation>
    );
}
