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