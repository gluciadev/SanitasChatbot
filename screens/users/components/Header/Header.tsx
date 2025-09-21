import React from 'react'
import { useTranslations } from 'next-intl';

export const Header = () => {
    const t = useTranslations();
  return (
    <header>
      <h2>Header con traducción</h2>
      <div>
        <h3>Traducción:</h3>
        <p>{t('users-header-title')}</p>
      </div>
    </header>
  )
}
