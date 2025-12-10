import { View } from "react-native";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { useState } from "react";
import { useTheme } from "react-native-paper";
import { LoanOptions } from "@/components/Client/home/Loan/LoanOptions";
import { LoanSearching } from "@/components/Client/home/Loan/LoanSearching";
import { LoanDetail } from "@/components/Client/home/Loan/LoanDetail";
import { LoanConfirmation } from "@/components/Client/home/Loan/LoanConfirmation";
import { LoanNoOffers } from "@/components/Client/home/Loan/LoanNoOffers";
import { LoanSuccess } from "@/components/Client/home/Loan/LoanSuccess";
import { router, useLocalSearchParams } from "expo-router";
import { useSimulation } from "@/hooks/useSimulation";
import { BankOffer } from "@/models/creditModels";
import { useOffer } from "@/hooks/useOffer";

export default function ClientLoanScreen() {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const params = useLocalSearchParams();
  const amount = params.amount as string;
  const installments = params.installments as string;
  
  const [selectedOffer, setSelectedOffer] = useState<BankOffer | null>(null);
  
  const {
    simulationResult,
    loading,
    handleSimulation,
    currentStep,
    setCurrentStep,
  } = useSimulation();

  const { handleOffer, offerResult } = useOffer();

  // Ejecutar la simulación cuando el usuario confirme
  const handleConfirmLoanRequest = () => {
    handleSimulation(parseInt(amount), parseInt(installments));
  };

  const handleSelectOffer = (offer: BankOffer) => {
    setSelectedOffer(offer);
    setCurrentStep("detail");
  };

  const handleAcceptOffer = async (offer: BankOffer) => {
    setCurrentStep("processing");
    const result = await handleOffer(
      parseInt(amount), 
      parseInt(installments), 
      offer.bankName
    );
    if (result) {
      setCurrentStep("success");
    } else {
      // Si hay error, volver al detalle
      setCurrentStep("detail");
    }
  };

  const handleBackToOptions = () => {
    setCurrentStep("options");
    setSelectedOffer(null);
  };

  const handleFinish = () => {
    router.replace("/(client)/(home)/loan");
  };

  return (
    <View style={styles.container}>
      {currentStep === "confirmation" && (
        <LoanConfirmation
          amount={amount}
          installments={installments}
          onConfirm={handleConfirmLoanRequest}
          loading={loading}
        />
      )}
      
      {(currentStep === "searching" || currentStep === "processing") && (
        <LoanSearching 
          message={currentStep === "processing" ? "Procesando tu solicitud..." : undefined}
        />
      )}
      
      {currentStep === "no_offers" && (
        <LoanNoOffers
          amount={amount}
          installments={installments}
        />
      )}
      
      {currentStep === "options" && simulationResult && (
        <LoanOptions
          simulationResult={simulationResult}
          requestedAmount={amount}
          requestedInstallments={installments}
          onSelectOffer={handleSelectOffer}
        />
      )}
      
      {currentStep === "detail" && selectedOffer && (
        <LoanDetail
          offer={selectedOffer}
          requestedAmount={amount}
          requestedInstallments={installments}
          onAccept={handleAcceptOffer}
          onBack={handleBackToOptions}
        />
      )}

      {currentStep === "success" && offerResult && (
        <LoanSuccess
          offerResult={offerResult}
          requestedAmount={amount}
          requestedInstallments={installments}
          onFinish={handleFinish}
        />
      )}
    </View>
  );
}