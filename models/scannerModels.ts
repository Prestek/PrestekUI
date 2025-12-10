export type Gender = "M" | "F";

export interface ParsedCedula {
  document: string | null;
  name: string | null;
  lastName: string | null;
  date: string | null;
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