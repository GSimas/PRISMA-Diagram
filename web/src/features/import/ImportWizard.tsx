'use client';

import { useRef, useState } from 'react';
import { FileUp, X } from 'lucide-react';
import { countKeys, type CountKey, type PrismaProject } from '../../domain/types';
import { createProject } from '../../domain/project';
import { restoreProject } from '../../storage/serialization';

interface Preview {
  headers: string[];
  rows: unknown[][];
  name: string;
}

export function ImportWizard({ onImport, compact = false }: { onImport: (project: PrismaProject) => void; compact?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [fieldColumn, setFieldColumn] = useState(0);
  const [valueColumn, setValueColumn] = useState(1);
  const [error, setError] = useState('');

  const readFile = async (file: File) => {
    setError('');
    try {
      if (file.name.toLowerCase().endsWith('.json')) {
        onImport(restoreProject(await file.text()));
        return;
      }
      const XLSX = await import('xlsx');
      const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: '' });
      if (matrix.length < 2) throw new Error('A tabela precisa de cabeçalho e ao menos uma linha de dados.');
      const headers = matrix[0].map((cell) => String(cell));
      setPreview({ headers, rows: matrix.slice(1, 21), name: file.name });
      const fieldIndex = headers.findIndex((header) => /field|campo|id/i.test(header));
      const valueIndex = headers.findIndex((header) => /value|valor|count|contagem|n$/i.test(header));
      setFieldColumn(fieldIndex >= 0 ? fieldIndex : 0);
      setValueColumn(valueIndex >= 0 ? valueIndex : Math.min(1, headers.length - 1));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Arquivo inválido.');
    }
  };

  const confirm = () => {
    if (!preview) return;
    const project = createProject({ title: `Importado de ${preview.name}` });
    let imported = 0;
    preview.rows.forEach((row) => {
      const field = String(row[fieldColumn]).trim() as CountKey;
      const value = Number(row[valueColumn]);
      if (countKeys.includes(field) && Number.isInteger(value) && value >= 0) {
        project.counts[field] = value;
        imported += 1;
      }
    });
    if (!imported) {
      setError('Nenhuma linha correspondeu aos IDs de campo do PRISMA Diagram. Confira o mapeamento.');
      return;
    }
    onImport(project);
    setPreview(null);
  };

  return (
    <section className={compact ? 'import-wizard compact' : 'import-wizard'} aria-labelledby="import-title">
      <div className="panel-heading"><div><p className="kicker">DADOS LOCAIS</p><h2 id="import-title">Importar projeto ou tabela</h2></div><FileUp aria-hidden="true" /></div>
      <p>Compatível com backup JSON e tabelas CSV/XLSX. A importação de contagens não reconstrói decisões de triagem automaticamente.</p>
      <input ref={inputRef} className="sr-only" type="file" accept=".json,.csv,.xlsx,.xls" aria-label="Arquivo para importação" onChange={(event) => event.target.files?.[0] && readFile(event.target.files[0])} />
      <button className="secondary-button" type="button" onClick={() => inputRef.current?.click()}><FileUp size={17} aria-hidden="true" /> Selecionar arquivo</button>
      {preview && (
        <div className="mapping-preview">
          <button className="icon-button close" type="button" onClick={() => setPreview(null)} aria-label="Fechar prévia"><X size={16} /></button>
          <h3>Mapeamento de colunas</h3>
          <div className="mapping-controls">
            <label>Coluna com ID do campo<select value={fieldColumn} onChange={(event) => setFieldColumn(Number(event.target.value))}>{preview.headers.map((header, index) => <option value={index} key={`${header}-${index}`}>{header || `Coluna ${index + 1}`}</option>)}</select></label>
            <label>Coluna com contagem<select value={valueColumn} onChange={(event) => setValueColumn(Number(event.target.value))}>{preview.headers.map((header, index) => <option value={index} key={`${header}-${index}`}>{header || `Coluna ${index + 1}`}</option>)}</select></label>
          </div>
          <div className="table-scroll"><table><thead><tr>{preview.headers.map((header, index) => <th key={`${header}-${index}`}>{header || `Coluna ${index + 1}`}</th>)}</tr></thead><tbody>{preview.rows.slice(0, 5).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{String(cell)}</td>)}</tr>)}</tbody></table></div>
          <button className="primary-button" type="button" onClick={confirm}>Validar e importar</button>
        </div>
      )}
      {error && <p className="field-error" role="alert">{error}</p>}
    </section>
  );
}
