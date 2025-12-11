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
  // Quitar caracteres de control (excepto espacio) y reemplazar U+FFFD, etc.
  const cleaned = raw
    .replace(/[^\x20-\x7EÁÉÍÓÚÑáéíóúÜü]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.normalize("NFC");
}

export function parseCedulaPdf417(
  raw: string | null | undefined
): ParsedCedula | null {
  if (!raw || typeof raw !== "string") return null;

  const s = sanitizeRaw(raw);

  // 2) Documento: Buscar el número en el bloque largo que precede a los apellidos
  //    El formato es: [número largo de ~18 dígitos][APELLIDO1][APELLIDO2]...
  //    El documento está en los últimos 10 dígitos de ese número largo
  //    Ejemplo: 850275371001077841 -> el documento es 1001077841
  let document: string | null = null;

  // Buscar números largos (15-20 dígitos) que están seguidos inmediatamente por letras mayúsculas (apellidos)
  // Esto identifica el número correcto en la posición adecuada
  const longNumberBeforeNames = s.match(/(\d{15,20})(?=\s*[A-ZÁÉÍÓÚÑ]{3,})/);

  if (longNumberBeforeNames) {
    const longNum = longNumberBeforeNames[1];
    // El documento está en los últimos 10 dígitos del número largo
    // 850275371001077841 -> documento: 1001077841
    document = longNum.slice(-10);
  } else {
    // Fallback: buscar cualquier número largo de 15-20 dígitos
    const longNumberMatch = s.match(/\b(\d{15,20})\b/);
    if (longNumberMatch) {
      const longNum = longNumberMatch[1];
      document = longNum.slice(-10);
    }
  }

  // Si aún no encontramos documento, buscar patrón alternativo de 8-12 dígitos
  // PERO solo si no encontramos un número largo (para evitar capturar números incorrectos)
  if (!document) {
    // Buscar números de 8-12 dígitos que NO empiecen con 0
    // Esto evita capturar números de referencia incorrectos como 0369358580
    const allMatches = s.match(/\b([1-9]\d{7,11})\b/g);
    if (allMatches && allMatches.length > 0) {
      // Tomar el número que tenga exactamente 8-10 dígitos o el más largo si hay varios
      const validDocs = allMatches.filter(
        (m) => m.length >= 8 && m.length <= 12
      );
      if (validDocs.length > 0) {
        // Preferir números de 10 dígitos (formato estándar de cédula colombiana)
        document = validDocs.find((m) => m.length === 10) || validDocs[0];
      }
    }
  }

  // Normalizar el documento: quitar ceros iniciales (ej: 0060357381 -> 60357381)
  if (document) {
    document = document.replace(/^0+/, "") || document;
  }

  // 3) Nombres y Apellidos:
  //    Buscar la secuencia: [número largo][AP1][AP2][N1][N2][0F fecha]
  //    Los nombres están entre el número largo y el bloque de fecha
  const pattern =
    /\d{15,20}\s*([A-ZÁÉÍÓÚÑ]+)\s+([A-ZÁÉÍÓÚÑ]+)\s+([A-ZÁÉÍÓÚÑ]+)\s+([A-ZÁÉÍÓÚÑ]+)\s+[01][MF]\d{8}/;
  const nameMatch = s.match(pattern);

  let lastName: string | null = null;
  let name: string | null = null;

  if (nameMatch) {
    // nameMatch[1] = primer apellido
    // nameMatch[2] = segundo apellido
    // nameMatch[3] = primer nombre
    // nameMatch[4] = segundo nombre
    lastName = `${nameMatch[1]} ${nameMatch[2]}`;
    name = `${nameMatch[3]} ${nameMatch[4]}`;
  } else {
    // Fallback: buscar palabras en mayúsculas excluyendo tokens conocidos
    const skipTokens = new Set(["PUBDSK", "PUBDSK_1", "PubDSK", "DSK"]);
    const upperTokens = s.match(/[A-ZÁÉÍÓÚÑ]{3,}/g) || [];
    const humans = upperTokens.filter(
      (w) =>
        !skipTokens.has(w) &&
        w.length <= 30 &&
        w.length >= 3 &&
        !/^\d+$/.test(w) // excluir solo números
    );

    if (humans.length >= 4) {
      lastName = `${humans[0]} ${humans[1]}`;
      name = `${humans[2]} ${humans[3]}`;
    } else if (humans.length === 3) {
      lastName = `${humans[0]} ${humans[1]}`;
      name = humans[2];
    } else if (humans.length === 2) {
      lastName = humans[0];
      name = humans[1];
    }
  }

  return {
    document,
    name,
    lastName,
  };
}
