import {
  ParsedCedula,
  ScanResult,
  BarcodeScannedProps,
} from "@/models/scannerModels";
import { useCameraPermissions } from "expo-camera";
import { useCallback, useState } from "react";

// ---- Hook ----
export const useScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [lastData, setLastData] = useState<ScanResult | null>(null);

  const handleBarCodeScanned = useCallback(
    ({ type, data }: BarcodeScannedProps) => {
      setScanned((prevScanned) => {
        // Prevenir múltiples escaneos si ya se escaneó
        if (prevScanned) return prevScanned;

        const parsed = parseCedulaPdf417(data);
        setLastData({ raw: data, parsed });

        return true;
      });
    },
    [] // Sin dependencias - la función es estable
  );

  const resetScanner = useCallback(() => {
    setScanned(false);
    setLastData(null);
  }, []);

  return {
    hasPermission: permission?.granted ?? null,
    requestPermission,
    scanned,
    lastData,
    handleBarCodeScanned,
    resetScanner,
    setScanned,
  };
};

function sanitizeRaw(raw: string): string {
  const cleaned = raw
    .replaceAll(/[^\x20-\x7EÁÉÍÓÚÑáéíóúÜü]/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim();

  return cleaned.normalize("NFC");
}

function extractDocumentFromLongNumber(s: string): string | null {
  // Buscar números largos (15-20 dígitos) seguidos por letras mayúsculas (apellidos)
  const longNumberBeforeNames = /(\d{15,20})(?=\s*[A-ZÁÉÍÓÚÑ]{3,})/.exec(s);
  if (longNumberBeforeNames) {
    return longNumberBeforeNames[1].slice(-10);
  }

  // Fallback: buscar cualquier número largo de 15-20 dígitos
  const longNumberMatch = /\b(\d{15,20})\b/.exec(s);
  if (longNumberMatch) {
    return longNumberMatch[1].slice(-10);
  }

  return null;
}

function extractDocumentFromShortNumber(s: string): string | null {
  // Buscar números de 8-12 dígitos que NO empiecen con 0
  const allMatches = s.match(/\b([1-9]\d{7,11})\b/g);
  if (!allMatches || allMatches.length === 0) return null;

  const validDocs = allMatches.filter((m) => m.length >= 8 && m.length <= 12);
  if (validDocs.length === 0) return null;

  // Preferir números de 10 dígitos (formato estándar de cédula colombiana)
  return validDocs.find((m) => m.length === 10) || validDocs[0];
}

function extractDocument(s: string): string | null {
  let document = extractDocumentFromLongNumber(s);

  if (!document) {
    document = extractDocumentFromShortNumber(s);
  }

  // Normalizar: quitar ceros iniciales
  if (document) {
    document = document.replace(/^0+/, "") || document;
  }

  return document;
}

function extractNamesFromPattern(s: string): { name: string; lastName: string } | null {
  const pattern =
    /\d{15,20}\s*([A-ZÁÉÍÓÚÑ]+)\s+([A-ZÁÉÍÓÚÑ]+)\s+([A-ZÁÉÍÓÚÑ]+)\s+([A-ZÁÉÍÓÚÑ]+)\s+[01][MF]\d{8}/;
  const nameMatch = pattern.exec(s);

  if (nameMatch) {
    return {
      lastName: `${nameMatch[1]} ${nameMatch[2]}`,
      name: `${nameMatch[3]} ${nameMatch[4]}`,
    };
  }

  return null;
}

function extractNamesFromTokens(s: string): { name: string | null; lastName: string | null } {
  const skipTokens = new Set(["PUBDSK", "PUBDSK_1", "PubDSK", "DSK"]);
  const upperTokens = s.match(/[A-ZÁÉÍÓÚÑ]{3,}/g) || [];
  const humans = upperTokens.filter(
    (w) => !skipTokens.has(w) && w.length >= 3 && w.length <= 30 && !/^\d+$/.test(w)
  );

  if (humans.length >= 4) {
    return { lastName: `${humans[0]} ${humans[1]}`, name: `${humans[2]} ${humans[3]}` };
  }
  if (humans.length === 3) {
    return { lastName: `${humans[0]} ${humans[1]}`, name: humans[2] };
  }
  if (humans.length === 2) {
    return { lastName: humans[0], name: humans[1] };
  }

  return { lastName: null, name: null };
}

export function parseCedulaPdf417(
  raw: string | null | undefined
): ParsedCedula | null {
  if (!raw || typeof raw !== "string") return null;

  const s = sanitizeRaw(raw);
  const document = extractDocument(s);
  const names = extractNamesFromPattern(s) || extractNamesFromTokens(s);

  return {
    document,
    name: names.name,
    lastName: names.lastName,
  };
}
