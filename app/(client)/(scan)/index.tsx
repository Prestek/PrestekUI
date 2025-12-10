import WarningScanner from "@/components/Client/scanner/WarningScanner";
import { Navigation } from "@/components/Navigation";
import { Steps } from "@/components/Steps";

export default function DocumentScanner() {

    return (
        <Navigation
            showExit={false}
            showElevated={true}
            showBackButton={true}
            header={true}
            headerChildren={
                <Steps
                currentStep={1}
                totalSteps={2}
                stepTitle="Escanear cédula"
                stepLabels={["Cédula", "Perfil"]}
                title="Escaneo de cédula"
            />
        }
        >
            <WarningScanner />
        </Navigation>
    );
}