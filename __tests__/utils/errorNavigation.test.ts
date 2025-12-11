import { router } from 'expo-router';
import { navigateToError, replaceWithError } from '../../utils/errorNavigation';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

describe('errorNavigation utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('navigateToError', () => {
    it('should navigate with default params when no params provided', () => {
      navigateToError();

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: '¡Ups! Algo salió mal',
          message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.',
        },
      });
    });

    it('should navigate with custom title', () => {
      navigateToError({ title: 'Error de conexión' });

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: 'Error de conexión',
          message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.',
        },
      });
    });

    it('should navigate with custom message', () => {
      navigateToError({ message: 'No se pudo conectar al servidor' });

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: '¡Ups! Algo salió mal',
          message: 'No se pudo conectar al servidor',
        },
      });
    });

    it('should navigate with both custom title and message', () => {
      navigateToError({
        title: 'Error de autenticación',
        message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      });

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: 'Error de autenticación',
          message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
        },
      });
    });

    it('should navigate with empty object params', () => {
      navigateToError({});

      expect(router.push).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: '¡Ups! Algo salió mal',
          message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.',
        },
      });
    });
  });

  describe('replaceWithError', () => {
    it('should replace with default params when no params provided', () => {
      replaceWithError();

      expect(router.replace).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: '¡Ups! Algo salió mal',
          message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.',
        },
      });
    });

    it('should replace with custom title', () => {
      replaceWithError({ title: 'Error fatal' });

      expect(router.replace).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: 'Error fatal',
          message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.',
        },
      });
    });

    it('should replace with custom message', () => {
      replaceWithError({ message: 'La aplicación debe reiniciarse' });

      expect(router.replace).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: '¡Ups! Algo salió mal',
          message: 'La aplicación debe reiniciarse',
        },
      });
    });

    it('should replace with both custom title and message', () => {
      replaceWithError({
        title: 'Sesión inválida',
        message: 'Debes iniciar sesión para continuar.',
      });

      expect(router.replace).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: 'Sesión inválida',
          message: 'Debes iniciar sesión para continuar.',
        },
      });
    });

    it('should replace with empty object params', () => {
      replaceWithError({});

      expect(router.replace).toHaveBeenCalledWith({
        pathname: '/(error)',
        params: {
          title: '¡Ups! Algo salió mal',
          message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.',
        },
      });
    });

    it('should use replace instead of push', () => {
      replaceWithError();

      expect(router.replace).toHaveBeenCalled();
      expect(router.push).not.toHaveBeenCalled();
    });
  });

  describe('comparison between navigateToError and replaceWithError', () => {
    it('should use push for navigateToError and replace for replaceWithError', () => {
      navigateToError();
      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.replace).toHaveBeenCalledTimes(0);

      jest.clearAllMocks();

      replaceWithError();
      expect(router.push).toHaveBeenCalledTimes(0);
      expect(router.replace).toHaveBeenCalledTimes(1);
    });
  });
});
