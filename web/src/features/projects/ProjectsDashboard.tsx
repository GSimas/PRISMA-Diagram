'use client';

import { useEffect, useMemo, useState } from 'react';
import { Copy, Download, FilePlus2, FolderOpen, Pencil, Search, Trash2 } from 'lucide-react';
import { useApp } from '../../app/AppProviders';
import { createProject } from '../../domain/project';
import { progressFor, validateProject } from '../../domain/validation';
import type { PrismaProject, ProjectStatus } from '../../domain/types';
import { deleteProject, duplicateProject, listProjects, saveProject } from '../../storage/db';
import { exportProject } from '../export/exporters';
import { ImportWizard } from '../import/ImportWizard';

export function ProjectsDashboard() {
  const { locale, t } = useApp();
  const [projects, setProjects] = useState<PrismaProject[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all');
  const [sort, setSort] = useState<'updated' | 'title'>('updated');
  const [confirmDelete, setConfirmDelete] = useState<PrismaProject | null>(null);
  const [deleted, setDeleted] = useState<PrismaProject | null>(null);
  const [renaming, setRenaming] = useState<PrismaProject | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const refresh = () => listProjects().then(setProjects);
  useEffect(() => { refresh(); }, []);

  const visible = useMemo(() => projects
    .filter((project) => status === 'all' || project.status === status)
    .filter((project) => project.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : b.updatedAt.localeCompare(a.updatedAt)), [projects, query, sort, status]);

  const openNew = async (example = false) => {
    const project = createProject({ locale, model: example ? 'new-databases-other' : 'new-databases', example });
    await saveProject(project);
    window.location.href = `/builder?project=${project.id}`;
  };

  const importProject = async (project: PrismaProject) => {
    await saveProject(project);
    await refresh();
  };

  return (
    <main id="main-content" className="content-page projects-page">
      <header className="page-hero compact">
        <div><p className="eyebrow"><span /> INDEXEDDB · PROCESSAMENTO LOCAL</p><h1>{t('dashboard')}</h1><p>Crie, recupere e organize revisões sem conta. Os projetos ficam neste dispositivo até você exportar ou excluir.</p></div>
        <button className="primary-button" type="button" onClick={() => openNew(false)}><FilePlus2 size={18} /> {t('newDiagram')}</button>
      </header>

      <section className="dashboard-controls" aria-label="Controles dos projetos">
        <label className="search-box"><Search size={17} /><span className="sr-only">{t('search')}</span><input placeholder={t('search')} value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label>Status<select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="all">Todos</option><option value="draft">Rascunho</option><option value="review">Em revisão</option><option value="complete">Concluído</option></select></label>
        <label>Ordenar<select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}><option value="updated">Última modificação</option><option value="title">Título</option></select></label>
        <button className="secondary-button" type="button" onClick={() => openNew(true)}>Criar a partir do exemplo</button>
      </section>

      {visible.length ? (
        <section className="project-grid" aria-label="Projetos salvos">
          {visible.map((project) => {
            const warnings = validateProject(project).filter((item) => item.status === 'attention' || item.status === 'inconsistency' || item.status === 'missing').length;
            return (
              <article className="project-card" key={project.id}>
                <div className="project-card-meta"><span>{project.status}</span><time dateTime={project.updatedAt}>{new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(project.updatedAt))}</time></div>
                <h2>{project.title}</h2>
                <p>{project.reviewType} · {project.model.replaceAll('-', ' ')} · {project.locale}</p>
                <div className="project-progress"><span><i style={{ width: `${progressFor(project)}%` }} /></span><small>{progressFor(project)}% preenchido · {warnings} alertas</small></div>
                <div className="card-actions">
                  <a className="primary-button small" href={`/builder?project=${project.id}`}><FolderOpen size={15} /> Abrir</a>
                  <button type="button" onClick={() => { setRenaming(project); setRenameValue(project.title); }} aria-label={`Renomear ${project.title}`}><Pencil size={16} /></button>
                  <button type="button" onClick={() => duplicateProject(project).then(refresh)} aria-label={`Duplicar ${project.title}`}><Copy size={16} /></button>
                  <button type="button" onClick={() => exportProject(project, locale, 'json')} aria-label={`Baixar backup de ${project.title}`}><Download size={16} /></button>
                  <button type="button" onClick={() => setConfirmDelete(project)} aria-label={`Excluir ${project.title}`}><Trash2 size={16} /></button>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="empty-state"><span>PD—00</span><h2>{t('emptyProjects')}</h2><p>Comece com um projeto em branco ou explore um exemplo fictício com os quatro ramos principais.</p><button className="primary-button" onClick={() => openNew(false)}>{t('createFirst')}</button></section>
      )}

      <ImportWizard onImport={importProject} />

      {confirmDelete && <div className="modal-backdrop" role="presentation"><section className="modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><h2 id="delete-title">Excluir projeto?</h2><p>“{confirmDelete.title}” será removido deste navegador. Você poderá desfazer enquanto esta página permanecer aberta.</p><div><button className="secondary-button" onClick={() => setConfirmDelete(null)}>Cancelar</button><button className="danger-button" onClick={async () => { await deleteProject(confirmDelete.id); setDeleted(confirmDelete); setConfirmDelete(null); refresh(); }}>Excluir</button></div></section></div>}
      {renaming && <div className="modal-backdrop"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="rename-title"><h2 id="rename-title">Renomear projeto</h2><label>Novo título<input autoFocus value={renameValue} onChange={(event) => setRenameValue(event.target.value)} /></label><div><button className="secondary-button" onClick={() => setRenaming(null)}>Cancelar</button><button className="primary-button" onClick={async () => { await saveProject({ ...renaming, title: renameValue }); setRenaming(null); refresh(); }}>Salvar</button></div></section></div>}
      {deleted && <div className="undo-toast" role="status">Projeto excluído. <button onClick={async () => { await saveProject(deleted); setDeleted(null); refresh(); }}>Desfazer</button></div>}
    </main>
  );
}
