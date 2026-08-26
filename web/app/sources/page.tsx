import type { Metadata } from 'next';
import { InfoPage } from '@/src/components/InfoPage';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Fontes e referências', description: 'Fontes metodológicas, versões, licenças e proveniência das traduções do PRISMA Diagram.', alternates: { canonical: '/sources' } };

const sources = [
  ['PRISMA website', 'https://www.prisma-statement.org/', 'Definição e documentos principais'],
  ['PRISMA 2020', 'https://www.prisma-statement.org/prisma-2020', 'Statement, checklist e história'],
  ['Flow diagram', 'https://www.prisma-statement.org/prisma-2020-flow-diagram', 'Quatro templates oficiais e licença CC BY 4.0'],
  ['Checklist', 'https://www.prisma-statement.org/prisma-2020-checklist', 'Checklist de 27 itens e versão expandida'],
  ['Explanation & Elaboration', 'https://www.prisma-statement.org/prisma-2020-explanation-elaboration', 'Explicações e exemplares'],
  ['PRISMA-P', 'https://www.prisma-statement.org/protocols', 'Relato de protocolos'],
  ['Extensions', 'https://www.prisma-statement.org/extensions', 'Extensões oficiais e em desenvolvimento'],
  ['Translations', 'https://www.prisma-statement.org/translations', 'Traduções oficiais disponíveis'],
  ['PRISMA2020 R package', 'https://github.com/prisma-flowdiagram/PRISMA2020', 'Modelo de dados CSV, interatividade e referência de implementação'],
  ['Haddaway et al. 2022', 'https://doi.org/10.1002/cl2.1230', 'Pacote e aplicativo PRISMA2020'],
];

export default function SourcesPage() {
  return <InfoPage eyebrow="VERIFICADO EM 26 AGO. 2026" title="Fontes e referências" lead="A implementação adota PRISMA 2020 como versão principal e registra explicitamente fontes, licença e proveniência terminológica."><h2>Diretriz implementada</h2><p><strong>PRISMA 2020</strong>, publicada em 2021, incluindo os quatro modelos de fluxo para revisões novas ou atualizadas, com bases e registros apenas ou também outras fontes.</p><h2>Fontes primárias consultadas</h2><ol className="source-list">{sources.map(([name, href, use]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{name}</a><span>{use}</span></li>)}</ol><h2>Referências bibliográficas</h2><p>Page MJ, McKenzie JE, Bossuyt PM, et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. <em>BMJ</em>. 2021;372:n71. doi:10.1136/bmj.n71.</p><p>Page MJ, Moher D, Bossuyt PM, et al. PRISMA 2020 explanation and elaboration. <em>BMJ</em>. 2021;372:n160. doi:10.1136/bmj.n160.</p><p>Haddaway NR, Page MJ, Pritchard CC, McGuinness LA. PRISMA2020: An R package and Shiny app. <em>Campbell Systematic Reviews</em>. 2022;18:e1230. doi:10.1002/cl2.1230.</p><h2>Traduções</h2><p>A interface usa tradução própria da aplicação, salvo quando a terminologia pode ser alinhada a documentos oficiais listados no site PRISMA. Em 26 ago. 2026, havia materiais oficiais distintos para chinês simplificado, francês, italiano e português brasileiro, sem equivalência completa de todos os documentos em todos os seis idiomas.</p><h2>Licença</h2><p>Documentos e templates PRISMA 2020: Creative Commons Attribution 4.0. A ferramenta é independente e não sugere afiliação, endosso ou certificação pelo PRISMA Executive.</p></InfoPage>;
}
