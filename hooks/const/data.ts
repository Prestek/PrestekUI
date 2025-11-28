import { LoanRequestStatus } from "@/models/enums/Request";

export const creditUserRequests = [
  {
    bank: "Davivienda",
    date: "15 de junio de 2023",
    amount: 5000000,
    status: LoanRequestStatus.APPROVED.toString(),
  },
  {
    bank: "Bancolombia",
    date: "10 de mayo de 2023",
    amount: 3500000,
    status: LoanRequestStatus.PENDING.toString(),
  },
  {
    bank: "Banco Nacional",
    date: "22 de marzo de 2023",
    amount: 7500000,
    status: LoanRequestStatus.REJECTED.toString(),
  },
  { bank: "BBVA", date: "05 de marzo de 2023", amount: 4200000, status: LoanRequestStatus.APPROVED.toString() },
  {
    bank: "Davivienda",
    date: "18 de febrero de 2023",
    amount: 2800000,
    status: LoanRequestStatus.APPROVED.toString(),
  },
  {
    bank: "Banco de Bogotá",
    date: "30 de enero de 2023",
    amount: 6000000,
    status: LoanRequestStatus.PENDING.toString(),
  },
  {
    bank: "Bancolombia",
    date: "12 de diciembre de 2022",
    amount: 3000000,
    status: LoanRequestStatus.APPROVED.toString(),
  },
  {
    bank: "Banco Nacional",
    date: "25 de noviembre de 2022",
    amount: 5500000,
    status: LoanRequestStatus.REJECTED.toString(),
  },
];


export type LoanRequest = {
  id: string;
  applicant: string;
  requestedAt: string;
  amount: number;
  status: LoanRequestStatus;
  reason: string;
};

export const initialRequests: LoanRequest[] = [
  {
    id: "REQ-1201",
    applicant: "María Gómez",
    requestedAt: "2025-11-10T09:30:00",
    amount: 35000000,
    status: LoanRequestStatus.PENDING,
    reason: "Capital de trabajo para Pyme",
  },
  {
    id: "REQ-1200",
    applicant: "Carlos Pérez",
    requestedAt: "2025-11-08T14:15:00",
    amount: 15000000,
    status: LoanRequestStatus.APPROVED,
    reason: "Compra de vehículo de reparto",
  },
  {
    id: "REQ-1199",
    applicant: "Lucía Torres",
    requestedAt: "2025-11-07T11:45:00",
    amount: 42000000,
    status: LoanRequestStatus.REJECTED,
    reason: "Consolidación de deudas",
  },
  {
    id: "REQ-1198",
    applicant: "Julián Herrera",
    requestedAt: "2025-11-06T16:05:00",
    amount: 28000000,
    status: LoanRequestStatus.PENDING,
    reason: "Ampliación de local comercial",
  },
];

export const statusLabels: Record<
  LoanRequestStatus,
  { label: string; color: string }
> = {
  [LoanRequestStatus.PENDING]: { label: "Pendiente", color: "#F4A259" },
  [LoanRequestStatus.APPROVED]: { label: "Aprobada", color: "#32B768" },
  [LoanRequestStatus.REJECTED]: { label: "Rechazada", color: "#D94141" },
};
