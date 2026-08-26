import type { ChecklistEntry } from './types';

export const checklistSections = [
  { section: 'Título', items: [{ item: 1, title: 'Identificação como revisão sistemática' }] },
  { section: 'Resumo', items: [{ item: 2, title: 'Resumo estruturado conforme PRISMA para resumos' }] },
  { section: 'Introdução', items: [{ item: 3, title: 'Justificativa' }, { item: 4, title: 'Objetivos' }] },
  { section: 'Métodos', items: [
    { item: 5, title: 'Critérios de elegibilidade' }, { item: 6, title: 'Fontes de informação' },
    { item: 7, title: 'Estratégia de busca' }, { item: 8, title: 'Processo de seleção' },
    { item: 9, title: 'Processo de coleta de dados' }, { item: 10, title: 'Itens de dados' },
    { item: 11, title: 'Avaliação do risco de viés' }, { item: 12, title: 'Medidas de efeito' },
    { item: 13, title: 'Métodos de síntese' }, { item: 14, title: 'Vieses de relato' },
    { item: 15, title: 'Certeza da evidência' },
  ] },
  { section: 'Resultados', items: [
    { item: 16, title: 'Seleção dos estudos' }, { item: 17, title: 'Características dos estudos' },
    { item: 18, title: 'Risco de viés nos estudos' }, { item: 19, title: 'Resultados de estudos individuais' },
    { item: 20, title: 'Resultados das sínteses' }, { item: 21, title: 'Vieses de relato' },
    { item: 22, title: 'Certeza da evidência' },
  ] },
  { section: 'Discussão', items: [{ item: 23, title: 'Discussão e implicações' }] },
  { section: 'Outras informações', items: [
    { item: 24, title: 'Registro e protocolo' }, { item: 25, title: 'Apoio' },
    { item: 26, title: 'Conflitos de interesse' }, { item: 27, title: 'Disponibilidade de dados, código e materiais' },
  ] },
] as const;

export const checklistTitles = Object.fromEntries(
  checklistSections.flatMap((section) => section.items.map((entry) => [entry.item, entry.title])),
) as Record<number, string>;

export const createChecklist = (): ChecklistEntry[] =>
  Array.from({ length: 27 }, (_, index) => ({
    item: index + 1,
    status: 'not-started',
    note: '',
    location: '',
    page: '',
    section: '',
    url: '',
    reviewedAt: '',
  }));
