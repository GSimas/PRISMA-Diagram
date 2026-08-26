import { calculateProject, hasOtherSources, isUpdatedModel } from '../../domain/calculations';
import type { CountKey, Locale, PresentationPreferences, PrismaProject } from '../../domain/types';

export type DiagramStyle = PresentationPreferences['diagramStyle'];

export interface DiagramNode {
  id: CountKey | 'identified-main' | 'identified-other' | 'removed';
  field: CountKey;
  x: number;
  y: number;
  width: number;
  height: number;
  lines: string[];
  value: number;
  kind?: 'side' | 'final' | 'previous' | 'other';
}

export interface DiagramConnection { id: string; d: string; }

export interface DiagramChrome {
  width: number;
  height: number;
  mainHeader: string;
  otherHeader: string;
  identification: string;
  screening: string;
  included: string;
  credit: string;
  hasOtherSources: boolean;
  identificationTop: number;
  screeningTop: number;
  includedTop: number;
}

const words: Record<Locale, Record<string, string>> = {
  'pt-BR': { previous: 'Estudos anteriores', identified: 'Identificados', databases: 'Bases e registros', other: 'Outras fontes', removed: 'Removidos antes da triagem', screened: 'Registros triados', excluded: 'Registros excluídos', sought: 'Relatos procurados para recuperação', notRetrieved: 'Relatos não recuperados', assessed: 'Relatos avaliados para elegibilidade', reportsExcluded: 'Relatos excluídos com razões', included: 'Novos estudos incluídos na revisão', total: 'Total incluído', reports: 'relatos', studies: 'estudos', mainHeader: 'Identificação de novos estudos em bases de dados e registros', otherHeader: 'Identificação de novos estudos por outros métodos', identification: 'Identificação', screening: 'Triagem', includedStage: 'Incluídos', credit: 'Baseado no PRISMA 2020 · CC BY 4.0 · ferramenta independente' },
  en: { previous: 'Previous studies', identified: 'Records identified from', databases: 'Databases and registers', other: 'Other sources', removed: 'Records removed before screening', screened: 'Records screened', excluded: 'Records excluded', sought: 'Reports sought for retrieval', notRetrieved: 'Reports not retrieved', assessed: 'Reports assessed for eligibility', reportsExcluded: 'Reports excluded with reasons', included: 'New studies included in review', total: 'Total included', reports: 'reports', studies: 'studies', mainHeader: 'Identification of new studies via databases and registers', otherHeader: 'Identification of new studies via other methods', identification: 'Identification', screening: 'Screening', includedStage: 'Included', credit: 'Based on PRISMA 2020 · CC BY 4.0 · independent tool' },
  it: { previous: 'Studi precedenti', identified: 'Record identificati', databases: 'Banche dati e registri', other: 'Altre fonti', removed: 'Record rimossi prima dello screening', screened: 'Record sottoposti a screening', excluded: 'Record esclusi', sought: 'Report cercati per il recupero', notRetrieved: 'Report non recuperati', assessed: 'Report valutati per l’idoneità', reportsExcluded: 'Report esclusi con motivazione', included: 'Nuovi studi inclusi nella revisione', total: 'Totale incluso', reports: 'report', studies: 'studi', mainHeader: 'Identificazione di nuovi studi tramite banche dati e registri', otherHeader: 'Identificazione di nuovi studi tramite altri metodi', identification: 'Identificazione', screening: 'Screening', includedStage: 'Inclusi', credit: 'Basato su PRISMA 2020 · CC BY 4.0 · strumento indipendente' },
  fr: { previous: 'Études antérieures', identified: 'Enregistrements identifiés', databases: 'Bases de données et registres', other: 'Autres sources', removed: 'Enregistrements retirés avant la sélection', screened: 'Enregistrements examinés', excluded: 'Enregistrements exclus', sought: 'Rapports recherchés pour récupération', notRetrieved: 'Rapports non récupérés', assessed: 'Rapports évalués pour l’éligibilité', reportsExcluded: 'Rapports exclus avec motifs', included: 'Nouvelles études incluses dans la revue', total: 'Total inclus', reports: 'rapports', studies: 'études', mainHeader: 'Identification de nouvelles études via bases et registres', otherHeader: 'Identification de nouvelles études par d’autres méthodes', identification: 'Identification', screening: 'Sélection', includedStage: 'Inclus', credit: 'Basé sur PRISMA 2020 · CC BY 4.0 · outil indépendant' },
  de: { previous: 'Frühere Studien', identified: 'Identifizierte Datensätze', databases: 'Datenbanken und Register', other: 'Weitere Quellen', removed: 'Vor dem Screening entfernte Datensätze', screened: 'Datensätze gescreent', excluded: 'Datensätze ausgeschlossen', sought: 'Zur Beschaffung gesuchte Berichte', notRetrieved: 'Nicht beschaffte Berichte', assessed: 'Auf Eignung geprüfte Berichte', reportsExcluded: 'Berichte mit Gründen ausgeschlossen', included: 'Neu in die Übersichtsarbeit eingeschlossene Studien', total: 'Insgesamt eingeschlossen', reports: 'Berichte', studies: 'Studien', mainHeader: 'Identifikation neuer Studien über Datenbanken und Register', otherHeader: 'Identifikation neuer Studien über andere Methoden', identification: 'Identifikation', screening: 'Screening', includedStage: 'Eingeschlossen', credit: 'Basierend auf PRISMA 2020 · CC BY 4.0 · unabhängiges Werkzeug' },
  'zh-CN': { previous: '既往纳入研究', identified: '检索识别', databases: '数据库与注册平台', other: '其他来源', removed: '筛选前移除的记录', screened: '已筛选记录', excluded: '排除记录', sought: '寻求获取的报告', notRetrieved: '未获取报告', assessed: '合格性评估报告', reportsExcluded: '有理由排除的报告', included: '综述中新纳入的研究', total: '纳入总计', reports: '份报告', studies: '项研究', mainHeader: '通过数据库和注册平台识别新研究', otherHeader: '通过其他方法识别新研究', identification: '识别', screening: '筛选', includedStage: '纳入', credit: '基于 PRISMA 2020 · CC BY 4.0 · 独立工具' },
};

function getClassicNodes(project: PrismaProject, locale: Locale): DiagramNode[] {
  const { values } = calculateProject(project);
  const w = words[locale];
  const n = (key: CountKey) => values[key] ?? 0;
  const other = hasOtherSources(project.model);
  const updated = isUpdatedModel(project.model);
  const identY = updated ? 200 : 115;
  const screenedY = identY + 148;
  const soughtY = screenedY + 74;
  const assessedY = screenedY + 167;
  const includedY = screenedY + 297;
  const nodes: DiagramNode[] = [];

  if (updated) nodes.push({ id: 'previousStudies', field: 'previousStudies', x: 70, y: 95, width: 260, height: 58, lines: [w.previous, `${n('previousStudies')} ${w.studies} · ${n('previousReports')} ${w.reports}`], value: n('previousStudies'), kind: 'previous' });
  nodes.push({ id: 'identified-main', field: 'databases', x: 70, y: identY, width: 260, height: 58, lines: [w.identified, w.databases, `n = ${n('databases') + n('registers')}`], value: n('databases') + n('registers') });
  nodes.push({ id: 'removed', field: 'duplicates', x: 366, y: identY - 13, width: 260, height: 84, lines: [w.removed, `n = ${n('duplicates') + n('automationExcluded') + n('removedOther')}`], value: n('duplicates') + n('automationExcluded') + n('removedOther'), kind: 'side' });
  if (other) nodes.push({ id: 'identified-other', field: 'websites', x: 662, y: identY - 10, width: 261, height: 78, lines: [w.identified, w.other, `n = ${n('websites') + n('organisations') + n('citationSearching') + n('otherSources')}`], value: n('websites') + n('organisations') + n('citationSearching') + n('otherSources'), kind: 'other' });
  nodes.push({ id: 'screened', field: 'screened', x: 70, y: screenedY, width: 260, height: 40, lines: [w.screened, `n = ${n('screened')}`], value: n('screened') });
  nodes.push({ id: 'recordsExcluded', field: 'recordsExcluded', x: 366, y: screenedY, width: 260, height: 40, lines: [w.excluded, `n = ${n('recordsExcluded')}`], value: n('recordsExcluded'), kind: 'side' });
  nodes.push({ id: 'reportsSought', field: 'reportsSought', x: 70, y: soughtY, width: 260, height: 40, lines: [w.sought, `n = ${n('reportsSought')}`], value: n('reportsSought') });
  nodes.push({ id: 'reportsNotRetrieved', field: 'reportsNotRetrieved', x: 366, y: soughtY, width: 260, height: 40, lines: [w.notRetrieved, `n = ${n('reportsNotRetrieved')}`], value: n('reportsNotRetrieved'), kind: 'side' });
  nodes.push({ id: 'reportsAssessed', field: 'reportsAssessed', x: 70, y: assessedY, width: 260, height: 40, lines: [w.assessed, `n = ${n('reportsAssessed')}`], value: n('reportsAssessed') });
  nodes.push({ id: 'reportsExcluded', field: 'reportsExcluded', x: 366, y: assessedY - 15, width: 260, height: 70, lines: [w.reportsExcluded, `n = ${n('reportsExcluded')}`], value: n('reportsExcluded'), kind: 'side' });
  nodes.push({ id: 'newStudies', field: 'newStudies', x: 70, y: includedY, width: 260, height: 76, lines: [w.included, `n = ${n('newStudies')}`, `${w.reports}: n = ${n('newReports')}`], value: n('newStudies'), kind: 'final' });
  if (updated) nodes.push({ id: 'totalStudies', field: 'totalStudies', x: 366, y: includedY, width: 260, height: 76, lines: [w.total, `${n('totalStudies')} ${w.studies}`, `${n('totalReports')} ${w.reports}`], value: n('totalStudies'), kind: 'final' });
  return nodes;
}

function getModernNodes(project: PrismaProject, locale: Locale): DiagramNode[] {
  const { values } = calculateProject(project);
  const w = words[locale];
  const n = (key: CountKey) => values[key] ?? 0;
  const other = hasOtherSources(project.model);
  const updated = isUpdatedModel(project.model);
  const mainX = other ? 165 : 280;
  const nodes: DiagramNode[] = [];
  let y = 45;
  if (updated) { nodes.push({ id: 'previousStudies', field: 'previousStudies', x: mainX, y, width: 300, height: 78, lines: [w.previous, `${n('previousStudies')} ${w.studies} · ${n('previousReports')} ${w.reports}`], value: n('previousStudies'), kind: 'previous' }); y += 118; }
  nodes.push({ id: 'identified-main', field: 'databases', x: mainX, y, width: 300, height: 86, lines: [w.identified, w.databases, `n = ${n('databases') + n('registers')}`], value: n('databases') + n('registers') });
  if (other) nodes.push({ id: 'identified-other', field: 'websites', x: 525, y, width: 300, height: 86, lines: [w.identified, w.other, `n = ${n('websites') + n('organisations') + n('citationSearching') + n('otherSources')}`], value: n('websites') + n('organisations') + n('citationSearching') + n('otherSources'), kind: 'other' });
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
  if (updated) { y += 126; nodes.push({ id: 'totalStudies', field: 'totalStudies', x: mainX, y, width: 300, height: 86, lines: [w.total, `${n('totalStudies')} ${w.studies} · ${n('totalReports')} ${w.reports}`], value: n('totalStudies'), kind: 'final' }); }
  return nodes;
}

export function getDiagramNodes(project: PrismaProject, locale: Locale, style: DiagramStyle = project.presentation.diagramStyle ?? 'classic'): DiagramNode[] {
  return style === 'classic' ? getClassicNodes(project, locale) : getModernNodes(project, locale);
}

export function getDiagramChrome(project: PrismaProject, locale: Locale, style: DiagramStyle = project.presentation.diagramStyle ?? 'classic'): DiagramChrome {
  const nodes = getDiagramNodes(project, locale, style);
  const w = words[locale];
  const classic = style === 'classic';
  const hasOther = hasOtherSources(project.model);
  const screened = nodes.find((node) => node.id === 'screened')!;
  const included = nodes.find((node) => node.id === 'newStudies')!;
  const identified = nodes.find((node) => node.id === 'identified-main')!;
  return { width: classic ? (hasOther ? 1240 : 660) : 880, height: Math.max(...nodes.map((node) => node.y + node.height), 650) + (classic ? 55 : 50), mainHeader: w.mainHeader, otherHeader: w.otherHeader, identification: w.identification, screening: w.screening, included: w.includedStage, credit: w.credit, hasOtherSources: hasOther, identificationTop: identified.y - 37, screeningTop: screened.y, includedTop: included.y - 56 };
}

export function getDiagramConnections(nodes: DiagramNode[], style: DiagramStyle): DiagramConnection[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const connections: DiagramConnection[] = [];
  const vertical = (fromId: DiagramNode['id'], toId: DiagramNode['id']) => { const from = byId.get(fromId); const to = byId.get(toId); if (from && to) connections.push({ id: `${fromId}-${toId}`, d: `M ${from.x + from.width / 2} ${from.y + from.height} V ${to.y - 7}` }); };
  const horizontal = (fromId: DiagramNode['id'], toId: DiagramNode['id']) => { const from = byId.get(fromId); const to = byId.get(toId); if (from && to) connections.push({ id: `${fromId}-${toId}`, d: `M ${from.x + from.width} ${from.y + from.height / 2} H ${to.x - 7}` }); };
  if (style === 'modern') {
    const main = nodes.filter((node) => node.x < 500);
    main.slice(0, -1).forEach((node, index) => vertical(node.id, main[index + 1].id));
    nodes.filter((node) => node.x >= 500).forEach((node) => { const source = main.find((candidate) => candidate.y === node.y); if (node.id === 'identified-other') { const target = byId.get('removed'); if (target) connections.push({ id: 'identified-other-removed', d: `M ${node.x + node.width / 2} ${node.y + node.height} V ${target.y - 22} H ${target.x + target.width / 2} V ${target.y - 7}` }); } else if (source) horizontal(source.id, node.id); });
    return connections;
  }
  vertical('previousStudies', 'identified-main');
  vertical('identified-main', 'screened');
  horizontal('identified-main', 'removed');
  horizontal('screened', 'recordsExcluded');
  vertical('screened', 'reportsSought');
  horizontal('reportsSought', 'reportsNotRetrieved');
  vertical('reportsSought', 'reportsAssessed');
  horizontal('reportsAssessed', 'reportsExcluded');
  vertical('reportsAssessed', 'newStudies');
  vertical('newStudies', 'totalStudies');
  const other = byId.get('identified-other'); const included = byId.get('newStudies');
  if (other && included) connections.push({ id: 'identified-other-newStudies', d: `M ${other.x + other.width / 2} ${other.y + other.height} V ${included.y + included.height / 2} H ${included.x + included.width + 7}` });
  return connections;
}
