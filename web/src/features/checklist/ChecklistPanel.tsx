'use client';

import { CheckCircle2, CircleDashed, ExternalLink } from 'lucide-react';
import { checklistSections } from '../../domain/checklist';
import type { ChecklistEntry, PrismaProject } from '../../domain/types';

export function ChecklistPanel({ project, onChange }: { project: PrismaProject; onChange: (project: PrismaProject) => void }) {
  const completed = project.checklist.filter((entry) => entry.status === 'complete' || entry.status === 'not-applicable').length;
  const progress = Math.round((completed / 27) * 100);
  const patch = (item: number, update: Partial<ChecklistEntry>) => {
    onChange({ ...project, checklist: project.checklist.map((entry) => entry.item === item ? { ...entry, ...update } : entry) });
  };
  return (
    <section className="checklist-module" aria-labelledby="checklist-title">
      <header className="module-header">
        <div><p className="kicker">27 ITENS · CC BY 4.0</p><h2 id="checklist-title">Checklist PRISMA 2020</h2><p>Acompanhe onde cada item é relatado. Este módulo auxilia o relato; não certifica conformidade editorial.</p></div>
        <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` } as React.CSSProperties}><strong>{progress}%</strong><span>{completed}/27</span></div>
      </header>
      {checklistSections.map((section) => {
        const sectionEntries = section.items.map((item) => project.checklist.find((entry) => entry.item === item.item)!);
        const sectionDone = sectionEntries.filter((entry) => entry.status === 'complete' || entry.status === 'not-applicable').length;
        return (
          <details className="checklist-section" key={section.section} open={section.section === 'Título'}>
            <summary><span>{sectionDone === section.items.length ? <CheckCircle2 size={18} /> : <CircleDashed size={18} />}{section.section}</span><small>{sectionDone}/{section.items.length}</small></summary>
            <div>
              {section.items.map(({ item, title }) => {
                const entry = project.checklist.find((candidate) => candidate.item === item)!;
                return (
                  <article className="checklist-item" key={item}>
                    <header><span className="item-number">{item}</span><h3>{title}</h3>
                      <select aria-label={`Status do item ${item}`} value={entry.status} onChange={(event) => patch(item, { status: event.target.value as ChecklistEntry['status'], reviewedAt: new Date().toISOString().slice(0, 10) })}>
                        <option value="not-started">Não iniciado</option><option value="in-progress">Em andamento</option>
                        <option value="complete">Concluído</option><option value="not-applicable">Não aplicável</option>
                      </select>
                    </header>
                    <div className="checklist-fields">
                      <label>Localização no manuscrito<input value={entry.location} onChange={(event) => patch(item, { location: event.target.value })} /></label>
                      <label>Página<input value={entry.page} onChange={(event) => patch(item, { page: event.target.value })} /></label>
                      <label>Seção<input value={entry.section} onChange={(event) => patch(item, { section: event.target.value })} /></label>
                      <label>URL ou referência<input type="url" value={entry.url} onChange={(event) => patch(item, { url: event.target.value })} /></label>
                      <label className="wide">Nota<textarea value={entry.note} onChange={(event) => patch(item, { note: event.target.value })} rows={2} /></label>
                    </div>
                    <a className="source-link" href="https://www.prisma-statement.org/prisma-2020-explanation-elaboration" target="_blank" rel="noopener noreferrer">Explicação e elaboração oficial <ExternalLink size={13} /></a>
                  </article>
                );
              })}
            </div>
          </details>
        );
      })}
    </section>
  );
}
