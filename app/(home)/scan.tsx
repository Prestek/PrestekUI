
import { Navigation } from "@/components/Navigation";
import WarningScanner from "@/components/scanner/WarningScanner";
import { Steps } from "@/components/Steps";

export default function DocumentScanner() {

    return (
        <Navigation
            showExit={true}
            showElevated={true}
            showBackButton={false}
            header={true}
            headerChildren={
                <Steps
                currentStep={1}
                totalSteps={2}
                stepTitle="Scan ID Card"
                stepLabels={["Scan ID", "Profile"]}
                title="ID card capture"
            />
        }
        >
            <WarningScanner />
        </Navigation>
    );
}
