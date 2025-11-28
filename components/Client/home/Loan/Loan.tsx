import { createLoanStyles } from "@/assets/styles/loan.styles";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";
import { LoanRequest } from "./LoanRequest";
import { LoanSearching } from "./LoanSearching";
import { LoanOptions, LoanOffer } from "./LoanOptions";
import { LoanDetail } from "./LoanDetail";

type LoanStep = "request" | "searching" | "options" | "detail";

export const Loan = () => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const [currentStep, setCurrentStep] = useState<LoanStep>("request");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [requestedInstallments, setRequestedInstallments] = useState("");
  const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<LoanOffer | null>(null);

  const handleLoanRequest = (amount: string, installments: string) => {
    setRequestedAmount(amount);
    setRequestedInstallments(installments);
    setCurrentStep("searching");

    setTimeout(() => {
      const mockOffers = generateMockOffers(parseInt(amount), parseInt(installments));
      setLoanOffers(mockOffers);
      setCurrentStep("options");
    }, 5000);
  };

  const handleSelectOffer = (offer: LoanOffer) => {
    setSelectedOffer(offer);
    setCurrentStep("detail");
  };

  const handleAcceptOffer = (offer: LoanOffer) => {
    console.log("Oferta aceptada:", offer);
    alert(`¡Oferta de ${offer.bankName} aceptada con éxito!`);
    setCurrentStep("request");
    setRequestedAmount("");
    setRequestedInstallments("");
    setLoanOffers([]);
    setSelectedOffer(null);
  };

  const handleBackToOptions = () => {
    setCurrentStep("options");
    setSelectedOffer(null);
  };

  const handleBackToRequest = () => {
    setCurrentStep("request");
    setLoanOffers([]);
  };

  const generateMockOffers = (amount: number, installments: number): LoanOffer[] => {
    const banks = [
      { name: "Banco de Bogotá", rate: 1.8, approval: 95 },
      { name: "Bancolombia", rate: 1.95, approval: 90 },
      { name: "Davivienda", rate: 2.1, approval: 85 },
      { name: "BBVA Colombia", rate: 1.75, approval: 92 },
      { name: "Banco de Occidente", rate: 2.05, approval: 88 },
    ];

    return banks.map((bank, index) => {
      const monthlyRate = bank.rate / 100;
      const monthlyPayment = Math.round(
        (amount * monthlyRate * Math.pow(1 + monthlyRate, installments)) /
          (Math.pow(1 + monthlyRate, installments) - 1)
      );
      const totalPayment = monthlyPayment * installments;

      return {
        id: `offer-${index}`,
        bankName: bank.name,
        bankLogo: "",
        interestRate: bank.rate * 12,
        amount: amount,
        installments: installments,
        monthlyPayment: monthlyPayment,
        totalPayment: totalPayment,
        approvalProbability: bank.approval,
      };
    });
  };

  return (
    <View style={styles.container}>
      {currentStep === "request" && <LoanRequest onSubmit={handleLoanRequest} />}
      {currentStep === "searching" && <LoanSearching />}
      {currentStep === "options" && (
        <LoanOptions
          offers={loanOffers}
          requestedAmount={requestedAmount}
          requestedInstallments={requestedInstallments}
          onSelectOffer={handleSelectOffer}
          onBack={handleBackToRequest}
        />
      )}
      {currentStep === "detail" && selectedOffer && (
        <LoanDetail
          offer={selectedOffer}
          onAccept={handleAcceptOffer}
          onBack={handleBackToOptions}
        />
      )}
    </View>
  );
};