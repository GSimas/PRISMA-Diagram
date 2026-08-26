import { calculateProject, hasOtherSources, isUpdatedModel } from '../../domain/calculations';
import type { CountKey, Locale, PrismaProject } from '../../domain/types';

export interface DiagramNode {
  id: CountKey | 'identified-main' | 'identified-other' | 'removed';
  field: CountKey;
  x: number;
  y: number;
  width: number;
  height: number;
  lines: string[];
  value: number;
  kind?: 'side' | 'final' | 'previous';
}

const words: Record<Locale, Record<string, string>> = {
  'pt-BR': { previous: 'Estudos anteriores', identified: 'Identificados', databases: 'Bases e registros', other: 'Outras fontes', removed: 'Removidos antes da triagem', screened: 'Registros triados', excluded: 'Registros excluídos', sought: 'Relatos procurados', notRetrieved: 'Relatos não recuperados', assessed: 'Relatos avaliados', reportsExcluded: 'Relatos excluídos com razões', included: 'Novos estudos incluídos', total: 'Total incluído', reports: 'relatos', studies: 'estudos' },
  en: { previous: 'Previous studies', identified: 'Identified', databases: 'Databases and registers', other: 'Other sources', removed: 'Removed before screening', screened: 'Records screened', excluded: 'Records excluded', sought: 'Reports sought', notRetrieved: 'Reports not retrieved', assessed: 'Reports assessed', reportsExcluded: 'Reports excluded with reasons', included: 'New studies included', total: 'Total included', reports: 'reports', studies: 'studies' },
  it: { previous: 'Studi precedenti', identified: 'Identificati', databases: 'Banche dati e registri', other: 'Altre fonti', removed: 'Rimossi prima dello screening', screened: 'Record sottoposti a screening', excluded: 'Record esclusi', sought: 'Report cercati', notRetrieved: 'Report non recuperati', assessed: 'Report valutati', reportsExcluded: 'Report esclusi con motivazione', included: 'Nuovi studi inclusi', total: 'Totale incluso', reports: 'report', studies: 'studi' },
  fr: { previous: 'Études antérieures', identified: 'Identifiés', databases: 'Bases et registres', other: 'Autres sources', removed: 'Retirés avant la sélection', screened: 'Enregistrements examinés', excluded: 'Enregistrements exclus', sought: 'Rapports recherchés', notRetrieved: 'Rapports non récupérés', assessed: 'Rapports évalués', reportsExcluded: 'Rapports exclus avec motifs', included: 'Nouvelles études incluses', total: 'Total inclus', reports: 'rapports', studies: 'études' },
  de: { previous: 'Frühere Studien', identified: 'Identifiziert', databases: 'Datenbanken und Register', other: 'Weitere Quellen', removed: 'Vor dem Screening entfernt', screened: 'Datensätze gescreent', excluded: 'Datensätze ausgeschlossen', sought: 'Berichte gesucht', notRetrieved: 'Berichte nicht beschafft', assessed: 'Berichte bewertet', reportsExcluded: 'Berichte mit Gründen ausgeschlossen', included: 'Neue Studien eingeschlossen', total: 'Insgesamt eingeschlossen', reports: 'Berichte', studies: 'Studien' },
  'zh-CN': { previous: '既往纳入研究', identified: '检索识别', databases: '数据库与注册平台', other: '其他来源', removed: '筛选前移除', screened: '已筛选记录', excluded: '排除记录', sought: '寻求获取报告', notRetrieved: '未获取报告', assessed: '合格性评估报告', reportsExcluded: '有理由排除的报告', included: '新纳入研究', total: '纳入总计', reports: '份报告', studies: '项研究' },
};

export function getDiagramNodes(project: PrismaProject, locale: Locale): DiagramNode[] {
  const { values } = calculateProject(project);
  const w = words[locale];
  const n = (key: CountKey) => values[key] ?? 0;
  const other = hasOtherSources(project.model);
  const updated = isUpdatedModel(project.model);
  const mainX = other ? 165 : 280;
  const nodes: DiagramNode[] = [];
  let y = 45;
  if (updated) {
    nodes.push({ id: 'previousStudies', field: 'previousStudies', x: mainX, y, width: 300, height: 78, lines: [w.previous, `${n('previousStudies')} ${w.studies} · ${n('previousReports')} ${w.reports}`], value: n('previousStudies'), kind: 'previous' });
    y += 118;
  }
  nodes.push({ id: 'identified-main', field: 'databases', x: mainX, y, width: 300, height: 86, lines: [w.identified, w.databases, `n = ${n('databases') + n('registers')}`], value: n('databases') + n('registers') });
  if (other) nodes.push({ id: 'identified-other', field: 'websites', x: 525, y, width: 300, height: 86, lines: [w.identified, w.other, `n = ${n('websites') + n('organisations') + n('citationSearching') + n('otherSources')}`], value: n('websites') + n('organisations') + n('citationSearching') + n('otherSources') });
  y += 126;
  nodes.push({ id: 'removed', field: 'duplicates', x: mainX, y, width: 300, height: 86, lines: [w.removed, `n = ${n('duplicates') + n('automationExcluded') + n('removedOther')}`], value: n('duplicates') + n('automationExcluded') + n('removedOther'), kind: 'side' });
  y += 126;
  nodes.push({ id: 'screened', field: 'screened', x: mainX, y, width: 300, height: 76, lines: [w.screened, `n = ${n('screened')}`], value: n('screened') });
  nodes.push({ id: 'recordsExcluded', field: 'recordsExcluded', x: 525, y, width: 300, height: 76, lines: [w.excluded, `n = ${n('recordsExcluded')}`], value: n('recordsExcluded'), kind: 'side' });
  y += 116;
  nodes.push({ id: 'reportsSought', field: 'reportsSought', x: mainX, y, width: 300, height: 76, lines: [w.sought, `n = ${n('reportsSought')}`], value: n('reportsSought') });
  nodes.push({ id: 'reportsNotRetrieved', field: 'reportsNotRetrieved', x: 525, y, width: 300, height: 76, lines: [w.notRetrieved, `n = ${n('reportsNotRetrieved')}`], value: n('reportsNotRetrieved'), kind: 'side' });
  y += 116;
  nodes.push({ id: 'reportsAssessed', field: 'reportsAssessed', x: mainX, y, width: 300, height: 76, lines: [w.assessed, `n = ${n('reportsAssessed')}`], value: n('reportsAssessed') });
  nodes.push({ id: 'reportsExcluded', field: 'reportsExcluded', x: 525, y, width: 300, height: 86, lines: [w.reportsExcluded, `n = ${n('reportsExcluded')}`], value: n('reportsExcluded'), kind: 'side' });
  y += 126;
  nodes.push({ id: 'newStudies', field: 'newStudies', x: mainX, y, width: 300, height: 86, lines: [w.included, `${n('newStudies')} ${w.studies} · ${n('newReports')} ${w.reports}`], value: n('newStudies'), kind: 'final' });
  if (updated) {
    y += 126;
    nodes.push({ id: 'totalStudies', field: 'totalStudies', x: mainX, y, width: 300, height: 86, lines: [w.total, `${n('totalStudies')} ${w.studies} · ${n('totalReports')} ${w.reports}`], value: n('totalStudies'), kind: 'final' });
  }
  return nodes;
}
