import { BankCode, LoanRequestStatus } from "./enums/Request";
import { User } from "./userModels";

export interface CreditProps {
  loan: {
    bank: string;
    totalAmount: number;
    interestRate: number;
    startDate: string;
    endDate: string;
    paidAmount: number;
    remainingAmount: number;
    progressPercentage: number;
  };
}

export interface Loan {
  bank: string;
  totalAmount: number;
  interestRate: number;
  startDate: string;
  endDate: string;
  paidAmount: number;
  remainingAmount: number;
  progressPercentage: number;
}

export interface NextPaymentProps {
  nextPaymentDate: string;
  nextPaymentAmount: number;
  paymentDateLabel: string;
}

export interface Simulation {
  userId: string;
  amount: number;
  termMonths: number;
  monthlyIncome: number;
}

// Respuesta del backend de simulación
export interface SimulationRecommendation {
  bestOption: string;
  reason: string;
  riskAssessment: string;
  summary: string;
}

export interface BankAnalysis {
  positives: string[];
  negatives: string[];
  monthlyPaymentAvg: number;
  totalCost: number;
  totalInterest: number;
  paymentToIncomeRatio: number;
}

export interface SimulationAnalysis {
  [bankKey: string]: BankAnalysis;
}

export interface SimulationResponse {
  recommendation: SimulationRecommendation;
  analysis: SimulationAnalysis;
}

// Tipo para mostrar en la UI
export interface BankOffer {
  bankKey: string;
  bankName: string;
  analysis: BankAnalysis;
  isRecommended: boolean;
}

export interface LoanRequestOffer extends Simulation {
  selectedEntity: string;
}

// Respuesta de la API al crear una solicitud de crédito
export interface ApplicationData {
  id: number;
  userId: string;
  amount: number;
  entity: string;
  status: LoanRequestStatus;
  applicationDate: number[];
  createdAt: number[];
}

export interface QuoteData {
  entity: string;
  monthlyPayment: number | null;
  totalCost: number | null;
  totalInterest: number | null;
  totalPayments: number | null;
}

export interface OfferResponse {
  success: boolean;
  message: string;
  application: ApplicationData;
  quote: QuoteData;
  creditScore: number;
}

export interface Application {
  bankName: string;
  bankCode: BankCode;
  id: number;
  status: LoanRequestStatus;
  applicationDate: string | number[];
  reviewDate?: string;
  approvalDate?: string;
  notes?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  creditOfferId?: number;
  userFullName?: string;
  creditOfferDescription?: string;
  amount: number;
}

export interface UpdateApplicationRequest {
  status: LoanRequestStatus;
  notes?: string;
  rejectionReason?: string;
}

export interface LoanConfirmationProps {
  amount: string;
  installments: string;
  onConfirm: () => void;
  loading: boolean;
}

export interface LoanOptionsProps {
  simulationResult: SimulationResponse;
  requestedAmount: string;
  requestedInstallments: string;
  onSelectOffer: (offer: BankOffer) => void;
}

export interface DetailProps {
  request: Application;
  role: "client" | "bank";
  user: User | null;
  bankCode: BankCode;
}
