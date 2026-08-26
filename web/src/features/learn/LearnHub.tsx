'use client';

import { useMemo, useState } from 'react';
import { BookOpen, ExternalLink, Search } from 'lucide-react';
import { useApp } from '../../app/AppProviders';
import type { Locale } from '../../domain/types';

interface Topic { title: string; short: string; technical: string; example: string; error: string; terms: string; }

const copy: Record<Locale, { title: string; intro: string; what: string; not: string; labels: string[]; topics: Topic[] }> = {
  'pt-BR': {
    title: 'Atlas PRISMA', intro: 'Respostas diretas, definições técnicas e exemplos para relatar revisões com transparência.',
    what: 'PRISMA é uma diretriz de relato que ajuda autores a comunicar por que uma revisão foi feita, quais métodos foram usados e quais resultados foram encontrados.',
    not: 'PRISMA não é uma metodologia para executar a revisão, não substitui julgamento especializado e não certifica um manuscrito.',
    labels: ['Definição técnica', 'Exemplo fictício', 'Erro comum', 'Termos relacionados'],
    topics: [
      { title: 'PRISMA 2009 × PRISMA 2020', short: 'A atualização de 2020 reflete mudanças na terminologia, nos métodos e na forma de relatar sínteses.', technical: 'PRISMA 2020 mantém 27 itens, com subitens e recomendações ampliadas; inclui modelos para revisões novas e atualizadas.', example: 'Uma atualização de revisão informa separadamente estudos anteriores e novos.', error: 'Tratar 2020 apenas como uma mudança gráfica.', terms: 'história, atualização, checklist' },
      { title: 'Registros, relatos e estudos', short: 'Um registro é uma entrada localizada; um relato é um documento; um estudo é a investigação única.', technical: 'Múltiplos relatos podem descrever um único estudo. As unidades não devem ser somadas como se fossem equivalentes.', example: 'Um ensaio com artigo, protocolo e resumo: três relatos, um estudo.', error: 'Usar “artigos” em todas as caixas.', terms: 'unidade de contagem, deduplicação' },
      { title: 'Identificação e remoção', short: 'O fluxo começa nas fontes pesquisadas e documenta remoções anteriores à triagem.', technical: 'Bases, registros e outras fontes ocupam ramos distintos; duplicatas, automação e outras remoções são discriminadas.', example: 'Contagens por base somam o total informado no ramo de bases.', error: 'Subtrair duplicatas duas vezes.', terms: 'bases, registros, automação' },
      { title: 'Triagem, recuperação e elegibilidade', short: 'Cada etapa muda a unidade e precisa fechar com a anterior.', technical: 'Registros são triados; relatos são procurados, recuperados e avaliados; exclusões após elegibilidade recebem razões.', example: '100 relatos procurados, 4 não recuperados: 96 avaliados.', error: 'Confundir registro excluído na triagem com relato excluído após texto completo.', terms: 'screening, full text, razões' },
      { title: 'Checklist de 27 itens', short: 'O checklist acompanha o relato inteiro, não apenas o diagrama.', technical: 'Os itens abrangem título, resumo, introdução, métodos, resultados, discussão e outras informações.', example: 'O item 16 documenta a seleção dos estudos e pode apontar para o diagrama.', error: 'Usar um diagrama correto como prova de que todo o artigo está completo.', terms: 'item 16, manuscrito, localização' },
      { title: 'Extensões e ciência aberta', short: 'Extensões complementam a diretriz principal para tipos ou aspectos específicos de revisão.', technical: 'PRISMA-P cobre protocolos; ScR, revisões de escopo; S, buscas; LSR, revisões vivas; NMA, metanálise em rede.', example: 'Uma revisão de escopo consulta PRISMA-ScR e pode usar PRISMA-S para detalhar buscas.', error: 'Chamar toda orientação de “PRISMA Protocol”.', terms: 'PRISMA-P, ScR, S, LSR, NMA' },
    ],
  },
  en: {
    title: 'PRISMA Atlas', intro: 'Direct answers, technical definitions and examples for transparent review reporting.',
    what: 'PRISMA is a reporting guideline that helps authors communicate why a review was done, which methods were used and what was found.',
    not: 'PRISMA is not a method for conducting a review, does not replace expert judgment and does not certify a manuscript.',
    labels: ['Technical definition', 'Fictional example', 'Common error', 'Related terms'],
    topics: [
      { title: 'PRISMA 2009 × PRISMA 2020', short: 'The 2020 update reflects changes in terminology, methods and synthesis reporting.', technical: 'PRISMA 2020 retains 27 items with expanded subitems and templates for new and updated reviews.', example: 'An updated review reports previous and newly included studies separately.', error: 'Treating 2020 as a graphical change only.', terms: 'history, update, checklist' },
      { title: 'Records, reports and studies', short: 'A record is a located entry; a report is a document; a study is the unique investigation.', technical: 'Several reports may describe one study. These units must not be treated as interchangeable.', example: 'One trial with an article, protocol and abstract: three reports, one study.', error: 'Using “articles” in every box.', terms: 'unit of count, deduplication' },
      { title: 'Identification and removal', short: 'The flow starts with searched sources and documents removals before screening.', technical: 'Databases, registers and other sources have distinct branches; duplicates, automation and other removals are reported.', example: 'Database-level counts add up to the database branch total.', error: 'Subtracting duplicates twice.', terms: 'databases, registers, automation' },
      { title: 'Screening, retrieval and eligibility', short: 'Each stage changes the unit and must reconcile with the previous stage.', technical: 'Records are screened; reports are sought, retrieved and assessed; eligibility exclusions have reasons.', example: '100 reports sought and 4 not retrieved means 96 assessed.', error: 'Confusing screening exclusions with full-text exclusions.', terms: 'screening, full text, reasons' },
      { title: 'The 27-item checklist', short: 'The checklist covers the full report, not just the flow diagram.', technical: 'Items cover title, abstract, introduction, methods, results, discussion and other information.', example: 'Item 16 reports study selection and may point to the diagram.', error: 'Taking a consistent diagram as proof that the full article is complete.', terms: 'item 16, manuscript, location' },
      { title: 'Extensions and open science', short: 'Extensions complement the main guideline for specific review types or aspects.', technical: 'PRISMA-P covers protocols; ScR scoping reviews; S searches; LSR living reviews; NMA network meta-analysis.', example: 'A scoping review consults PRISMA-ScR and may use PRISMA-S for searches.', error: 'Calling every guideline “PRISMA Protocol”.', terms: 'PRISMA-P, ScR, S, LSR, NMA' },
    ],
  },
  it: {
    title: 'Atlante PRISMA', intro: 'Risposte dirette, definizioni tecniche ed esempi per un reporting trasparente.',
    what: 'PRISMA è una linea guida di reporting che aiuta a comunicare perché è stata svolta una revisione, quali metodi sono stati usati e quali risultati sono emersi.',
    not: 'PRISMA non è un metodo per condurre la revisione, non sostituisce il giudizio esperto e non certifica un manoscritto.',
    labels: ['Definizione tecnica', 'Esempio fittizio', 'Errore comune', 'Termini correlati'],
    topics: [
      { title: 'PRISMA 2009 × PRISMA 2020', short: 'L’aggiornamento 2020 riflette cambiamenti terminologici e metodologici.', technical: 'PRISMA 2020 mantiene 27 item ampliati e modelli per revisioni nuove e aggiornate.', example: 'Una revisione aggiornata separa studi precedenti e nuovi.', error: 'Considerare il 2020 solo un cambiamento grafico.', terms: 'storia, aggiornamento, checklist' },
      { title: 'Record, report e studi', short: 'Un record è una voce; un report è un documento; uno studio è l’indagine unica.', technical: 'Più report possono descrivere uno studio e le unità non sono intercambiabili.', example: 'Articolo, protocollo e abstract di un trial: tre report, uno studio.', error: 'Usare “articoli” in ogni casella.', terms: 'unità di conteggio, duplicati' },
      { title: 'Identificazione e rimozione', short: 'Il flusso parte dalle fonti e documenta le rimozioni prima dello screening.', technical: 'Banche dati, registri e altre fonti restano distinti.', example: 'I conteggi delle singole banche dati formano il totale del ramo.', error: 'Sottrarre due volte i duplicati.', terms: 'banche dati, registri, automazione' },
      { title: 'Screening ed eleggibilità', short: 'Ogni passaggio cambia unità e deve conciliarsi con il precedente.', technical: 'Si esaminano record e si recuperano e valutano report.', example: '100 report cercati meno 4 non recuperati uguale 96 valutati.', error: 'Confondere esclusioni iniziali e a testo completo.', terms: 'screening, testo completo' },
      { title: 'Checklist di 27 item', short: 'La checklist riguarda l’intero report.', technical: 'Copre titolo, abstract, metodi, risultati e discussione.', example: 'L’item 16 descrive la selezione degli studi.', error: 'Considerare il diagramma prova di completezza totale.', terms: 'item 16, manoscritto' },
      { title: 'Estensioni e scienza aperta', short: 'Le estensioni completano la linea guida principale.', technical: 'PRISMA-P, ScR, S, LSR e NMA hanno scopi distinti.', example: 'Una scoping review consulta PRISMA-ScR.', error: 'Chiamare tutto “PRISMA Protocol”.', terms: 'P, ScR, S, LSR, NMA' },
    ],
  },
  fr: {
    title: 'Atlas PRISMA', intro: 'Réponses directes, définitions techniques et exemples pour un compte rendu transparent.',
    what: 'PRISMA est une ligne directrice de compte rendu qui aide à expliquer pourquoi une revue a été menée, quelles méthodes ont été utilisées et quels résultats ont été obtenus.',
    not: 'PRISMA n’est pas une méthode pour conduire la revue, ne remplace pas le jugement expert et ne certifie pas un manuscrit.',
    labels: ['Définition technique', 'Exemple fictif', 'Erreur fréquente', 'Termes liés'],
    topics: [
      { title: 'PRISMA 2009 × PRISMA 2020', short: 'La mise à jour 2020 reflète les évolutions terminologiques et méthodologiques.', technical: 'PRISMA 2020 conserve 27 items élargis et des modèles pour revues nouvelles et actualisées.', example: 'Une mise à jour distingue études antérieures et nouvelles.', error: 'Réduire 2020 à un changement graphique.', terms: 'histoire, mise à jour, checklist' },
      { title: 'Enregistrements, rapports et études', short: 'Un enregistrement est une entrée, un rapport un document, une étude l’investigation unique.', technical: 'Plusieurs rapports peuvent décrire une étude; les unités ne sont pas interchangeables.', example: 'Article, protocole et résumé d’un essai: trois rapports, une étude.', error: 'Employer «articles» dans toutes les cases.', terms: 'unité, dédoublonnage' },
      { title: 'Identification et retrait', short: 'Le flux part des sources et documente les retraits avant sélection.', technical: 'Bases, registres et autres sources occupent des branches distinctes.', example: 'Les nombres par base forment le total de la branche.', error: 'Soustraire deux fois les doublons.', terms: 'bases, registres, automatisation' },
      { title: 'Sélection et éligibilité', short: 'Chaque étape change d’unité et doit se concilier avec la précédente.', technical: 'Les enregistrements sont examinés; les rapports recherchés puis évalués.', example: '100 rapports recherchés moins 4 non récupérés donnent 96 évalués.', error: 'Confondre exclusions initiales et texte intégral.', terms: 'sélection, texte intégral' },
      { title: 'Checklist de 27 items', short: 'La checklist couvre le rapport entier.', technical: 'Elle couvre titre, résumé, méthodes, résultats et discussion.', example: 'L’item 16 décrit la sélection des études.', error: 'Croire qu’un diagramme suffit à prouver la complétude.', terms: 'item 16, manuscrit' },
      { title: 'Extensions et science ouverte', short: 'Les extensions complètent la ligne directrice principale.', technical: 'PRISMA-P, ScR, S, LSR et NMA ont des usages distincts.', example: 'Une revue de portée consulte PRISMA-ScR.', error: 'Tout appeler «PRISMA Protocol».', terms: 'P, ScR, S, LSR, NMA' },
    ],
  },
  de: {
    title: 'PRISMA-Atlas', intro: 'Direkte Antworten, technische Definitionen und Beispiele für transparente Berichterstattung.',
    what: 'PRISMA ist eine Berichtsleitlinie. Sie hilft zu erklären, warum eine Übersichtsarbeit durchgeführt wurde, welche Methoden verwendet wurden und was gefunden wurde.',
    not: 'PRISMA ist keine Methode zur Durchführung der Review, ersetzt kein Fachurteil und zertifiziert kein Manuskript.',
    labels: ['Technische Definition', 'Fiktives Beispiel', 'Häufiger Fehler', 'Verwandte Begriffe'],
    topics: [
      { title: 'PRISMA 2009 × PRISMA 2020', short: 'Die Aktualisierung bildet terminologische und methodische Änderungen ab.', technical: 'PRISMA 2020 behält 27 erweiterte Items und Vorlagen für neue und aktualisierte Reviews.', example: 'Eine Aktualisierung trennt frühere und neue Studien.', error: '2020 nur als grafische Änderung verstehen.', terms: 'Geschichte, Update, Checkliste' },
      { title: 'Datensätze, Berichte und Studien', short: 'Datensatz, Dokument und eindeutige Studie sind verschiedene Einheiten.', technical: 'Mehrere Berichte können eine Studie beschreiben; Einheiten sind nicht austauschbar.', example: 'Artikel, Protokoll und Abstract eines Trials: drei Berichte, eine Studie.', error: 'In jedem Kasten „Artikel“ verwenden.', terms: 'Zähleinheit, Deduplizierung' },
      { title: 'Identifikation und Entfernung', short: 'Der Fluss beginnt bei Quellen und dokumentiert Entfernungen vor dem Screening.', technical: 'Datenbanken, Register und weitere Quellen bleiben getrennt.', example: 'Einzelne Datenbankzahlen ergeben den Zweigtotal.', error: 'Duplikate zweimal abziehen.', terms: 'Datenbanken, Register, Automatisierung' },
      { title: 'Screening und Eignung', short: 'Jede Stufe wechselt die Einheit und muss zur vorherigen passen.', technical: 'Datensätze werden gescreent; Berichte gesucht und bewertet.', example: '100 gesuchte minus 4 nicht beschaffte Berichte ergeben 96 bewertete.', error: 'Erste und Volltext-Ausschlüsse verwechseln.', terms: 'Screening, Volltext' },
      { title: 'Checkliste mit 27 Items', short: 'Die Checkliste betrifft den gesamten Bericht.', technical: 'Sie umfasst Titel, Abstract, Methoden, Ergebnisse und Diskussion.', example: 'Item 16 dokumentiert die Studienauswahl.', error: 'Ein korrektes Diagramm als Vollständigkeitsbeweis nehmen.', terms: 'Item 16, Manuskript' },
      { title: 'Erweiterungen und offene Wissenschaft', short: 'Erweiterungen ergänzen die Hauptleitlinie.', technical: 'PRISMA-P, ScR, S, LSR und NMA haben verschiedene Zwecke.', example: 'Ein Scoping Review nutzt PRISMA-ScR.', error: 'Alles „PRISMA Protocol“ nennen.', terms: 'P, ScR, S, LSR, NMA' },
    ],
  },
  'zh-CN': {
    title: 'PRISMA 知识图谱', intro: '以简明答案、技术定义和示例支持透明的综述报告。',
    what: 'PRISMA 是报告指南，帮助作者说明为何开展综述、采用了哪些方法以及发现了什么。',
    not: 'PRISMA 不是开展综述的方法学，不替代专业判断，也不对稿件进行认证。',
    labels: ['技术定义', '虚构示例', '常见错误', '相关术语'],
    topics: [
      { title: 'PRISMA 2009 与 PRISMA 2020', short: '2020 版反映术语、方法和综合报告方式的变化。', technical: 'PRISMA 2020 保留 27 个条目并扩展子条目，提供新综述和更新综述模板。', example: '更新综述分别报告既往和新纳入研究。', error: '将 2020 版仅视为图形变化。', terms: '历史、更新、核对清单' },
      { title: '记录、报告与研究', short: '记录是检索条目，报告是文献，研究是唯一的调查。', technical: '一项研究可由多份报告描述，三种单位不可互换。', example: '同一试验的论文、方案和摘要：三份报告，一项研究。', error: '在所有方框中都使用“文章”。', terms: '计数单位、去重' },
      { title: '识别与筛选前移除', short: '流程从检索来源开始，并记录筛选前移除。', technical: '数据库、注册平台和其他来源使用不同分支。', example: '各数据库数量之和等于该分支总数。', error: '重复扣除重复记录。', terms: '数据库、注册、自动化' },
      { title: '筛选、获取与合格性', short: '每个阶段的单位会变化，并须与上一阶段一致。', technical: '筛选记录；寻求、获取并评估报告。', example: '寻求 100 份报告，4 份未获取，则评估 96 份。', error: '混淆初筛排除与全文排除。', terms: '筛选、全文、理由' },
      { title: '27 条核对清单', short: '核对清单覆盖完整报告，不仅是流程图。', technical: '条目涵盖标题、摘要、方法、结果、讨论和其他信息。', example: '第 16 条报告研究选择并可指向流程图。', error: '把一致的流程图当作全文完整性的证明。', terms: '第16条、稿件、位置' },
      { title: '扩展指南与开放科学', short: '扩展指南针对特定综述类型或环节补充主指南。', technical: 'PRISMA-P、ScR、S、LSR 和 NMA 各有不同用途。', example: '范围综述参考 PRISMA-ScR。', error: '把所有指南称为“PRISMA Protocol”。', terms: 'P、ScR、S、LSR、NMA' },
    ],
  },
};

export function LearnHub() {
  const { locale } = useApp();
  const [query, setQuery] = useState('');
  const text = copy[locale];
  const topics = useMemo(() => text.topics.filter((topic) => JSON.stringify(topic).toLowerCase().includes(query.toLowerCase())), [query, text]);
  return (
    <main id="main-content" className="content-page learn-page">
      <header className="page-hero"><div><p className="eyebrow"><span /> BASEADO EM FONTES PRIMÁRIAS · ATUALIZADO EM 26 AGO. 2026</p><h1>{text.title}</h1><p>{text.intro}</p></div><BookOpen size={72} strokeWidth={1} aria-hidden="true" /></header>
      <section className="definition-pair"><article><span>O QUE É</span><p>{text.what}</p></article><article><span>O QUE NÃO É</span><p>{text.not}</p></article></section>
      <label className="learn-search"><Search aria-hidden="true" /><span className="sr-only">Pesquisar temas</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar conceito, etapa ou extensão…" /></label>
      <section className="topic-grid" aria-live="polite">
        {topics.map((topic, index) => <article className="topic-card" key={topic.title}><header><span>{String(index + 1).padStart(2, '0')}</span><h2>{topic.title}</h2></header><p className="short-answer">{topic.short}</p><dl><div><dt>{text.labels[0]}</dt><dd>{topic.technical}</dd></div><div><dt>{text.labels[1]}</dt><dd>{topic.example}</dd></div><div><dt>{text.labels[2]}</dt><dd>{topic.error}</dd></div><div><dt>{text.labels[3]}</dt><dd>{topic.terms}</dd></div></dl><a className="source-link" href="https://www.prisma-statement.org/prisma-2020" target="_blank" rel="noopener noreferrer">Fonte primária <ExternalLink size={13} /></a></article>)}
      </section>
    </main>
  );
}
