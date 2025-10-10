/**
 * Theme configuration
 * Centraliza colores, espaciados, tipografía y otros valores de diseño
 */

export const colors = {
  // Primary
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#4DA3FF',

  // Status
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // Neutrals
  black: '#000000',
  white: '#FFFFFF',
  gray900: '#1a1a1a',
  gray800: '#333333',
  gray700: '#4d4d4d',
  gray600: '#666666',
  gray500: '#808080',
  gray400: '#999999',
  gray300: '#b3b3b3',
  gray200: '#cccccc',
  gray100: '#e6e6e6',
  gray50: '#f5f5f5',

  // OAuth Providers
  google: '#DB4437',
  facebook: '#1877F2',
  microsoft: '#00A4EF',

  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  
  // Text
  textPrimary: '#1a1a1a',
  textSecondary: '#666666',
  textDisabled: '#999999',
  textInverse: '#FFFFFF',

  // Borders
  border: '#cccccc',
  borderLight: '#e6e6e6',
  borderDark: '#999999',
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
}

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
}

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
}

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
}

export type Theme = typeof theme
