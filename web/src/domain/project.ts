import { createChecklist } from './checklist';
import { emptyCounts, selectModel } from './calculations';
import { SCHEMA_VERSION, type DiagramModel, type Locale, type PrismaProject } from './types';

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
    sources: [],
    counts,
    overrides: {},
    exclusionReasons: options.example ? [
      { id: makeId(), label: 'População fora do escopo', count: 31 },
      { id: makeId(), label: 'Desenho de estudo inelegível', count: 22 },
      { id: makeId(), label: 'Intervenção não pertinente', count: 15 },
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
