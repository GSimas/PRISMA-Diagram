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

export const checklistGuidance: Record<number, string> = {
  1: 'Identifique no título que o manuscrito é uma revisão sistemática (e, se aplicável, se inclui metanálise, revisão de escopo etc.).',
  2: 'Use a lista de verificação PRISMA para resumos: descreva objetivos, métodos de busca, critérios de elegibilidade, número de estudos e principais resultados de forma estruturada.',
  3: 'Explique, no contexto do conhecimento já existente, por que esta revisão foi necessária.',
  4: 'Declare de forma explícita a pergunta ou os objetivos que a revisão pretende responder.',
  5: 'Especifique os critérios de inclusão e exclusão usados para selecionar os estudos e como eles foram agrupados para as sínteses.',
  6: 'Liste todas as bases de dados, registros, sites, organizações e outras fontes consultadas, com a data da última busca em cada uma.',
  7: 'Apresente a estratégia de busca completa (todos os termos, filtros e limites) para cada base, registro ou site pesquisado, de forma que possa ser reproduzida.',
  8: 'Descreva como foi decidido se um estudo atendia aos critérios de elegibilidade: quantos revisores avaliaram cada registro, se de forma independente, e se ferramentas de automação foram usadas.',
  9: 'Descreva o processo de coleta de dados dos estudos incluídos: quantos revisores, se independente, e como dados foram obtidos ou confirmados junto aos autores originais.',
  10: 'Liste e defina todos os desfechos e demais variáveis (características dos participantes, intervenções, financiamento etc.) para os quais dados foram buscados.',
  11: 'Descreva os métodos usados para avaliar o risco de viés dos estudos incluídos, incluindo quantos revisores e quais ferramentas.',
  12: 'Especifique, para cada desfecho, a medida de efeito utilizada na síntese ou na apresentação dos resultados (ex.: razão de risco, diferença de médias).',
  13: 'Descreva os métodos de síntese: como os estudos foram agrupados, como os resultados foram tabulados ou visualizados, os métodos estatísticos usados (ex.: metanálise), como a heterogeneidade foi explorada e quais análises de sensibilidade foram feitas.',
  14: 'Descreva os métodos usados para avaliar o risco de viés de relato seletivo (resultados ausentes) em cada síntese.',
  15: 'Descreva os métodos usados para avaliar a certeza (confiança) na evidência de cada desfecho (ex.: GRADE).',
  16: 'Descreva os resultados do processo de busca e seleção, do número de registros identificados até o número final de estudos incluídos — idealmente com um diagrama de fluxo — e cite os estudos excluídos na etapa de texto completo, com as razões.',
  17: 'Cite cada estudo incluído e apresente suas características (ex.: população, intervenção, desfechos, contexto).',
  18: 'Apresente a avaliação de risco de viés de cada estudo incluído.',
  19: 'Apresente os resultados de todos os desfechos para cada estudo, com estimativas de efeito e intervalos de confiança quando possível.',
  20: 'Apresente um resumo das características e do risco de viés dos estudos que contribuíram para cada síntese, os resultados estatísticos, as investigações de heterogeneidade e as análises de sensibilidade.',
  21: 'Apresente a avaliação do risco de viés de relato (resultados ausentes) para cada síntese realizada.',
  22: 'Apresente a avaliação da certeza da evidência para cada desfecho.',
  23: 'Discuta a interpretação geral dos resultados no contexto de outras evidências, as limitações da evidência e do processo de revisão, e as implicações para prática, política e pesquisas futuras.',
  24: 'Informe onde a revisão foi registrada (ou justifique a ausência de registro) e onde o protocolo pode ser acessado; descreva alterações em relação ao protocolo.',
  25: 'Descreva as fontes de apoio financeiro e não financeiro recebidas para a revisão e o papel dos financiadores.',
  26: 'Declare quaisquer conflitos de interesse dos autores da revisão.',
  27: 'Informe quais dados, código analítico e outros materiais usados na revisão estão publicamente disponíveis e onde podem ser encontrados.',
};

export const createExampleChecklist = (): ChecklistEntry[] =>
  Array.from({ length: 27 }, (_, index) => {
    const item = index + 1;
    return {
      item,
      status: 'complete' as const,
      note: 'Relatado conforme orientação PRISMA 2020 (exemplo fictício para fins de aprendizagem).',
      location: 'Texto principal',
      page: String(2 + (index % 10)),
      section: checklistSections.find((section) => section.items.some((entry) => entry.item === item))?.section ?? '',
      url: '',
      reviewedAt: new Date().toISOString().slice(0, 10),
    };
  });
