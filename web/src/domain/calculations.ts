import type { CalculatedCounts, CountKey, Counts, DiagramModel, PrismaProject } from './types';
import { countKeys } from './types';

export const isUpdatedModel = (model: DiagramModel) => model.startsWith('updated');
export const hasOtherSources = (model: DiagramModel) => model.endsWith('-other');

export function selectModel(reviewKind: PrismaProject['reviewKind'], otherSources: boolean): DiagramModel {
  if (reviewKind === 'updated') return otherSources ? 'updated-databases-other' : 'updated-databases';
  return otherSources ? 'new-databases-other' : 'new-databases';
}

const number = (value: number | null | undefined) => value ?? 0;

export function emptyCounts(): Counts {
  return Object.fromEntries(countKeys.map((key) => [key, null])) as Counts;
}

export function calculateProject(project: PrismaProject): CalculatedCounts {
  const values = { ...project.counts };
  const origins = Object.fromEntries(countKeys.map((key) => [key, 'informed'])) as CalculatedCounts['origins'];
  const formulas: CalculatedCounts['formulas'] = {};

  const derive = (key: CountKey, value: number, formula: string, applicable = true) => {
    if (!applicable) {
      values[key] = null;
      origins[key] = 'not-applicable';
      formulas[key] = 'Não aplicável ao modelo selecionado.';
      return;
    }
    const override = project.overrides[key];
    values[key] = override ? override.value : Math.max(0, value);
    origins[key] = override ? 'override' : 'derived';
    formulas[key] = formula;
  };

  const otherTotal = hasOtherSources(project.model)
    ? number(values.websites) + number(values.organisations) + number(values.citationSearching) + number(values.otherSources)
    : 0;
  const identified = number(values.databases) + number(values.registers) + otherTotal;
  const removed = number(values.duplicates) + number(values.automationExcluded) + number(values.removedOther);

  derive('screened', identified - removed, `${identified} identificados − ${removed} removidos`);
  derive('reportsSought', number(values.screened) - number(values.recordsExcluded), `${number(values.screened)} triados − ${number(values.recordsExcluded)} excluídos`);
  derive('reportsAssessed', number(values.reportsSought) - number(values.reportsNotRetrieved), `${number(values.reportsSought)} procurados − ${number(values.reportsNotRetrieved)} não recuperados`);
  derive('newReports', number(values.reportsAssessed) - number(values.reportsExcluded), `${number(values.reportsAssessed)} avaliados − ${number(values.reportsExcluded)} excluídos`);
  derive('totalStudies', number(values.previousStudies) + number(values.newStudies), `${number(values.previousStudies)} anteriores + ${number(values.newStudies)} novos`);
  derive('totalReports', number(values.previousReports) + number(values.newReports), `${number(values.previousReports)} anteriores + ${number(values.newReports)} novos`);

  if (!isUpdatedModel(project.model)) {
    values.previousStudies = null;
    values.previousReports = null;
    origins.previousStudies = 'not-applicable';
    origins.previousReports = 'not-applicable';
  }
  if (!hasOtherSources(project.model)) {
    (['websites', 'organisations', 'citationSearching', 'otherSources'] as CountKey[]).forEach((key) => {
      values[key] = null;
      origins[key] = 'not-applicable';
    });
  }
  return { values, origins, formulas };
}

export function describeFlow(project: PrismaProject): string {
  const { values } = calculateProject(project);
  const parts = [
    `${number(values.databases) + number(values.registers)} registros foram identificados em bases e registros`,
    hasOtherSources(project.model) ? `${number(values.websites) + number(values.organisations) + number(values.citationSearching) + number(values.otherSources)} registros ou relatos vieram de outras fontes` : '',
    `${number(values.screened)} registros foram triados`,
    `${number(values.reportsAssessed)} relatos foram avaliados para elegibilidade`,
    `${number(values.totalStudies)} estudos, descritos em ${number(values.totalReports)} relatos, foram incluídos`,
  ].filter(Boolean);
  return `${parts.join('. ')}. Exemplo ou projeto baseado no PRISMA 2020; a validação do diagrama não certifica o manuscrito completo.`;
}
