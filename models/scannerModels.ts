export type Sexo = "M" | "F";

export interface ParsedCedula {
  documento: string | null;
  nombres: string | null;
  apellidos: string | null;
  fecha: string | null;
  sexo: Sexo | null;
  nacionalidad: string | null;
  raw: string;
}

export interface ScanResult {
  raw: string;
  parsed: ParsedCedula | null;
}