import { Mask, MaskArray } from 'react-native-mask-input';

/**
 * Crea una máscara dinámica para moneda colombiana
 * Formato: $1.600.000
 */
export const createCurrencyMask = (value: string = ''): MaskArray => {
  const cleanValue = value.replace(/\D/g, '');
  const mask: MaskArray = ['$'];
  
  if (cleanValue.length === 0) {
    return ['$', /\d/];
  }
  
  const digits = cleanValue.split('');
  const length = digits.length;
  
  digits.forEach((_, index) => {
    const position = length - index;
    mask.push(/\d/);
    
    if (position > 1 && (position - 1) % 3 === 0) {
      mask.push('.');
    }
  });
  
  return mask;
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

