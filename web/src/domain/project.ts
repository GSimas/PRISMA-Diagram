import { createChecklist } from './checklist';
import { emptyCounts, selectModel } from './calculations';
import { SCHEMA_VERSION, type DiagramModel, type Locale, type PrismaProject, type SourceItem } from './types';

const makeId = () => typeof crypto !== 'undefined' && 'randomUUID' in crypto
  ? crypto.randomUUID()
  : `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function createProject(options: {
  title?: string;
  locale?: Locale;
  model?: DiagramModel;
  example?: boolean;
} = {}): PrismaProject {
  const now = new Date().toISOString();
  const model = options.model ?? selectModel('new', false);
  const counts = emptyCounts();
  if (options.example) Object.assign(counts, {
    databases: 2140, registers: 341, websites: model.endsWith('-other') ? 28 : null,
    organisations: model.endsWith('-other') ? 12 : null, citationSearching: model.endsWith('-other') ? 19 : null,
    otherSources: model.endsWith('-other') ? 4 : null, duplicates: 401, automationExcluded: 72,
    removedOther: 102, recordsExcluded: 1780, reportsNotRetrieved: 24, reportsExcluded: 68,
    otherReportsSought: model.endsWith('-other') ? 63 : null,
    otherReportsNotRetrieved: model.endsWith('-other') ? 5 : null,
    otherReportsAssessed: model.endsWith('-other') ? 58 : null,
    otherReportsExcluded: model.endsWith('-other') ? 3 : null,
    newStudies: 34, previousStudies: model.startsWith('updated') ? 18 : null,
    previousReports: model.startsWith('updated') ? 22 : null,
  });
  return {
    schemaVersion: SCHEMA_VERSION,
    id: makeId(),
    title: options.title ?? (options.example ? 'Exemplo didático — intervenções de saúde digital' : 'Revisão sem título'),
    shortTitle: options.example ? 'Saúde digital' : '',
    authors: [],
    institution: '',
    protocolUrl: '',
    reviewType: 'systematic',
    reviewKind: model.startsWith('updated') ? 'updated' : 'new',
    model,
    guideline: 'PRISMA 2020',
    extensions: [],
    locale: options.locale ?? 'pt-BR',
    status: 'draft',
    updatedDate: now.slice(0, 10),
    observations: options.example ? 'Dados inteiramente fictícios para fins de aprendizagem.' : '',
    sources: options.example ? ([
      { id: makeId(), type: 'database', name: 'PubMed / MEDLINE', count: 980 },
      { id: makeId(), type: 'database', name: 'Embase', count: 620 },
      { id: makeId(), type: 'database', name: 'Web of Science', count: 350 },
      { id: makeId(), type: 'database', name: 'Scopus', count: 190 },
      ...(model.endsWith('-other') ? [
        { id: makeId(), type: 'website' as const, name: 'Sites', count: 28 },
        { id: makeId(), type: 'organisation' as const, name: 'Organizações', count: 12 },
        { id: makeId(), type: 'citation' as const, name: 'Busca por citações', count: 19 },
        { id: makeId(), type: 'other' as const, name: 'Outras fontes', count: 4 },
      ] : []),
    ] as SourceItem[]) : [],
    counts,
    overrides: {},
    exclusionReasons: options.example ? [
      { id: makeId(), label: 'População fora do escopo', count: 31 },
      { id: makeId(), label: 'Desenho de estudo inelegível', count: 22 },
      { id: makeId(), label: 'Intervenção não pertinente', count: 15 },
    ] : [],
    otherExclusionReasons: options.example && model.endsWith('-other') ? [
      { id: makeId(), label: 'Fonte não revisada por pares', count: 3 },
    ] : [],
    provenance: {},
    checklist: createChecklist(),
    presentation: {
      mode: 'prisma', diagramStyle: 'classic', density: 'comfortable', orientation: 'portrait',
      accent: '#c97a16', showTitle: true, showOptionalDetails: true,
    },
    history: [],
    createdAt: now,
    updatedAt: now,
  };
}

export const fixtureModels: PrismaProject[] = [
  createProject({ title: 'Exemplo: revisão nova — bases e registros', model: 'new-databases', example: true }),
  createProject({ title: 'Exemplo: revisão nova — todas as fontes', model: 'new-databases-other', example: true }),
  createProject({ title: 'Exemplo: revisão atualizada — bases e registros', model: 'updated-databases', example: true }),
  createProject({ title: 'Exemplo: revisão atualizada — todas as fontes', model: 'updated-databases-other', example: true }),
];
