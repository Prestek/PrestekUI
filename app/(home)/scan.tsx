
import { Navigation } from "@/components/Navigation";
import WarningScanner from "@/components/scanner/WarningScanner";

export default function DocumentScanner(){
    
    return (
        <Navigation 
            showExit={true}
            currentStep={1}
            totalSteps={2}
            stepTitle="Scan ID Card"
            stepLabels={["Scan ID", "Profile"]}
            showElevated={true}
            showBackButton={false}
        >
            <WarningScanner />
        </Navigation>
    );
}
