import { View } from "react-native";import { createLoanStyles } from "@/assets/styles/loan.styles";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { LoanOffer, LoanOptions } from "@/components/Client/home/Loan/LoanOptions";
import { LoanSearching } from "@/components/Client/home/Loan/LoanSearching";
import { LoanDetail } from "@/components/Client/home/Loan/LoanDetail";
import { router, useLocalSearchParams } from "expo-router";

type LoanStep = "searching" | "options" | "detail";

export default function ClientLoanScreen() {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const params = useLocalSearchParams();
  const amount = params.amount as string;
  const installments = params.installments as string;
  const [currentStep, setCurrentStep] = useState<LoanStep>("searching");
  const [requestedAmount, setRequestedAmount] = useState("");
  const [requestedInstallments, setRequestedInstallments] = useState("");
  const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<LoanOffer | null>(null);

  useEffect(() => {
    handleLoanRequest(amount, installments);
  }, [amount, installments]);

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
    alert(`¡Oferta de ${offer.bankName} aceptada con éxito!`);
    setRequestedAmount("");
    setRequestedInstallments("");
    setLoanOffers([]);
    setSelectedOffer(null);
    router.replace("/(client)/(home)/loan");
  };

  const handleBackToOptions = () => {
    setCurrentStep("options");
    setSelectedOffer(null);
  };

  const handleBackToRequest = () => {
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