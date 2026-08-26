import { calculateProject, hasOtherSources, isUpdatedModel } from './calculations';
import { countKeys, type CountKey, type PrismaProject, type ValidationIssue } from './types';

const issue = (
  id: string,
  status: ValidationIssue['status'],
  title: string,
  location: ValidationIssue['location'],
  why: string,
  how: string,
  related: CountKey[] = [],
): ValidationIssue => ({ id, status, title, location, why, how, related });

export function validateProject(project: PrismaProject): ValidationIssue[] {
  const result: ValidationIssue[] = [];
  const calculated = calculateProject(project);
  const values = calculated.values;

  if (!project.title.trim()) result.push(issue('project-title', 'missing', 'O título da revisão está ausente', 'project', 'O título identifica o projeto e suas exportações.', 'Informe um título descritivo.'));

  for (const key of countKeys) {
    const raw = project.counts[key];
    if (raw !== null && (!Number.isInteger(raw) || raw < 0)) {
      result.push(issue(`number-${key}`, 'inconsistency', 'Use um número inteiro não negativo', key, 'Contagens do fluxo representam unidades discretas.', 'Substitua o valor por um inteiro igual ou maior que zero.', [key]));
    }
  }

  const required: CountKey[] = ['databases', 'registers', 'duplicates', 'recordsExcluded', 'reportsNotRetrieved', 'reportsExcluded', 'newStudies'];
  required.forEach((key) => {
    if (project.counts[key] === null) result.push(issue(`missing-${key}`, 'missing', 'Contagem obrigatória ausente', key, 'Sem esse valor, parte do fluxo não pode ser verificada.', 'Informe zero quando a etapa ocorreu sem resultados.', [key]));
  });

  if (isUpdatedModel(project.model) && (project.counts.previousStudies === null || project.counts.previousReports === null)) {
    result.push(issue('updated-previous', 'missing', 'A revisão atualizada precisa dos totais anteriores', 'model', 'O modelo atualizado distingue estudos anteriores dos novos.', 'Informe estudos e relatos da versão anterior.', ['previousStudies', 'previousReports']));
  }

  if (hasOtherSources(project.model)) {
    const other = ['websites', 'organisations', 'citationSearching', 'otherSources'] as CountKey[];
    if (other.every((key) => (project.counts[key] ?? 0) === 0)) result.push(issue('empty-other-branch', 'attention', 'O ramo de outras fontes está vazio', 'model', 'O modelo selecionado exibe um ramo que não contém dados.', 'Informe as contagens ou escolha o modelo somente com bases e registros.', other));

    const otherRequired: CountKey[] = ['otherReportsSought', 'otherReportsNotRetrieved', 'otherReportsAssessed', 'otherReportsExcluded'];
    otherRequired.forEach((key) => {
      if (project.counts[key] === null) result.push(issue(`missing-${key}`, 'missing', 'Contagem obrigatória ausente', key, 'O ramo de outros métodos também precisa desse valor para fechar o fluxo.', 'Informe zero quando a etapa ocorreu sem resultados.', [key]));
    });
  }

  const exclusionSum = project.exclusionReasons.reduce((sum, reason) => sum + reason.count, 0);
  if (project.exclusionReasons.length && exclusionSum !== (project.counts.reportsExcluded ?? 0)) {
    result.push(issue('reasons-sum', 'inconsistency', 'As razões de exclusão não fecham o total', 'reportsExcluded', 'A soma detalhada deve corresponder aos relatos excluídos após elegibilidade.', `Revise as razões: a soma atual é ${exclusionSum}.`, ['reportsExcluded']));
  }

  const otherExclusionSum = project.otherExclusionReasons.reduce((sum, reason) => sum + reason.count, 0);
  if (project.otherExclusionReasons.length && otherExclusionSum !== (project.counts.otherReportsExcluded ?? 0)) {
    result.push(issue('other-reasons-sum', 'inconsistency', 'As razões de exclusão de outros métodos não fecham o total', 'otherReportsExcluded', 'A soma detalhada deve corresponder aos relatos excluídos no ramo de outros métodos.', `Revise as razões: a soma atual é ${otherExclusionSum}.`, ['otherReportsExcluded']));
  }

  const identified = (project.counts.databases ?? 0) + (project.counts.registers ?? 0) + (hasOtherSources(project.model) ? (project.counts.websites ?? 0) + (project.counts.organisations ?? 0) + (project.counts.citationSearching ?? 0) + (project.counts.otherSources ?? 0) : 0);
  const removed = (project.counts.duplicates ?? 0) + (project.counts.automationExcluded ?? 0) + (project.counts.removedOther ?? 0);
  const otherNegative = hasOtherSources(project.model) && ((project.counts.otherReportsNotRetrieved ?? 0) > (project.counts.otherReportsSought ?? 0) || (project.counts.otherReportsExcluded ?? 0) > (project.counts.otherReportsAssessed ?? 0));
  if (removed > identified || (project.counts.recordsExcluded ?? 0) > (values.screened ?? 0) || (project.counts.reportsNotRetrieved ?? 0) > (values.reportsSought ?? 0) || (project.counts.reportsExcluded ?? 0) > (values.reportsAssessed ?? 0) || otherNegative) {
    result.push(issue('negative-derivation', 'inconsistency', 'Uma subtração do fluxo produz valor negativo', 'project', 'Há mais exclusões ou remoções do que unidades disponíveis na etapa anterior.', 'Revise os valores relacionados; o sistema não aumentará totais apenas para fazê-los fechar.', ['screened', 'recordsExcluded', 'reportsSought', 'reportsNotRetrieved', 'reportsAssessed', 'reportsExcluded', 'otherReportsSought', 'otherReportsNotRetrieved', 'otherReportsAssessed', 'otherReportsExcluded']));
  }

  if ((values.totalReports ?? 0) < (values.totalStudies ?? 0)) {
    result.push(issue('reports-below-studies', 'attention', 'Há menos relatos do que estudos incluídos', 'totalReports', 'Em geral, cada estudo incluído é descrito por pelo menos um relato.', 'Confirme a distinção entre estudo e relato e documente a exceção.', ['totalReports', 'totalStudies']));
  }

  Object.entries(project.overrides).forEach(([key, override]) => {
    if (override) result.push(issue(`override-${key}`, override.justification.trim() ? 'attention' : 'inconsistency', 'Valor derivado substituído manualmente', key as CountKey, 'A substituição quebra a derivação automática e precisa ser rastreável.', override.justification.trim() ? `Justificativa registrada: ${override.justification}` : 'Adicione uma justificativa ou remova a substituição.', [key as CountKey]));
  });

  if (!result.some((item) => item.status === 'inconsistency' || item.status === 'missing')) {
    result.unshift(issue('flow-consistent', 'valid', 'As relações numéricas verificadas estão consistentes', 'project', 'As regras do modelo selecionado foram avaliadas.', 'Continue a revisão metodológica do manuscrito; esta verificação não equivale a certificação.'));
  }
  return result;
}

export const progressFor = (project: PrismaProject) => {
  const required = ['databases', 'registers', 'duplicates', 'recordsExcluded', 'reportsNotRetrieved', 'reportsExcluded', 'newStudies'] as CountKey[];
  const filled = required.filter((key) => project.counts[key] !== null).length;
  return Math.round((filled / required.length) * 100);
};
