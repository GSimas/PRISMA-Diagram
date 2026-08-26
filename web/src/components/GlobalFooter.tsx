'use client';

import { Coffee } from 'lucide-react';
import { useApp } from '../app/AppProviders';

export function GlobalFooter() {
  const { t } = useApp();
  return (
    <>
      <footer className="global-footer">
        <p>{t('developedBy')} <a href="https://gustavosimas.com/" target="_blank" rel="noopener noreferrer">Gustavo Simas</a></p>
        <nav aria-label="Links institucionais">
          <a href="/about">{t('about')}</a><a href="/methodology">{t('methodology')}</a>
          <a href="/privacy">{t('privacy')}</a><a href="/accessibility">{t('accessibility')}</a>
          <a href="/sources">{t('sources')}</a><a href="/license">{t('license')}</a>
          <a href="https://github.com/GSimas/PRISMA-Diagram" target="_blank" rel="noopener noreferrer">Código-fonte</a>
        </nav>
        <small>Ferramenta independente baseada no PRISMA 2020. Sem afiliação ou endosso do PRISMA Executive.</small>
      </footer>
      <aside className="coffee-region" aria-label={t('coffee')}>
        <a className="coffee-button" href="https://link.mercadopago.com.br/strangerhits" target="_blank" rel="noopener noreferrer" aria-label={t('coffee')} title={t('coffee')}>
          <Coffee size={18} aria-hidden="true" /><span>{t('coffee')}</span>
        </a>
      </aside>
    </>
  );
}
