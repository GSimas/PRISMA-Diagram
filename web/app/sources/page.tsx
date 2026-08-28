'use client';

import { useApp } from '@/src/app/AppProviders';
import { InfoPage } from '@/src/components/InfoPage';
import type { Locale } from '@/src/domain/types';

const sources = [
  ['PRISMA website', 'https://www.prisma-statement.org/'],
  ['PRISMA 2020', 'https://www.prisma-statement.org/prisma-2020'],
  ['Flow diagram', 'https://www.prisma-statement.org/prisma-2020-flow-diagram'],
  ['Checklist', 'https://www.prisma-statement.org/prisma-2020-checklist'],
  ['Explanation & Elaboration', 'https://www.prisma-statement.org/prisma-2020-explanation-elaboration'],
  ['PRISMA-P', 'https://www.prisma-statement.org/protocols'],
  ['Extensions', 'https://www.prisma-statement.org/extensions'],
  ['Translations', 'https://www.prisma-statement.org/translations'],
  ['PRISMA2020 R package', 'https://github.com/prisma-flowdiagram/PRISMA2020'],
  ['Haddaway et al. 2022', 'https://doi.org/10.1002/cl2.1230'],
];

const content: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    lead: string;
    guidelineTitle: string;
    guidelineBody: string;
    sourcesTitle: string;
    refsTitle: string;
    transTitle: string;
    transBody: string;
    licenseTitle: string;
    licenseBody: string;
  }
> = {
  'pt-BR': {
    eyebrow: 'VERIFICADO EM 26 AGO. 2026',
    title: 'Fontes e referências',
    lead: 'A implementação adota PRISMA 2020 como versão principal e registra explicitamente fontes, licença e proveniência terminológica.',
    guidelineTitle: 'Diretriz implementada',
    guidelineBody: 'PRISMA 2020, publicada em 2021, incluindo os quatro modelos de fluxo para revisões novas ou atualizadas, com bases e registros apenas ou também outras fontes.',
    sourcesTitle: 'Fontes primárias consultadas',
    refsTitle: 'Referências bibliográficas',
    transTitle: 'Traduções',
    transBody: 'A interface usa tradução própria da aplicação alinhada aos termos dos documentos oficiais do PRISMA Statement.',
    licenseTitle: 'Licença',
    licenseBody: 'Documentos e templates PRISMA 2020: Creative Commons Attribution 4.0. A ferramenta é independente do PRISMA Executive.',
  },
  en: {
    eyebrow: 'VERIFIED AUGUST 2026',
    title: 'Sources & References',
    lead: 'PRISMA Lab adopts PRISMA 2020 as its primary foundation, documenting sources, licenses, and terminological provenance.',
    guidelineTitle: 'Implemented Guideline',
    guidelineBody: 'PRISMA 2020, published in 2021, featuring all four flow diagram models for new or updated reviews, via databases & registers or also other methods.',
    sourcesTitle: 'Primary Consulted Sources',
    refsTitle: 'Bibliographic References',
    transTitle: 'Translations & Provenance',
    transBody: 'Interface translations align closely with official PRISMA terminology and published multilingual resources.',
    licenseTitle: 'License & Attribution',
    licenseBody: 'PRISMA 2020 documents and templates are distributed under Creative Commons Attribution 4.0. PRISMA Lab is independent of the PRISMA Executive.',
  },
  it: {
    eyebrow: 'VERIFICATO AD AGOSTO 2026',
    title: 'Fonti e riferimenti',
    lead: 'L’implementazione adotta PRISMA 2020 come versione principale.',
    guidelineTitle: 'Linea guida implementata',
    guidelineBody: 'PRISMA 2020, con i quattro modelli di flusso.',
    sourcesTitle: 'Fonti primarie consultate',
    refsTitle: 'Riferimenti bibliografici',
    transTitle: 'Traduzioni',
    transBody: 'La traduzione dell’interfaccia è allineata alla terminologia ufficiale.',
    licenseTitle: 'Licenza',
    licenseBody: 'Documenti e template PRISMA 2020: Creative Commons Attribution 4.0.',
  },
  fr: {
    eyebrow: 'VÉRIFIÉ EN AOÛT 2026',
    title: 'Sources et références',
    lead: 'L’application adopte PRISMA 2020 comme référence principale.',
    guidelineTitle: 'Directive implémentée',
    guidelineBody: 'PRISMA 2020 avec les quatre modèles de flux officiels.',
    sourcesTitle: 'Sources primaires consultées',
    refsTitle: 'Références bibliographiques',
    transTitle: 'Traductions',
    transBody: 'Les traductions respectent la terminologie officielle.',
    licenseTitle: 'Licence',
    licenseBody: 'Modèles et documents PRISMA 2020 : Creative Commons Attribution 4.0.',
  },
  de: {
    eyebrow: 'GEPRÜFT IM AUGUST 2026',
    title: 'Quellen und Referenzen',
    lead: 'Die Anwendung basiert auf PRISMA 2020 als Hauptversion.',
    guidelineTitle: 'Implementierte Leitlinie',
    guidelineBody: 'PRISMA 2020 mit allen vier Flussdiagramm-Modellen.',
    sourcesTitle: 'Konsultierte Primärquellen',
    refsTitle: 'Bibliografische Referenzen',
    transTitle: 'Übersetzungen',
    transBody: 'Die Benutzeroberfläche orientiert sich an der offiziellen Terminologie.',
    licenseTitle: 'Lizenz',
    licenseBody: 'PRISMA-2020-Vorlagen stehen unter Creative Commons Attribution 4.0.',
  },
  'zh-CN': {
    eyebrow: '2026年8月核验',
    title: '来源与参考文献',
    lead: '本系统以 PRISMA 2020 作为核心规范依据，详实记录数据源、授权协议及多语言术语溯源。',
    guidelineTitle: '实施的报告指南',
    guidelineBody: 'PRISMA 2020（2021年发布），完整涵盖新综述与更新综述、仅数据库/注册库或包含其他来源的全部四种官方流程图模型。',
    sourcesTitle: '查阅的官方一手来源',
    refsTitle: '主要参考文献',
    transTitle: '多语言术语校准',
    transBody: '界面术语已对齐 PRISMA 官方多语言文献及学术界通用译名。',
    licenseTitle: '许可证与署名',
    licenseBody: 'PRISMA 2020 官方文档及流程图模板遵循 Creative Commons Attribution 4.0（CC BY 4.0）署名协议。本工具保持学术独立性。',
  },
};

export default function SourcesPage() {
  const { locale } = useApp();
  const text = content[locale] || content['pt-BR'];

  return (
    <InfoPage eyebrow={text.eyebrow} title={text.title} lead={text.lead}>
      <h2>{text.guidelineTitle}</h2>
      <p>{text.guidelineBody}</p>

      <h2>{text.sourcesTitle}</h2>
      <ol className="source-list">
        {sources.map(([name, href]) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </li>
        ))}
      </ol>

      <h2>{text.refsTitle}</h2>
      <p>
        Page MJ, McKenzie JE, Bossuyt PM, et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. <em>BMJ</em>. 2021;372:n71. doi:10.1136/bmj.n71.
      </p>
      <p>
        Page MJ, Moher D, Bossuyt PM, et al. PRISMA 2020 explanation and elaboration. <em>BMJ</em>. 2021;372:n160. doi:10.1136/bmj.n160.
      </p>
      <p>
        Haddaway NR, Page MJ, Pritchard CC, McGuinness LA. PRISMA2020: An R package and Shiny app. <em>Campbell Systematic Reviews</em>. 2022;18:e1230. doi:10.1002/cl2.1230.
      </p>

      <h2>{text.transTitle}</h2>
      <p>{text.transBody}</p>

      <h2>{text.licenseTitle}</h2>
      <p>{text.licenseBody}</p>
    </InfoPage>
  );
}
