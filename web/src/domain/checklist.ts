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

const exampleNotes: Record<number, string> = {
  1: "Título indica claramente uma revisão sistemática: 'Efeitos de intervenções de saúde digital na adesão ao tratamento em doenças crônicas: uma revisão sistemática e metanálise'.",
  2: 'Resumo estruturado no formato PRISMA para resumos: objetivos, fontes (MEDLINE, Embase, CENTRAL, ClinicalTrials.gov), critérios de elegibilidade, 34 estudos incluídos e principal achado (aumento médio de 18% na adesão).',
  3: 'Situa a lacuna: revisões anteriores (2016–2019) não distinguiam apps de mensagens de texto de plataformas interativas; justifica a atualização com estudos publicados até 2024.',
  4: 'Objetivo no formato PICO: em adultos com doenças crônicas (P), intervenções de saúde digital (I) comparadas ao cuidado usual (C) aumentam a adesão ao tratamento (O)?',
  5: 'ECR e quase-experimentais, adultos ≥18 anos, qualquer app ou plataforma digital de suporte à adesão, comparador cuidado usual, desfecho de adesão medido objetivamente; excluídos estudos sem grupo controle.',
  6: 'MEDLINE (via PubMed), Embase, CENTRAL, PsycINFO e ClinicalTrials.gov, buscados de 1 jan. 2010 a 12 mar. 2024; lista de referências dos estudos incluídos revisada manualmente.',
  7: "Estratégia completa para PubMed no Apêndice A (ex.: ('mobile health'[tiab] OR 'mHealth'[tiab]) AND 'medication adherence'[tiab]), adaptada por base; sem filtro de idioma.",
  8: 'Dois revisores independentes triaram títulos/resumos no Rayyan; divergências resolvidas por um terceiro revisor; concordância inicial kappa = 0,86; sem uso de automação para exclusão.',
  9: 'Extração em dupla e independente, com formulário piloto no Covidence; divergências resolvidas por consenso; autores contatados por e-mail para dados ausentes (5 estudos, 3 responderam).',
  10: 'Desfecho primário: adesão medida objetivamente (ex.: MEMS, dados de log do app); secundários: desfechos clínicos e uso do sistema de saúde; covariáveis: idade, doença crônica, plataforma usada.',
  11: 'Risco de viés avaliado com a ferramenta RoB 2 (Cochrane) por dois revisores independentes, com discussão para resolver discrepâncias.',
  12: 'Diferença de médias padronizada (SMD) para adesão contínua; razão de risco (RR) para adesão dicotômica (≥80% de doses tomadas).',
  13: 'Metanálise de efeitos aleatórios (DerSimonian–Laird) no RevMan 5.4; heterogeneidade avaliada com I²; subgrupos por tipo de plataforma; sensibilidade excluindo estudos com alto risco de viés.',
  14: 'Assimetria avaliada com gráfico de funil e teste de Egger para a síntese com ≥10 estudos (adesão); demais sínteses avaliadas apenas visualmente por número insuficiente de estudos.',
  15: 'Certeza avaliada com GRADE para os desfechos primário e secundários, por dois revisores independentes, com justificativa registrada para cada rebaixamento.',
  16: '2.481 registros identificados, 1.906 triados após remoção de duplicatas, 126 relatos avaliados na íntegra, 34 estudos incluídos; diagrama de fluxo na Figura 1; 92 exclusões em texto completo listadas na Tabela S1 com razões.',
  17: 'Tabela 1 apresenta, para cada um dos 34 estudos: país, desenho, tamanho amostral, tipo de intervenção digital, comparador e duração do seguimento.',
  18: 'Figura 2 (gráfico de semáforo RoB 2) resume o risco de viés por domínio e estudo; 6 estudos classificados como alto risco, principalmente por desvios do protocolo.',
  19: 'Forest plot (Figura 3) com SMD e IC 95% de cada estudo para o desfecho de adesão; dados brutos por braço na Tabela S2.',
  20: 'Metanálise de 22 estudos: SMD = 0,42 (IC 95% 0,28–0,56; I² = 61%); subgrupo por plataforma reduziu a heterogeneidade (apps interativos: I² = 34%).',
  21: 'Teste de Egger não indicou assimetria significativa (p = 0,21) para a síntese principal de adesão.',
  22: 'Certeza da evidência classificada como moderada para o desfecho primário, rebaixada por risco de viés; Tabela 2 (Resumo GRADE) apresentada.',
  23: 'Resultados discutidos frente a revisões anteriores, com maior efeito em plataformas interativas; limitações incluem heterogeneidade de medidas de adesão e predomínio de estudos de curto prazo; implicações para futuras intervenções.',
  24: 'Protocolo registrado prospectivamente no PROSPERO (CRD42023123456) em 14/02/2023; uma alteração pós-registro (inclusão da PsycINFO) descrita e justificada.',
  25: 'Financiado por bolsa institucional de pesquisa; o financiador não participou do desenho, da análise ou da decisão de publicar.',
  26: 'Dois autores declaram consultoria prestada a empresas de saúde digital não relacionadas aos estudos incluídos; demais autores declaram não haver conflitos.',
  27: 'Planilha de extração, sintaxes de busca e scripts de análise (R) disponíveis em repositório público (exemplo fictício, para fins de demonstração).',
};

const exampleLocations: Record<number, string> = { 24: 'Registro do protocolo (PROSPERO)', 27: 'Materiais suplementares' };
const examplePages: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 3, 8: 4, 9: 4, 10: 4, 11: 4, 12: 5, 13: 5, 14: 5, 15: 5,
  16: 6, 17: 6, 18: 7, 19: 7, 20: 7, 21: 8, 22: 8, 23: 9, 24: 10, 25: 10, 26: 10, 27: 10,
};

export const createExampleChecklist = (): ChecklistEntry[] =>
  Array.from({ length: 27 }, (_, index) => {
    const item = index + 1;
    return {
      item,
      status: 'complete' as const,
      note: exampleNotes[item],
      location: exampleLocations[item] ?? 'Texto principal',
      page: String(examplePages[item]),
      section: checklistSections.find((section) => section.items.some((entry) => entry.item === item))?.section ?? '',
      url: '',
      reviewedAt: new Date().toISOString().slice(0, 10),
    };
  });
