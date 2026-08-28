'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, Route } from 'lucide-react';
import { useApp } from '../../app/AppProviders';
import type { Locale } from '../../domain/types';

interface ExtensionInfo {
  id: string;
  purpose: string;
  year: string;
  href: string;
}

const extensionsData: Record<Locale, ExtensionInfo[]> = {
  'pt-BR': [
    { id: 'PRISMA-P', purpose: 'Protocolos de revisões sistemáticas', year: '2015', href: 'https://www.prisma-statement.org/protocols' },
    { id: 'PRISMA-ScR', purpose: 'Revisões de escopo', year: '2018', href: 'https://www.prisma-statement.org/scoping' },
    { id: 'PRISMA-S', purpose: 'Relato de buscas bibliográficas', year: '2021', href: 'https://www.prisma-statement.org/prisma-search' },
    { id: 'PRISMA-LSR', purpose: 'Revisões sistemáticas vivas', year: '2024', href: 'https://www.prisma-statement.org/living-systematic-reviews' },
    { id: 'PRISMA-NMA', purpose: 'Metanálises em rede', year: '2015', href: 'https://www.prisma-statement.org/network-meta-analyses' },
    { id: 'PRISMA-DTA', purpose: 'Acurácia de testes diagnósticos', year: '2018', href: 'https://www.prisma-statement.org/dta' },
    { id: 'PRISMA-IPD', purpose: 'Dados individuais de participantes', year: '2015', href: 'https://www.prisma-statement.org/individual-participant-data' },
    { id: 'PRISMA-Harms', purpose: 'Relato de danos', year: '2016', href: 'https://www.prisma-statement.org/harms' },
  ],
  en: [
    { id: 'PRISMA-P', purpose: 'Systematic review protocols', year: '2015', href: 'https://www.prisma-statement.org/protocols' },
    { id: 'PRISMA-ScR', purpose: 'Scoping reviews', year: '2018', href: 'https://www.prisma-statement.org/scoping' },
    { id: 'PRISMA-S', purpose: 'Reporting literature searches', year: '2021', href: 'https://www.prisma-statement.org/prisma-search' },
    { id: 'PRISMA-LSR', purpose: 'Living systematic reviews', year: '2024', href: 'https://www.prisma-statement.org/living-systematic-reviews' },
    { id: 'PRISMA-NMA', purpose: 'Network meta-analyses', year: '2015', href: 'https://www.prisma-statement.org/network-meta-analyses' },
    { id: 'PRISMA-DTA', purpose: 'Diagnostic test accuracy', year: '2018', href: 'https://www.prisma-statement.org/dta' },
    { id: 'PRISMA-IPD', purpose: 'Individual participant data', year: '2015', href: 'https://www.prisma-statement.org/individual-participant-data' },
    { id: 'PRISMA-Harms', purpose: 'Harms reporting', year: '2016', href: 'https://www.prisma-statement.org/harms' },
  ],
  it: [
    { id: 'PRISMA-P', purpose: 'Protocolli di revisioni sistematiche', year: '2015', href: 'https://www.prisma-statement.org/protocols' },
    { id: 'PRISMA-ScR', purpose: 'Scoping review', year: '2018', href: 'https://www.prisma-statement.org/scoping' },
    { id: 'PRISMA-S', purpose: 'Reporting delle ricerche bibliografiche', year: '2021', href: 'https://www.prisma-statement.org/prisma-search' },
    { id: 'PRISMA-LSR', purpose: 'Revisioni sistematiche viventi', year: '2024', href: 'https://www.prisma-statement.org/living-systematic-reviews' },
    { id: 'PRISMA-NMA', purpose: 'Network meta-analisi', year: '2015', href: 'https://www.prisma-statement.org/network-meta-analyses' },
    { id: 'PRISMA-DTA', purpose: 'Accuratezza dei test diagnostici', year: '2018', href: 'https://www.prisma-statement.org/dta' },
    { id: 'PRISMA-IPD', purpose: 'Dati individuali dei partecipanti', year: '2015', href: 'https://www.prisma-statement.org/individual-participant-data' },
    { id: 'PRISMA-Harms', purpose: 'Segnalazione dei danni', year: '2016', href: 'https://www.prisma-statement.org/harms' },
  ],
  fr: [
    { id: 'PRISMA-P', purpose: 'Protocoles de revues systématiques', year: '2015', href: 'https://www.prisma-statement.org/protocols' },
    { id: 'PRISMA-ScR', purpose: 'Revues de cadrage (scoping reviews)', year: '2018', href: 'https://www.prisma-statement.org/scoping' },
    { id: 'PRISMA-S', purpose: 'Compte rendu des recherches documentaires', year: '2021', href: 'https://www.prisma-statement.org/prisma-search' },
    { id: 'PRISMA-LSR', purpose: 'Revues systématiques vivantes', year: '2024', href: 'https://www.prisma-statement.org/living-systematic-reviews' },
    { id: 'PRISMA-NMA', purpose: 'Méta-analyses en réseau', year: '2015', href: 'https://www.prisma-statement.org/network-meta-analyses' },
    { id: 'PRISMA-DTA', purpose: 'Précision des tests diagnostiques', year: '2018', href: 'https://www.prisma-statement.org/dta' },
    { id: 'PRISMA-IPD', purpose: 'Données individuelles des participants', year: '2015', href: 'https://www.prisma-statement.org/individual-participant-data' },
    { id: 'PRISMA-Harms', purpose: 'Rapport des effets indésirables', year: '2016', href: 'https://www.prisma-statement.org/harms' },
  ],
  de: [
    { id: 'PRISMA-P', purpose: 'Protokolle für systematische Reviews', year: '2015', href: 'https://www.prisma-statement.org/protocols' },
    { id: 'PRISMA-ScR', purpose: 'Scoping Reviews', year: '2018', href: 'https://www.prisma-statement.org/scoping' },
    { id: 'PRISMA-S', purpose: 'Berichterstattung über Literatursuchen', year: '2021', href: 'https://www.prisma-statement.org/prisma-search' },
    { id: 'PRISMA-LSR', purpose: 'Lebende systematische Reviews', year: '2024', href: 'https://www.prisma-statement.org/living-systematic-reviews' },
    { id: 'PRISMA-NMA', purpose: 'Netzwerk-Metaanalysen', year: '2015', href: 'https://www.prisma-statement.org/network-meta-analyses' },
    { id: 'PRISMA-DTA', purpose: 'Diagnostische Testgenauigkeit', year: '2018', href: 'https://www.prisma-statement.org/dta' },
    { id: 'PRISMA-IPD', purpose: 'Individuelle Teilnehmerdaten', year: '2015', href: 'https://www.prisma-statement.org/individual-participant-data' },
    { id: 'PRISMA-Harms', purpose: 'Berichterstattung über Schäden', year: '2016', href: 'https://www.prisma-statement.org/harms' },
  ],
  'zh-CN': [
    { id: 'PRISMA-P', purpose: '系统综述方案规范', year: '2015', href: 'https://www.prisma-statement.org/protocols' },
    { id: 'PRISMA-ScR', purpose: '范围综述规范', year: '2018', href: 'https://www.prisma-statement.org/scoping' },
    { id: 'PRISMA-S', purpose: '文献检索报告规范', year: '2021', href: 'https://www.prisma-statement.org/prisma-search' },
    { id: 'PRISMA-LSR', purpose: '实时更新系统综述规范', year: '2024', href: 'https://www.prisma-statement.org/living-systematic-reviews' },
    { id: 'PRISMA-NMA', purpose: '网状 Meta 分析规范', year: '2015', href: 'https://www.prisma-statement.org/network-meta-analyses' },
    { id: 'PRISMA-DTA', purpose: '诊断性试验准确性规范', year: '2018', href: 'https://www.prisma-statement.org/dta' },
    { id: 'PRISMA-IPD', purpose: '个体受试者数据分析规范', year: '2015', href: 'https://www.prisma-statement.org/individual-participant-data' },
    { id: 'PRISMA-Harms', purpose: '不良反应与危害报告规范', year: '2016', href: 'https://www.prisma-statement.org/harms' },
  ],
};

const guideI18n: Record<
  Locale,
  {
    eyebrow: string;
    heroTitle: string;
    heroLead: string;
    q1: string;
    optProtocol: string;
    optComplete: string;
    q2: string;
    typeSystematic: string;
    typeScoping: string;
    typeLiving: string;
    typeNetwork: string;
    typeIntegrative: string;
    q3: string;
    q3Check: string;
    q4: string;
    q4Check: string;
    q5: string;
    q5Check: string;
    recKicker: string;
    recProtocolDesc: string;
    recIntegrativeDesc: string;
    recGeneralDesc: string;
    startRecommended: string;
    limitNote: string;
    directoryKicker: string;
    directoryTitle: string;
    directoryLead: string;
    officialSource: string;
  }
> = {
  'pt-BR': {
    eyebrow: 'ASSISTENTE DE ORIENTAÇÃO',
    heroTitle: 'Qual diretriz consultar?',
    heroLead: 'Responda a cinco perguntas para receber uma orientação inicial e links oficiais. O resultado não substitui aconselhamento metodológico.',
    q1: '1. Você está preparando um protocolo ou relatando uma revisão concluída?',
    optProtocol: 'Protocolo',
    optComplete: 'Revisão concluída',
    q2: '2. Qual é o tipo principal?',
    typeSystematic: 'Revisão sistemática',
    typeScoping: 'Revisão de escopo',
    typeLiving: 'Revisão sistemática viva',
    typeNetwork: 'Metanálise em rede',
    typeIntegrative: 'Revisão integrativa',
    q3: '3. A revisão atualiza uma versão anterior?',
    q3Check: 'Sim, é uma revisão atualizada',
    q4: '4. Foram usadas outras fontes além de bases e registros?',
    q4Check: 'Sites, organizações, citações ou outras fontes',
    q5: '5. É necessário detalhar o relato das buscas?',
    q5Check: 'Consultar também PRISMA-S',
    recKicker: 'ORIENTAÇÃO INICIAL',
    recProtocolDesc: 'PRISMA-P é específico para o desenvolvimento e relato de protocolos. Não é sinônimo de PRISMA 2020.',
    recIntegrativeDesc: 'Revisões integrativas não têm uma extensão oficial do PRISMA. O PRISMA 2020 é sugerido apenas como referência estrutural para o diagrama de fluxo e o relato; o desenho metodológico deve seguir uma abordagem própria.',
    recGeneralDesc: 'A diretriz principal ou extensão deve ser lida junto com seus documentos explicativos oficiais.',
    startRecommended: 'Iniciar modelo recomendado',
    limitNote: 'Limite: este assistente usa respostas gerais e não avalia o desenho completo, a área temática ou exigências editoriais.',
    directoryKicker: 'DIRETÓRIO OFICIAL',
    directoryTitle: 'Extensões selecionadas',
    directoryLead: 'Estas páginas apresentam orientação educacional e links oficiais; o construtor não simula suporte integral a extensões ainda não implementadas.',
    officialSource: 'Fonte oficial',
  },
  en: {
    eyebrow: 'GUIDANCE ASSISTANT',
    heroTitle: 'Which guideline should I consult?',
    heroLead: 'Answer five questions to receive initial guidance and official links. This does not replace methodological consultation.',
    q1: '1. Are you preparing a protocol or reporting a completed review?',
    optProtocol: 'Protocol',
    optComplete: 'Completed review',
    q2: '2. What is the primary review type?',
    typeSystematic: 'Systematic review',
    typeScoping: 'Scoping review',
    typeLiving: 'Living systematic review',
    typeNetwork: 'Network meta-analysis',
    typeIntegrative: 'Integrative review',
    q3: '3. Does this review update a previous version?',
    q3Check: 'Yes, this is an updated review',
    q4: '4. Were sources other than databases and registers used?',
    q4Check: 'Websites, organisations, citations or other sources',
    q5: '5. Do search methods require detailed reporting?',
    q5Check: 'Also consult PRISMA-S',
    recKicker: 'INITIAL GUIDANCE',
    recProtocolDesc: 'PRISMA-P is specifically designed for protocols. It is not synonymous with PRISMA 2020.',
    recIntegrativeDesc: 'Integrative reviews do not have an official PRISMA extension. PRISMA 2020 is suggested only as a structural reference for the flow diagram.',
    recGeneralDesc: 'The primary guideline or extension should be read alongside its official explanation and elaboration papers.',
    startRecommended: 'Start recommended model',
    limitNote: 'Disclaimer: this assistant provides broad guidance and does not evaluate full study design, discipline, or specific editorial policies.',
    directoryKicker: 'OFFICIAL DIRECTORY',
    directoryTitle: 'Selected extensions',
    directoryLead: 'These resources offer educational guidance and official links.',
    officialSource: 'Official source',
  },
  it: {
    eyebrow: 'ASSISTENTE DI ORIENTAMENTO',
    heroTitle: 'Quale linea guida consultare?',
    heroLead: 'Rispondi a cinque domande per ricevere un orientamento iniziale e link ufficiali.',
    q1: '1. Stai preparando un protocollo o riportando una revisione completata?',
    optProtocol: 'Protocollo',
    optComplete: 'Revisione completata',
    q2: '2. Qual è la tipologia principale?',
    typeSystematic: 'Revisione sistematica',
    typeScoping: 'Scoping review',
    typeLiving: 'Revisione sistematica vivente',
    typeNetwork: 'Network meta-analisi',
    typeIntegrative: 'Revisione integrativa',
    q3: '3. La revisione aggiorna una versione precedente?',
    q3Check: 'Sì, è una revisione aggiornata',
    q4: '4. Sono state utilizzate altre fonti oltre a banche dati e registri?',
    q4Check: 'Siti web, organizzazioni, citazioni o altre fonti',
    q5: '5. È necessario dettagliare il resoconto delle ricerche?',
    q5Check: 'Consulta anche PRISMA-S',
    recKicker: 'ORIENTAMENTO INIZIALE',
    recProtocolDesc: 'PRISMA-P è specifico per la stesura e il reporting dei protocolli.',
    recIntegrativeDesc: 'Le revisioni integrative non hanno un’estensione ufficiale PRISMA. PRISMA 2020 è suggerito come riferimento strutturale.',
    recGeneralDesc: 'La linea guida principale va letta insieme ai documenti esplicativi ufficiali.',
    startRecommended: 'Avvia modello consigliato',
    limitNote: 'Limite: questo assistente fornisce indicazioni generali e non sostituisce pareri metodologici.',
    directoryKicker: 'DIRECTORY UFFICIALE',
    directoryTitle: 'Estensioni selezionate',
    directoryLead: 'Pagine educative e collegamenti ufficiali.',
    officialSource: 'Fonte ufficiale',
  },
  fr: {
    eyebrow: 'ASSISTANT D’ORIENTATION',
    heroTitle: 'Quelle directive consulter ?',
    heroLead: 'Répondez à cinq questions pour recevoir des recommandations initiales et des liens officiels.',
    q1: '1. Préparez-vous un protocole ou rédigez-vous une revue terminée ?',
    optProtocol: 'Protocole',
    optComplete: 'Revue terminée',
    q2: '2. Quel est le type principal ?',
    typeSystematic: 'Revue systématique',
    typeScoping: 'Revue de cadrage (scoping review)',
    typeLiving: 'Revue systématique vivante',
    typeNetwork: 'Méta-analyse en réseau',
    typeIntegrative: 'Revue intégrative',
    q3: '3. La revue met-elle à jour une version antérieure ?',
    q3Check: 'Oui, il s’agit d’une revue mise à jour',
    q4: '4. D’autres sources que bases et registres ont-elles été utilisées ?',
    q4Check: 'Sites, organisations, citations ou autres sources',
    q5: '5. Est-il nécessaire de détailler les recherches documentaires ?',
    q5Check: 'Consulter également PRISMA-S',
    recKicker: 'RECOMMANDATION INITIALE',
    recProtocolDesc: 'PRISMA-P est spécifique aux protocoles. Ce n’est pas synonyme de PRISMA 2020.',
    recIntegrativeDesc: 'Les revues intégratives ne disposent pas d’une extension PRISMA officielle.',
    recGeneralDesc: 'La directive principale doit être consultée avec ses documents explicatifs officiels.',
    startRecommended: 'Démarrer le modèle recommandé',
    limitNote: 'Limite : cet assistant donne des indications générales et ne remplace pas une expertise méthodologique.',
    directoryKicker: 'RÉPERTOIRE OFFICIEL',
    directoryTitle: 'Extensions sélectionnées',
    directoryLead: 'Ressources éducatives et liens officiels.',
    officialSource: 'Source officielle',
  },
  de: {
    eyebrow: 'LEITLINIEN-ASSISTENT',
    heroTitle: 'Welche Leitlinie sollte konsultiert werden?',
    heroLead: 'Beantworten Sie fünf Fragen für eine erste Orientierung und offizielle Links.',
    q1: '1. Bereiten Sie ein Protokoll vor oder berichten Sie über ein abgeschlossenes Review?',
    optProtocol: 'Protokoll',
    optComplete: 'Abgeschlossenes Review',
    q2: '2. Was ist der Haupttyp?',
    typeSystematic: 'Systematisches Review',
    typeScoping: 'Scoping Review',
    typeLiving: 'Lebendes systematisches Review',
    typeNetwork: 'Netzwerk-Metaanalyse',
    typeIntegrative: 'Integratives Review',
    q3: '3. Aktualisiert das Review eine frühere Version?',
    q3Check: 'Ja, es ist ein aktualisiertes Review',
    q4: '4. Wurden weitere Quellen neben Datenbanken und Registern genutzt?',
    q4Check: 'Websites, Organisationen, Zitationen oder weitere Quellen',
    q5: '5. Müssen Suchmethoden detailliert berichtet werden?',
    q5Check: 'Auch PRISMA-S konsultieren',
    recKicker: 'ERSTE ORIENTIERUNG',
    recProtocolDesc: 'PRISMA-P ist spezifisch für Protokolle gedacht.',
    recIntegrativeDesc: 'Integrative Reviews haben keine offizielle PRISMA-Erweiterung.',
    recGeneralDesc: 'Die Hauptleitlinie sollte zusammen mit den Erläuterungsdokumenten gelesen werden.',
    startRecommended: 'Empfohlenes Modell starten',
    limitNote: 'Einschränkung: Dieser Assistent ersetzt keine methodische Beratung.',
    directoryKicker: 'OFFIZIELLES VERZEICHNIS',
    directoryTitle: 'Ausgewählte Erweiterungen',
    directoryLead: 'Bildungsressourcen und offizielle Links.',
    officialSource: 'Offizielle Quelle',
  },
  'zh-CN': {
    eyebrow: '指南指引助手',
    heroTitle: '我该参考哪项指南？',
    heroLead: '回答五个问题即可获取初始指南建议及官方链接。本工具不能替代方法学咨询。',
    q1: '1. 您是在撰写研究方案还是报告已完成的系统综述？',
    optProtocol: '研究方案',
    optComplete: '已完成的综述',
    q2: '2. 综述的主要类型是什么？',
    typeSystematic: '系统综述',
    typeScoping: '范围综述',
    typeLiving: '实时更新系统综述',
    typeNetwork: '网状 Meta 分析',
    typeIntegrative: '整合性综述',
    q3: '3. 本次综述是否为既往版本的更新？',
    q3Check: '是，这是一篇更新综述',
    q4: '4. 除数据库和注册库外，是否使用了其他来源？',
    q4Check: '网站、组织机构、引文检索或其他来源',
    q5: '5. 是否需要详细报告文献检索方法？',
    q5Check: '同时参考 PRISMA-S',
    recKicker: '初始建议',
    recProtocolDesc: 'PRISMA-P 专用于方案的制定与报告，与 PRISMA 2020 并不等同。',
    recIntegrativeDesc: '整合性综述目前尚无官方 PRISMA 扩展声明，PRISMA 2020 仅可作为流程图和报告的结构参考。',
    recGeneralDesc: '主要指南或扩展声明应与其官方解释与阐述文献一并阅读。',
    startRecommended: '启动推荐模型',
    limitNote: '说明：本助手仅提供宏观指引，无法评估完整研究设计、专业领域或特定期刊要求。',
    directoryKicker: '官方目录',
    directoryTitle: '精选扩展声明',
    directoryLead: '提供教育指导与官方链接。',
    officialSource: '官方来源',
  },
};

export function GuidelineSelector() {
  const { locale } = useApp();
  const t = guideI18n[locale] || guideI18n['pt-BR'];
  const extensions = extensionsData[locale] || extensionsData['pt-BR'];

  const [stage, setStage] = useState<'protocol' | 'complete'>('complete');
  const [type, setType] = useState<'systematic' | 'scoping' | 'living' | 'network' | 'integrative'>('systematic');
  const [updated, setUpdated] = useState(false);
  const [other, setOther] = useState(false);
  const [searchDetail, setSearchDetail] = useState(true);

  const recommendations = useMemo(() => {
    const result: string[] = [];
    if (stage === 'protocol') result.push('PRISMA-P');
    else {
      if (type === 'systematic') result.push('PRISMA 2020');
      if (type === 'scoping') result.push('PRISMA-ScR');
      if (type === 'living') result.push('PRISMA-LSR', 'PRISMA 2020');
      if (type === 'network') result.push('PRISMA-NMA', 'PRISMA 2020');
      if (type === 'integrative') result.push('PRISMA 2020');
    }
    if (searchDetail) result.push('PRISMA-S');
    return [...new Set(result)];
  }, [stage, type, searchDetail]);

  const model = `${updated ? 'updated' : 'new'}-databases${other ? '-other' : ''}`;

  return (
    <main id="main-content" className="content-page guidelines-page">
      <header className="page-hero">
        <div>
          <p className="eyebrow">
            <span /> {t.eyebrow}
          </p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroLead}</p>
        </div>
        <Route size={72} strokeWidth={1} aria-hidden="true" />
      </header>

      <div className="guideline-layout">
        <form className="guideline-form">
          <fieldset>
            <legend>{t.q1}</legend>
            <label>
              <input type="radio" name="stage" checked={stage === 'protocol'} onChange={() => setStage('protocol')} /> {t.optProtocol}
            </label>
            <label>
              <input type="radio" name="stage" checked={stage === 'complete'} onChange={() => setStage('complete')} /> {t.optComplete}
            </label>
          </fieldset>

          <fieldset>
            <legend>{t.q2}</legend>
            <select value={type} onChange={(event) => setType(event.target.value as typeof type)}>
              <option value="systematic">{t.typeSystematic}</option>
              <option value="scoping">{t.typeScoping}</option>
              <option value="living">{t.typeLiving}</option>
              <option value="network">{t.typeNetwork}</option>
              <option value="integrative">{t.typeIntegrative}</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>{t.q3}</legend>
            <label>
              <input type="checkbox" checked={updated} onChange={(event) => setUpdated(event.target.checked)} /> {t.q3Check}
            </label>
          </fieldset>

          <fieldset>
            <legend>{t.q4}</legend>
            <label>
              <input type="checkbox" checked={other} onChange={(event) => setOther(event.target.checked)} /> {t.q4Check}
            </label>
          </fieldset>

          <fieldset>
            <legend>{t.q5}</legend>
            <label>
              <input type="checkbox" checked={searchDetail} onChange={(event) => setSearchDetail(event.target.checked)} /> {t.q5Check}
            </label>
          </fieldset>
        </form>

        <aside className="recommendation-panel" aria-live="polite">
          <p className="kicker">{t.recKicker}</p>
          <h2>{recommendations.join(' + ')}</h2>
          <p>
            {stage === 'protocol'
              ? t.recProtocolDesc
              : stage === 'complete' && type === 'integrative'
              ? t.recIntegrativeDesc
              : t.recGeneralDesc}
          </p>
          <ul>
            {recommendations.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          {stage === 'complete' && (
            <a className="primary-button" href={`/builder?model=${model}`}>
              {t.startRecommended} <ArrowRight size={16} />
            </a>
          )}
          <small>{t.limitNote}</small>
        </aside>
      </div>

      <section className="extension-directory">
        <header>
          <p className="kicker">{t.directoryKicker}</p>
          <h2>{t.directoryTitle}</h2>
          <p>{t.directoryLead}</p>
        </header>
        <div>
          {extensions.map((extension) => (
            <article key={extension.id}>
              <span>{extension.year}</span>
              <h3>{extension.id}</h3>
              <p>{extension.purpose}</p>
              <a href={extension.href} target="_blank" rel="noopener noreferrer">
                {t.officialSource} <ExternalLink size={13} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
