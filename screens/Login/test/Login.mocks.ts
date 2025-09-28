import { LoginFormData, LoginProps } from '../types';

export const aLoginProps = (overrides: Partial<LoginProps> = {}): LoginProps => ({
  locale: 'es',
  ...overrides,
});

export const aLoginFormData = (overrides: Partial<LoginFormData> = {}): LoginFormData => ({
  email: 'test@sanitas.com',
  username: 'usuario_test',
  ...overrides,
});

export const mockUseAuthStore = {
  email: '',
  username: '',
  setEmail: jest.fn(),
  setUsername: jest.fn(),
  setCredentials: jest.fn(),
  clearCredentials: jest.fn(),
};

type TranslationKeys = 'login-title' | 'login-email-placeholder' | 'login-username-placeholder' | 'login-submit-button';

export const mockUseTranslations = (locale: string = 'es') => {
  const translations: Record<string, Record<TranslationKeys, string>> = {
    es: {
      'login-title': 'Iniciar Sesión',
      'login-email-placeholder': 'Correo',
      'login-username-placeholder': 'Nombre de usuario',
      'login-submit-button': 'Iniciar sesión',
    },
    en: {
      'login-title': 'Sign In',
      'login-email-placeholder': 'Mail',
      'login-username-placeholder': 'User name',
      'login-submit-button': 'Sign in',
    },
  };

  return (key: string) => translations[locale]?.[key as TranslationKeys] || key;
};
