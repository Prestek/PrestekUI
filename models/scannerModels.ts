export type Gender = "M" | "F";

export interface ParsedCedula {
  document: string | null;
  name: string | null;
  lastName: string | null;
}

export interface ScanResult {
  raw: string;
  parsed: ParsedCedula | null;
}

export interface PermissionDeniedProps {
  requestPermission: () => void;
}

export interface CedulaScannerProps {
  handleBarCodeScanned: (data: BarcodeScannedProps) => void;
  setScanned: (scanned: boolean) => void;
}

export interface BarcodeScannedProps {
  type: string;
  data: string;
}

export interface CompleteProfileProps {
  data: ParsedCedula | null;
  additionalInformation?: {
    phone: string;
    monthlyIncome: string;
    monthlyExpenses: string;
    employmentStatus: EmploymentStatus;
  };
  isEditing: boolean;
  withScanner: boolean;
}

export type EmploymentStatus =
  | "Employed"
  | "Unemployed"
  | "Self-Employed"
  | "Student"
  | "Retired";

export const EmploymentStatusLabel: Record<EmploymentStatus, string> = {
  Employed: "Empleado",
  Unemployed: "Desempleado",
  "Self-Employed": "Independiente",
  Student: "Estudiante",
  Retired: "Jubilado",
};
