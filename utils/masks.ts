import { Mask, MaskArray } from 'react-native-mask-input';

/**
 * Crea una máscara dinámica para moneda colombiana
 * Formato: $1.600.000
 */
export const formatAmount = (text: string, setAmount: (amount: string) => void) => {
  const cleanText = text.replace(/[^0-9]/g, "");
  if (cleanText) {
    const formatted = new Intl.NumberFormat("es-CO").format(parseInt(cleanText));
    setAmount(cleanText);
    return cleanText;
  }
  setAmount("");
  return "";
};

/**
 * Formatea un número como moneda colombiana
 */
export const formatCurrency = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  
  if (!cleanValue) return '';
  
  const number = parseInt(cleanValue, 10);
  return number.toLocaleString('es-CO');
};

/**
 * Extrae el valor numérico de un string de moneda formateado
 */
export const parseCurrency = (value: string): number => {
  const cleanValue = value.replace(/\D/g, '');
  return parseInt(cleanValue, 10) || 0;
};

/**
 * Máscara para teléfono colombiano
 * Formato: (300) 123-4567
 */
export const PHONE_MASK: Mask = [
  '(', /\d/, /\d/, /\d/, ')', ' ',
  /\d/, /\d/, /\d/, '-',
  /\d/, /\d/, /\d/, /\d/
];

/**
 * Máscara para cédula colombiana
 * Formato: 1.234.567.890
 */
export const CEDULA_MASK: Mask = [
  /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/
];

