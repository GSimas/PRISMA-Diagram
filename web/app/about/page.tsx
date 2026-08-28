'use client';

import { useApp } from '@/src/app/AppProviders';
import { InfoPage } from '@/src/components/InfoPage';
import type { Locale } from '@/src/domain/types';

const content: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    lead: string;
    purposeTitle: string;
    purposeBody: string;
    principlesTitle: string;
    principles: string[];
    faqTitle: string;
    faq: [string, string][];
  }
> = {
  'pt-BR': {
    eyebrow: 'PROJETO AUTORAL · CIÊNCIA ABERTA',
    title: 'Sobre o PRISMA Lab',
    lead: 'Uma ferramenta independente para transformar contagens e decisões documentadas em relatos mais claros, rastreáveis e publicáveis.',
    purposeTitle: 'Propósito',
    purposeBody: 'O PRISMA Lab atende pesquisadores, estudantes, bibliotecários, orientadores, revisores e editores envolvidos em síntese de evidências. Ele combina educação, edição vetorial, validação numérica, checklist e exportação científica.',
    principlesTitle: 'Princípios',
    principles: [
      'Dados locais e portáteis.',
      'Regras determinísticas e explicáveis.',
      'Sem correções silenciosas de dados científicos.',
      'Acessibilidade e internacionalização desde o modelo de domínio.',
      'Independência institucional explícita.',
    ],
    faqTitle: 'Perguntas frequentes',
    faq: [
      ['O PRISMA Lab certifica uma revisão?', 'Não. A aplicação verifica a consistência do diagrama e auxilia o relato, mas não certifica o manuscrito nem garante aceitação editorial.'],
      ['Meus dados são enviados a um servidor?', 'Não por padrão. Projetos e exportações são processados localmente no navegador.'],
      ['Qual é a diferença entre estudo e relato?', 'Um estudo é a investigação única; um ou mais documentos — os relatos — podem descrever o mesmo estudo.'],
      ['Posso usar o diagrama em uma publicação?', 'Sim, respeitando a atribuição CC BY 4.0 dos templates PRISMA 2020 e as políticas da revista.'],
    ],
  },
  en: {
    eyebrow: 'AUTHORIAL PROJECT · OPEN SCIENCE',
    title: 'About PRISMA Lab',
    lead: 'An independent tool to transform counts and documented decisions into clearer, traceable and publishable reporting.',
    purposeTitle: 'Purpose',
    purposeBody: 'PRISMA Lab serves researchers, students, librarians, advisors, peer reviewers and editors involved in evidence synthesis. It combines education, vector diagram editing, numerical validation, checklist tracking and scientific export.',
    principlesTitle: 'Principles',
    principles: [
      'Local-first and portable data.',
      'Deterministic and explainable rule engine.',
      'No silent corrections of scientific data.',
      'Accessibility and internationalization built in from domain model.',
      'Explicit institutional independence.',
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      ['Does PRISMA Lab certify a review?', 'No. The application verifies diagram consistency and assists reporting, but does not certify the manuscript or guarantee editorial acceptance.'],
      ['Is my data sent to a server?', 'No by default. Projects and exports are processed locally in your browser.'],
      ['What is the difference between a study and a report?', 'A study is the unique investigation; one or more documents (reports) may describe the same study.'],
      ['Can I use the diagram in a publication?', 'Yes, respecting CC BY 4.0 attribution of PRISMA 2020 templates and journal editorial policies.'],
    ],
  },
  it: {
    eyebrow: 'PROGETTO AUTORIALE · SCIENZA APERTA',
    title: 'Informazioni su PRISMA Lab',
    lead: 'Uno strumento indipendente per trasformare conteggi e decisioni documentate in report più chiari, tracciabili e pubblicabili.',
    purposeTitle: 'Scopo',
    purposeBody: 'PRISMA Lab serve ricercatori, studenti, bibliotecari, revisori ed editori coinvolti nella sintesi delle evidenze. Combina istruzione, editing vettoriale, validazione numerica, checklist ed esportazione scientifica.',
    principlesTitle: 'Principi',
    principles: [
      'Dati locali e portatili.',
      'Regole deterministiche e spiegabili.',
      'Nessuna correzione silenziosa dei dati scientifici.',
      'Accessibilità e internazionalizzazione native.',
      'Indipendenza istituzionale esplicita.',
    ],
    faqTitle: 'Domande frequenti',
    faq: [
      ['PRISMA Lab certifica una revisione?', 'No. L’applicazione verifica la coerenza del diagramma ma non certifica il manoscritto.'],
      ['I miei dati vengono inviati a un server?', 'No. Progetti ed esportazioni sono elaborati localmente nel browser.'],
      ['Qual è la differenza tra studio e report?', 'Uno studio è l’indagine unica; più documenti (report) possono descrivere lo stesso studio.'],
      ['Posso usare il diagramma in una pubblicazione?', 'Sì, rispettando l’attribuzione CC BY 4.0 dei template PRISMA 2020.'],
    ],
  },
  fr: {
    eyebrow: 'PROJET D’AUTEUR · SCIENCE OUVERTE',
    title: 'À propos de PRISMA Lab',
    lead: 'Un outil indépendant pour transformer données et décisions documentées en comptes rendus plus clairs, traçables et publiables.',
    purposeTitle: 'Objectif',
    purposeBody: 'PRISMA Lab s’adresse aux chercheurs, étudiants, bibliothécaires, évaluateurs et éditeurs impliqués dans la synthèse des données probantes.',
    principlesTitle: 'Principes',
    principles: [
      'Données locales et portables.',
      'Règles déterministes et explicables.',
      'Aucune correction silencieuse de données scientifiques.',
      'Accessibilité et internationalisation dès la conception.',
      'Indépendance institutionnelle explicite.',
    ],
    faqTitle: 'Foire aux questions',
    faq: [
      ['PRISMA Lab certifie-t-il une revue ?', 'Non. L’application vérifie la cohérence du diagramme et aide à la rédaction, mais ne certifie pas le manuscrit.'],
      ['Mes données sont-elles envoyées à un serveur ?', 'Non par défaut. Projets et exports sont traités localement dans le navigateur.'],
      ['Quelle est la différence entre une étude et un rapport ?', 'Une étude est l’investigation unique ; plusieurs documents (rapports) peuvent décrire la même étude.'],
      ['Puis-je utiliser le diagramme dans une publication ?', 'Oui, conformément à la licence CC BY 4.0 des modèles PRISMA 2020.'],
    ],
  },
  de: {
    eyebrow: 'AUTORENPROJEKT · OFFENE WISSENSCHAFT',
    title: 'Über PRISMA Lab',
    lead: 'Ein unabhängiges Werkzeug zur Erstellung transparenter, nachvollziehbarer und veröffentlichungsreifer Berichte.',
    purposeTitle: 'Zweck',
    purposeBody: 'PRISMA Lab richtet sich an Forschende, Studierende, Bibliothekar:innen, Gutachter:innen und Herausgeber:innen in der Evidenzsynthese.',
    principlesTitle: 'Prinzipien',
    principles: [
      'Lokale und portable Daten.',
      'Deterministisches und erklärbares Regelwerk.',
      'Keine stillschweigenden Datenkorrekturen.',
      'Barrierefreiheit und Internationalisierung.',
      'Explizite institutionelle Unabhängigkeit.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faq: [
      ['Zertifiziert PRISMA Lab ein Review?', 'Nein. Das Werkzeug prüft Diagrammkonsistenz, zertifiziert jedoch kein Manuskript.'],
      ['Werden meine Daten an einen Server gesendet?', 'Nein. Projekte und Exporte werden lokal im Browser verarbeitet.'],
      ['Was ist der Unterschied zwischen Studie und Bericht?', 'Eine Studie ist die eindeutige Untersuchung; mehrere Berichte können dieselbe Studie beschreiben.'],
      ['Darf das Diagramm veröffentlicht werden?', 'Ja, unter Einhaltung der CC BY 4.0-Lizenz der PRISMA-2020-Vorlagen.'],
    ],
  },
  'zh-CN': {
    eyebrow: '原创项目 · 开放科学',
    title: '关于 PRISMA Lab',
    lead: '一款将文献计数和筛选决定转化为清晰、可追溯且易于发表之报告的独立学术工具。',
    purposeTitle: '宗旨',
    purposeBody: 'PRISMA Lab 致力于服务从事证据综合的研究人员、学生、图书情报专家、导师、审稿专家及期刊编辑。系统集方法学教育、矢量流程图编辑、数值验证、核对清单追踪与学术导出于一体。',
    principlesTitle: '核心原则',
    principles: [
      '本地优先与便携数据架构。',
      '确定性且具可解释性的规则引擎。',
      '绝不静默篡改或修正科学数据。',
      '自领域模型起即融入无障碍与国际化支持。',
      '明确的学术与机构独立性。',
    ],
    faqTitle: '常见问题解答',
    faq: [
      ['PRISMA Lab 是否对系统综述进行认证？', '不对。本工具用于核对流程图逻辑一致性并辅助规范化报告，不代表对稿件的认证，亦不保证期刊录用。'],
      ['我的数据是否会上传至服务器？', '默认不会。所有项目与导出文件均在您的本地浏览器中完成处理。'],
      ['研究与报告有何区别？', '研究是唯一的科学调查；一份或多份文献/出版物（即报告）可以共同描述同一项研究。'],
      ['我可以在学术发表中使用生成的流程图吗？', '可以，请遵守 PRISMA 2020 模板的 CC BY 4.0 署名协议及所在期刊的发表政策。'],
    ],
  },
};

export default function AboutPage() {
  const { locale } = useApp();
  const text = content[locale] || content['pt-BR'];

  return (
    <InfoPage eyebrow={text.eyebrow} title={text.title} lead={text.lead}>
      <h2>{text.purposeTitle}</h2>
      <p>{text.purposeBody}</p>

      <h2>{text.principlesTitle}</h2>
      <ul>
        {text.principles.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{text.faqTitle}</h2>
      {text.faq.map(([question, answer]) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </InfoPage>
  );
}
