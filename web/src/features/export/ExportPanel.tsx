'use client';

import { Download, FileArchive, FileCode2, FileImage, FileJson, FileSpreadsheet, FileText, Printer } from 'lucide-react';
import { useState } from 'react';
import type { Locale, PrismaProject } from '../../domain/types';
import { exportProject } from './exporters';

const formats = [
  { id: 'pdf', label: 'PDF vetorial', icon: FileText },
  { id: 'svg', label: 'SVG', icon: FileCode2 },
  { id: 'png', label: 'PNG 2×', icon: FileImage },
  { id: 'html', label: 'HTML interativo', icon: FileCode2 },
  { id: 'csv', label: 'CSV', icon: FileSpreadsheet },
  { id: 'xlsx', label: 'XLSX', icon: FileSpreadsheet },
  { id: 'json', label: 'Backup JSON', icon: FileJson },
  { id: 'report', label: 'Relatório HTML', icon: FileText },
  { id: 'zip', label: 'Pacote ZIP', icon: FileArchive },
] as const;

export function ExportPanel({ project, locale }: { project: PrismaProject; locale: Locale }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const run = async (format: (typeof formats)[number]['id']) => {
    setBusy(format); setError('');
    try { await exportProject(project, locale, format); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Não foi possível exportar o arquivo.'); }
    finally { setBusy(null); }
  };
  return (
    <section className="export-panel" aria-labelledby="export-title">
      <div className="panel-heading"><div><p className="kicker">PUBLICAÇÃO</p><h2 id="export-title">Exportar projeto</h2></div><Download aria-hidden="true" /></div>
      <p>Arquivos são gerados localmente. Revise direitos autorais antes de publicar resultados licenciados de bases, resumos ou documentos protegidos.</p>
      <div className="export-grid">
        {formats.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => run(id)} disabled={Boolean(busy)}>
            <Icon size={17} aria-hidden="true" /><span>{busy === id ? 'Gerando…' : label}</span>
          </button>
        ))}
        <button type="button" onClick={() => window.print()}><Printer size={17} aria-hidden="true" /><span>Imprimir</span></button>
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
    </section>
  );
}
