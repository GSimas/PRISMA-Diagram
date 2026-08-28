'use client';

import { Download, FileArchive, FileCode2, FileImage, FileJson, FileSpreadsheet, FileText, Printer } from 'lucide-react';
import { useState } from 'react';
import type { Locale, PrismaProject } from '../../domain/types';
import { translations, type TranslationKey } from '../../i18n/translations';
import { exportProject } from './exporters';

const formats: { id: 'pdf' | 'svg' | 'png' | 'html' | 'csv' | 'xlsx' | 'json' | 'report' | 'zip'; labelKey: TranslationKey; icon: typeof FileText }[] = [
  { id: 'pdf', labelKey: 'pdfVector', icon: FileText },
  { id: 'svg', labelKey: 'svg', icon: FileCode2 },
  { id: 'png', labelKey: 'png2x', icon: FileImage },
  { id: 'html', labelKey: 'htmlInteractive', icon: FileCode2 },
  { id: 'csv', labelKey: 'csv', icon: FileSpreadsheet },
  { id: 'xlsx', labelKey: 'xlsx', icon: FileSpreadsheet },
  { id: 'json', labelKey: 'jsonBackup', icon: FileJson },
  { id: 'report', labelKey: 'htmlReport', icon: FileText },
  { id: 'zip', labelKey: 'zipPackage', icon: FileArchive },
];

export function ExportPanel({ project, locale }: { project: PrismaProject; locale: Locale }) {
  const dict = translations[locale || 'pt-BR'] || translations['pt-BR'];
  const t = (key: TranslationKey) => dict[key] || key;
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');

  const run = async (format: (typeof formats)[number]['id']) => {
    setBusy(format);
    setError('');
    try {
      await exportProject(project, locale, format);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Error exporting file.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="export-panel" aria-labelledby="export-title">
      <div className="panel-heading">
        <div>
          <p className="kicker">{t('publication')}</p>
          <h2 id="export-title">{t('exportProject')}</h2>
        </div>
        <Download aria-hidden="true" />
      </div>
      <p>{t('exportLead')}</p>
      <div className="export-grid">
        {formats.map(({ id, labelKey, icon: Icon }) => (
          <button key={id} type="button" onClick={() => run(id)} disabled={Boolean(busy)}>
            <Icon size={17} aria-hidden="true" />
            <span>{busy === id ? t('generating') : t(labelKey)}</span>
          </button>
        ))}
        <button type="button" onClick={() => window.print()}>
          <Printer size={17} aria-hidden="true" />
          <span>{t('print')}</span>
        </button>
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
    </section>
  );
}
