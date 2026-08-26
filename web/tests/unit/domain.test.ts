import { describe, expect, it } from 'vitest';
import { calculateProject, describeFlow, selectModel } from '../../src/domain/calculations';
import { createProject } from '../../src/domain/project';
import { migrateProject } from '../../src/domain/schema';
import { validateProject } from '../../src/domain/validation';
import { detectLocale } from '../../src/i18n/locale';
import { restoreProject, safeFileName, serializeProject } from '../../src/storage/serialization';
import { resolveTheme } from '../../src/app/AppProviders';

describe('motor de domínio', () => {
  it('seleciona os quatro modelos PRISMA 2020', () => {
    expect(selectModel('new', false)).toBe('new-databases');
    expect(selectModel('new', true)).toBe('new-databases-other');
    expect(selectModel('updated', false)).toBe('updated-databases');
    expect(selectModel('updated', true)).toBe('updated-databases-other');
  });

  it('calcula o fluxo sem alterar a entrada', () => {
    const project = createProject({ model: 'new-databases', example: true });
    const before = structuredClone(project.counts);
    const result = calculateProject(project);
    expect(result.values.screened).toBe(1906);
    expect(result.values.reportsSought).toBe(126);
    expect(result.values.reportsAssessed).toBe(102);
    expect(result.values.newReports).toBe(34);
    expect(project.counts).toEqual(before);
  });

  it('respeita sobrescrição rastreável', () => {
    const project = createProject({ example: true });
    project.overrides.screened = { value: 1900, justification: 'Auditoria externa', updatedAt: project.updatedAt };
    expect(calculateProject(project).origins.screened).toBe('override');
    expect(calculateProject(project).values.screened).toBe(1900);
    expect(validateProject(project).some((entry) => entry.id === 'override-screened')).toBe(true);
  });

  it('detecta subtrações impossíveis e razões que não fecham', () => {
    const project = createProject({ example: true });
    project.counts.duplicates = 9999;
    project.exclusionReasons[0].count = 999;
    const ids = validateProject(project).map((entry) => entry.id);
    expect(ids).toContain('negative-derivation');
    expect(ids).toContain('reasons-sum');
  });

  it('migra objetos legados preenchendo o esquema atual', () => {
    const migrated = migrateProject({ title: 'Legado', counts: { databases: 3 } });
    expect(migrated.schemaVersion).toBe(2);
    expect(migrated.title).toBe('Legado');
    expect(migrated.counts.databases).toBe(3);
    expect(migrated.checklist).toHaveLength(27);
    expect(migrated.presentation.diagramStyle).toBe('classic');
  });

  it('usa o diagrama PRISMA clássico como visual padrão', () => {
    expect(createProject().presentation.diagramStyle).toBe('classic');
  });

  it('detecta locale exato, base e fallback', () => {
    expect(detectLocale(['zh-CN'])).toBe('zh-CN');
    expect(detectLocale(['pt-PT'])).toBe('pt-BR');
    expect(detectLocale(['xx'])).toBe('en');
  });

  it('resolve a preferência de tema do sistema', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
    expect(resolveTheme('light', true)).toBe('light');
  });

  it('serializa, restaura e gera nomes seguros', () => {
    const project = createProject({ title: 'Revisão: Saúde & Educação', example: true });
    expect(restoreProject(serializeProject(project))).toEqual(project);
    expect(safeFileName(project.title, '.json')).toBe('revisao-saude-educacao.json');
  });

  it('gera descrição textual com as unidades científicas', () => {
    const description = describeFlow(createProject({ example: true }));
    expect(description).toContain('registros foram triados');
    expect(description).toContain('estudos');
    expect(description).toContain('relatos');
  });
});
