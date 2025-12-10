import { router } from "expo-router";

interface ErrorNavigationParams {
  title?: string;
  message?: string;
}

/**
 * Navega a la pantalla de error con un mensaje personalizado
 * @param params - Parámetros opcionales para el título y mensaje de error
 * @example
 * // Uso básico
 * navigateToError();
 * 
 * // Con mensaje personalizado
 * navigateToError({ 
 *   title: "Error de conexión",
 *   message: "No se pudo conectar al servidor" 
 * });
 */
export const navigateToError = (params?: ErrorNavigationParams) => {
  router.push({
    pathname: "/(error)",
    params: {
      title: params?.title || "¡Ups! Algo salió mal",
      message: params?.message || "Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.",
    },
  });
};

/**
 * Reemplaza la pantalla actual con la pantalla de error
 * Útil cuando no quieres que el usuario pueda volver atrás
 */
export const replaceWithError = (params?: ErrorNavigationParams) => {
  router.replace({
    pathname: "/(error)",
    params: {
      title: params?.title || "¡Ups! Algo salió mal",
      message: params?.message || "Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.",
    },
  });
};

