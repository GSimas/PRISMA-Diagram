'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, FileCheck2, Focus, HelpCircle, Maximize2, Redo2, Undo2, ZoomIn, ZoomOut } from 'lucide-react';
import { useApp } from '../../app/AppProviders';
import { useProjectStore } from '../../app/store';
import { calculateProject, hasOtherSources, isUpdatedModel, selectModel } from '../../domain/calculations';
import { countKeys, type CountKey, type NodeProvenance, type PrismaProject } from '../../domain/types';
import { validateProject } from '../../domain/validation';
import { getProject, saveProject } from '../../storage/db';
import { PrismaDiagram } from './PrismaDiagram';
import { ChecklistPanel } from '../checklist/ChecklistPanel';
import { ExportPanel } from '../export/ExportPanel';
import { ImportWizard } from '../import/ImportWizard';

const fieldSections: { title: string; fields: CountKey[] }[] = [
  { title: 'Estudos anteriores', fields: ['previousStudies', 'previousReports'] },
  { title: 'Identificação', fields: ['databases', 'registers', 'websites', 'organisations', 'citationSearching', 'otherSources'] },
  { title: 'Removidos antes da triagem', fields: ['duplicates', 'automationExcluded', 'removedOther'] },
  { title: 'Triagem e recuperação', fields: ['screened', 'recordsExcluded', 'reportsSought', 'reportsNotRetrieved'] },
  { title: 'Elegibilidade', fields: ['reportsAssessed', 'reportsExcluded'] },
  { title: 'Inclusão', fields: ['newStudies', 'newReports', 'totalStudies', 'totalReports'] },
];

const labels: Record<CountKey, string> = {
  previousStudies: 'Estudos incluídos na versão anterior', previousReports: 'Relatos da versão anterior',
  databases: 'Registros identificados em bases', registers: 'Registros identificados em registros',
  websites: 'Registros ou relatos em sites', organisations: 'Registros ou relatos em organizações',
  citationSearching: 'Busca por citações', otherSources: 'Outras fontes',
  duplicates: 'Duplicatas removidas', automationExcluded: 'Marcados como inelegíveis por automação',
  removedOther: 'Removidos por outras razões', screened: 'Registros triados',
  recordsExcluded: 'Registros excluídos', reportsSought: 'Relatos procurados para recuperação',
  reportsNotRetrieved: 'Relatos não recuperados', reportsAssessed: 'Relatos avaliados para elegibilidade',
  reportsExcluded: 'Relatos excluídos', newStudies: 'Novos estudos incluídos',
  newReports: 'Relatos dos novos estudos', totalStudies: 'Total de estudos incluídos', totalReports: 'Total de relatos incluídos',
};

const definitions: Partial<Record<CountKey, string>> = {
  databases: 'Registros identificados em bases bibliográficas antes da remoção de duplicatas.',
  registers: 'Registros identificados em registros de estudos ou ensaios.',
  screened: 'Registros únicos examinados por título, resumo ou outra triagem inicial.',
  reportsSought: 'Documentos em texto completo que se procurou recuperar para avaliação.',
  reportsAssessed: 'Relatos recuperados e avaliados contra os critérios de elegibilidade.',
  newStudies: 'Estudos únicos incluídos na revisão atual; um estudo pode ter mais de um relato.',
  newReports: 'Relatos que descrevem os novos estudos incluídos.',
};

export function BuilderWorkspace() {
  const { ready, locale, t } = useApp();
  const { project, past, future, setProject, patchProject, updateCount, updateProject, undo, redo } = useProjectStore();
  const [selected, setSelected] = useState<CountKey>('databases');
  const [tab, setTab] = useState<'data' | 'checklist' | 'export' | 'import'>('data');
  const [zoom, setZoom] = useState(0.82);
  const [saveState, setSaveState] = useState<'saving' | 'saved'>('saved');
  const workspaceRef = useRef<HTMLDivElement>(null);
  const calculated = useMemo(() => calculateProject(project), [project]);
  const issues = useMemo(() => validateProject(project), [project]);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('project') ?? localStorage.getItem('prisma-last-project');
    if (id) getProject(id).then((saved) => saved && setProject(saved));
  }, [setProject]);

  useEffect(() => {
    const saving = window.setTimeout(() => setSaveState('saving'), 0);
    const save = window.setTimeout(() => saveProject({ ...project, locale }).then(() => {
      localStorage.setItem('prisma-last-project', project.id);
      setSaveState('saved');
    }), 500);
    return () => { window.clearTimeout(saving); window.clearTimeout(save); };
  }, [project, locale]);

  const applicable = (field: CountKey) => {
    if (['previousStudies', 'previousReports'].includes(field)) return isUpdatedModel(project.model);
    if (['websites', 'organisations', 'citationSearching', 'otherSources'].includes(field)) return hasOtherSources(project.model);
    return true;
  };

  const setOtherSources = (enabled: boolean) => patchProject({ model: selectModel(project.reviewKind, enabled) }, 'Modelo alterado');
  const setReviewKind = (kind: PrismaProject['reviewKind']) => patchProject({ reviewKind: kind, model: selectModel(kind, hasOtherSources(project.model)) }, 'Tipo de revisão alterado');
  const selectedOrigin = calculated.origins[selected];
  const selectedOverride = project.overrides[selected];
  const selectedProvenance: NodeProvenance = project.provenance[selected] ?? { note: '', responsible: '', date: '', url: '', repositoryRef: '' };

  const patchProvenance = (patch: Partial<NodeProvenance>) => patchProject({
    provenance: { ...project.provenance, [selected]: { ...selectedProvenance, ...patch } },
  }, `Proveniência de ${selected} atualizada`);

  const toggleOverride = () => {
    if (selectedOverride) {
      const next = { ...project.overrides };
      delete next[selected];
      patchProject({ overrides: next }, 'Sobrescrição manual removida');
    } else {
      patchProject({ overrides: { ...project.overrides, [selected]: { value: calculated.values[selected] ?? 0, justification: '', updatedAt: new Date().toISOString() } } }, 'Valor derivado desbloqueado');
    }
  };

  return (
    <main id="main-content" className="builder-page" data-app-ready={ready ? 'true' : 'false'} aria-busy={!ready}>
      <header className="builder-project-header">
        <div>
          <p className="kicker">{project.guideline} · {project.model.replaceAll('-', ' ')}</p>
          <input className="project-title-input" aria-label={t('title')} value={project.title} onChange={(event) => patchProject({ title: event.target.value }, 'Título alterado')} />
        </div>
        <div className="save-indicator" role="status" aria-live="polite"><span className={saveState} />{saveState === 'saving' ? t('saving') : t('saved')}</div>
      </header>

      <div className="builder-toolbar" aria-label="Ferramentas do diagrama">
        <button type="button" onClick={undo} disabled={!past.length} title={t('undo')}><Undo2 /><span>{t('undo')}</span></button>
        <button type="button" onClick={redo} disabled={!future.length} title={t('redo')}><Redo2 /><span>{t('redo')}</span></button>
        <span className="toolbar-divider" />
        <button type="button" onClick={() => setZoom((value) => Math.max(.45, value - .1))} title="Reduzir zoom"><ZoomOut /><span>−</span></button>
        <output aria-label="Nível de zoom">{Math.round(zoom * 100)}%</output>
        <button type="button" onClick={() => setZoom((value) => Math.min(1.5, value + .1))} title="Aumentar zoom"><ZoomIn /><span>+</span></button>
        <button type="button" onClick={() => setZoom(.82)} title={t('fit')}><Focus /><span>{t('fit')}</span></button>
        <button type="button" onClick={() => workspaceRef.current?.requestFullscreen()} title={t('fullscreen')}><Maximize2 /><span>{t('fullscreen')}</span></button>
        <button type="button" onClick={() => setTab('export')} title={t('export')}><Download /><span>{t('export')}</span></button>
        <button type="button" onClick={() => window.print()} title={t('printPreview')}><FileCheck2 /><span>{t('printPreview')}</span></button>
        <a href="/learn" title="Ajuda metodológica"><HelpCircle /><span>Ajuda</span></a>
      </div>

      <div className="builder-tabs" role="tablist" aria-label="Módulos do construtor">
        <button role="tab" disabled={!ready} aria-selected={tab === 'data'} onClick={() => setTab('data')}>{t('data')}</button>
        <button role="tab" disabled={!ready} aria-selected={tab === 'checklist'} onClick={() => setTab('checklist')}>{t('checklist')}</button>
        <button role="tab" disabled={!ready} aria-selected={tab === 'export'} onClick={() => setTab('export')}>{t('export')}</button>
        <button role="tab" disabled={!ready} aria-selected={tab === 'import'} onClick={() => setTab('import')}>{t('import')}</button>
      </div>

      {tab === 'checklist' && <div className="single-module"><ChecklistPanel project={project} onChange={(next) => updateProject(next, 'Checklist atualizado')} /></div>}
      {tab === 'export' && <div className="single-module"><ExportPanel project={project} locale={locale} /></div>}
      {tab === 'import' && <div className="single-module"><ImportWizard onImport={(next) => { setProject(next); setTab('data'); }} /></div>}

      {tab === 'data' && (
        <div className="builder-workspace" ref={workspaceRef}>
          <aside className="data-panel" aria-label="Preenchimento do diagrama">
            <section className="project-setup">
              <h2>Configuração do projeto</h2>
              <label>{t('title')}<input value={project.title} onChange={(event) => patchProject({ title: event.target.value })} /></label>
              <label>{t('authors')}<input value={project.authors.join('; ')} onChange={(event) => patchProject({ authors: event.target.value.split(';').map((value) => value.trim()).filter(Boolean) })} placeholder="Separados por ponto e vírgula" /></label>
              <label>{t('institution')}<input value={project.institution} onChange={(event) => patchProject({ institution: event.target.value })} /></label>
              <label>{t('protocol')}<input type="url" value={project.protocolUrl} onChange={(event) => patchProject({ protocolUrl: event.target.value })} /></label>
              <fieldset><legend>Tipo do fluxo</legend>
                <label className="check-row"><input type="radio" name="review-kind" checked={project.reviewKind === 'new'} onChange={() => setReviewKind('new')} /> {t('newReview')}</label>
                <label className="check-row"><input type="radio" name="review-kind" checked={project.reviewKind === 'updated'} onChange={() => setReviewKind('updated')} /> {t('updatedReview')}</label>
                <label className="check-row"><input type="checkbox" checked={hasOtherSources(project.model)} onChange={(event) => setOtherSources(event.target.checked)} /> {t('otherSources')}</label>
              </fieldset>
            </section>
            {fieldSections.map((section) => {
              const fields = section.fields.filter(applicable);
              if (!fields.length) return null;
              return (
                <details className="form-section" key={section.title} open={section.title === 'Identificação'}>
                  <summary>{section.title}<span>{fields.filter((field) => calculated.values[field] !== null).length}/{fields.length}</span></summary>
                  <div>
                    {fields.map((field) => {
                      const origin = calculated.origins[field];
                      const fieldIssues = issues.filter((item) => item.location === field);
                      return (
                        <label className={`count-field ${origin}`} key={field}>
                          <span>{labels[field]}<small>{origin === 'derived' ? t('derived') : origin === 'override' ? t('override') : t('informed')}</small></span>
                          <input
                            type="number" min="0" step="1" inputMode="numeric" value={calculated.values[field] ?? ''}
                            disabled={origin === 'derived'} aria-invalid={fieldIssues.some((item) => item.status === 'inconsistency' || item.status === 'missing')}
                            onFocus={() => setSelected(field)}
                            onChange={(event) => origin === 'override'
                              ? patchProject({ overrides: { ...project.overrides, [field]: { ...project.overrides[field]!, value: event.target.value === '' ? 0 : Number(event.target.value) } } })
                              : updateCount(field, event.target.value === '' ? null : Number(event.target.value))}
                          />
                          {calculated.formulas[field] && <small className="formula">{calculated.formulas[field]}</small>}
                          {fieldIssues[0] && <small className="field-error">{fieldIssues[0].title}</small>}
                        </label>
                      );
                    })}
                  </div>
                </details>
              );
            })}
            <section className="reasons-editor">
              <h2>Razões de exclusão</h2>
              {project.exclusionReasons.map((reason) => (
                <div key={reason.id}>
                  <input aria-label="Razão" value={reason.label} onChange={(event) => patchProject({ exclusionReasons: project.exclusionReasons.map((item) => item.id === reason.id ? { ...item, label: event.target.value } : item) })} />
                  <input aria-label="Contagem" type="number" min="0" value={reason.count} onChange={(event) => patchProject({ exclusionReasons: project.exclusionReasons.map((item) => item.id === reason.id ? { ...item, count: Number(event.target.value) } : item) })} />
                  <button type="button" aria-label="Remover razão" onClick={() => patchProject({ exclusionReasons: project.exclusionReasons.filter((item) => item.id !== reason.id) })}>×</button>
                </div>
              ))}
              <button className="text-button" type="button" onClick={() => patchProject({ exclusionReasons: [...project.exclusionReasons, { id: crypto.randomUUID(), label: '', count: 0 }] })}>+ {t('addReason')}</button>
            </section>
          </aside>

          <section className="diagram-panel" aria-label="Editor visual do diagrama">
            <div className="canvas-label"><span>MODELO PROTEGIDO</span><label><select value={project.presentation.mode} onChange={(event) => patchProject({ presentation: { ...project.presentation, mode: event.target.value as 'prisma' | 'presentation' } })}><option value="prisma">{t('prismaMode')}</option><option value="presentation">{t('presentationMode')}</option></select></label></div>
            <PrismaDiagram project={project} locale={locale} selected={selected} onSelect={setSelected} zoom={zoom} />
            <details className="diagram-alternative">
              <summary>Alternativa textual e tabular</summary>
              <table><thead><tr><th>Etapa</th><th>Valor</th><th>Origem</th></tr></thead><tbody>{countKeys.filter(applicable).map((field) => <tr key={field}><th>{labels[field]}</th><td>{calculated.values[field] ?? '—'}</td><td>{calculated.origins[field]}</td></tr>)}</tbody></table>
            </details>
          </section>

          <aside className="context-panel" aria-label="Detalhes e validação">
            <section className="selected-node">
              <p className="kicker">NÓ SELECIONADO</p><h2>{labels[selected]}</h2>
              <p>{definitions[selected] ?? 'Contagem semântica do fluxo PRISMA 2020. Confirme a unidade antes de preencher.'}</p>
              <dl><div><dt>Valor</dt><dd>{calculated.values[selected] ?? '—'}</dd></div><div><dt>Origem</dt><dd>{calculated.origins[selected]}</dd></div><div><dt>Memória</dt><dd>{calculated.formulas[selected] ?? 'Valor informado diretamente.'}</dd></div></dl>
              {(selectedOrigin === 'derived' || selectedOrigin === 'override') && (
                <div className="override-box">
                  <button type="button" className="text-button" onClick={toggleOverride}>{selectedOverride ? 'Restaurar cálculo automático' : 'Desbloquear valor derivado'}</button>
                  {selectedOverride && <><label>Valor manual<input type="number" min="0" value={selectedOverride.value} onChange={(event) => patchProject({ overrides: { ...project.overrides, [selected]: { ...selectedOverride, value: Number(event.target.value) } } })} /></label><label>Justificativa obrigatória<textarea value={selectedOverride.justification} onChange={(event) => patchProject({ overrides: { ...project.overrides, [selected]: { ...selectedOverride, justification: event.target.value } } })} /></label></>}
                </div>
              )}
              <details className="provenance-editor"><summary>Notas e proveniência</summary>
                <label>Observação<textarea rows={3} value={selectedProvenance.note} onChange={(event) => patchProvenance({ note: event.target.value })} /></label>
                <label>Responsável<input value={selectedProvenance.responsible} onChange={(event) => patchProvenance({ responsible: event.target.value })} /></label>
                <label>Data<input type="date" value={selectedProvenance.date} onChange={(event) => patchProvenance({ date: event.target.value })} /></label>
                <label>URL<input type="url" value={selectedProvenance.url} onChange={(event) => patchProvenance({ url: event.target.value })} /></label>
                <label>Arquivo ou repositório<input value={selectedProvenance.repositoryRef} onChange={(event) => patchProvenance({ repositoryRef: event.target.value })} /></label>
              </details>
            </section>
            <section className="validation-panel">
              <div className="panel-heading"><div><p className="kicker">MOTOR DE REGRAS</p><h2>{t('validation')}</h2></div><span className="issue-count">{issues.filter((item) => item.status !== 'valid').length}</span></div>
              <div role="status" aria-live="polite" className="sr-only">{issues.length} resultados de validação</div>
              {issues.map((item) => <article className={`validation-item ${item.status}`} key={item.id}><span>{item.status}</span><h3>{item.title}</h3><p>{item.why}</p><small>{item.how}</small></article>)}
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}
