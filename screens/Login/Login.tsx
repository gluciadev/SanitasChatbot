"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/services/zustand/authStore';
import { LoginFormData, LoginProps } from './types';
import Styles from './Login.module.css';

export const Login: React.FC<LoginProps> = ({ locale }) => {
  const t = useTranslations();
  const { setCredentials } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      username: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // Simular un pequeño delay para mostrar el estado de loading
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Guardar las credenciales en el store global
    setCredentials(data.email, data.username);
    
    console.log('Login data saved:', data);
  };

  return (
    <div className={Styles.loginContainer}>
      <div className={Styles.loginCard}>
        <div className={Styles.sanitasLogo}>
          <img 
            src="https://codeoscopic.com/wp-content/uploads/2024/07/ha-logo-sanitas.png" 
            alt="Sanitas Logo" 
            className={Styles.logoImage}
          />
        </div>
        
        <h1 className={Styles.loginTitle}>
          {t('login-title')}
        </h1>

        <form className={Styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={Styles.inputGroup}>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              placeholder={t('login-email-placeholder')}
              className={Styles.inputField}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={Styles.inputGroup}>
            <input
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 2,
                  message: 'Username must be at least 2 characters'
                }
              })}
              type="text"
              placeholder={t('login-username-placeholder')}
              className={Styles.inputField}
              disabled={isSubmitting}
            />
            {errors.username && (
              <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                {errors.username.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={Styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : t('login-submit-button')}
          </button>
        </form>
      </div>
    </div>
  );
};
