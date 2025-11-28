export const creditUserRequests = [
  {
    bank: "Davivienda",
    date: "15 June 2023",
    amount: 5000000,
    status: "Approved",
  },
  {
    bank: "Bancolombia",
    date: "10 May 2023",
    amount: 3500000,
    status: "Pending",
  },
  {
    bank: "Banco Nacional",
    date: "22 March 2023",
    amount: 7500000,
    status: "Rejected",
  },
  { bank: "BBVA", date: "05 Marzo 2023", amount: 4200000, status: "Approved" },
  {
    bank: "Davivienda",
    date: "18 February 2023",
    amount: 2800000,
    status: "Approved",
  },
  {
    bank: "Banco de Bogotá",
    date: "30 January 2023",
    amount: 6000000,
    status: "Pending",
  },
  {
    bank: "Bancolombia",
    date: "12 December 2022",
    amount: 3000000,
    status: "Approved",
  },
  {
    bank: "Banco Nacional",
    date: "25 November 2022",
    amount: 5500000,
    status: "Rejected",
  },
];

export type LoanRequestStatus = "Pending" | "Approved" | "Rejected";

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
    status: "Pending",
    reason: "Capital de trabajo para Pyme",
  },
  {
    id: "REQ-1200",
    applicant: "Carlos Pérez",
    requestedAt: "2025-11-08T14:15:00",
    amount: 15000000,
    status: "Approved",
    reason: "Compra de vehículo de reparto",
  },
  {
    id: "REQ-1199",
    applicant: "Lucía Torres",
    requestedAt: "2025-11-07T11:45:00",
    amount: 42000000,
    status: "Rejected",
    reason: "Consolidación de deudas",
  },
  {
    id: "REQ-1198",
    applicant: "Julián Herrera",
    requestedAt: "2025-11-06T16:05:00",
    amount: 28000000,
    status: "Pending",
    reason: "Ampliación de local comercial",
  },
];

export const statusLabels: Record<
  LoanRequestStatus,
  { label: string; color: string }
> = {
  Pending: { label: "Pendiente", color: "#F4A259" },
  Approved: { label: "Aprobada", color: "#32B768" },
  Rejected: { label: "Rechazada", color: "#D94141" },
};
