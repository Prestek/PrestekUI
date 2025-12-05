export enum LoanRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const LoanRequestStatusLabel: Record<string, string> = {
  PENDING: "Pendiente",
  APPROVED: "Aprobada",
  REJECTED: "Rechazada",
}


export enum BankCode {
  DAVI = "DAVI",
  BCO = "BCO",
  COLT = "COLT",
}

export const BankCodeLabel: Record<string, string> = {
  DAVI: "Davivienda",
  BCO: "Bancolombia",
  COLT: "Coltefinanciera",
}