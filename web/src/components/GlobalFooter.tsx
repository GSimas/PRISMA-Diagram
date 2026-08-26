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
          <a className="footer-icon-link" href="https://github.com/GSimas/PRISMA-Diagram" target="_blank" rel="noopener noreferrer" aria-label={t('sourceCode')} title={t('sourceCode')}>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/></svg>
          </a>
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
