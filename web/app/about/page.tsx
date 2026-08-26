import type { Metadata } from 'next';
import { InfoPage } from '@/src/components/InfoPage';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Sobre', description: 'Sobre o PRISMA Diagram, seus objetivos, público e independência.', alternates: { canonical: '/about' } };
const faq = [
  ['O PRISMA Diagram certifica uma revisão?', 'Não. A aplicação verifica a consistência do diagrama e auxilia o relato, mas não certifica o manuscrito nem garante aceitação editorial.'],
  ['Meus dados são enviados a um servidor?', 'Não por padrão. Projetos e exportações são processados localmente no navegador.'],
  ['Qual é a diferença entre estudo e relato?', 'Um estudo é a investigação única; um ou mais documentos — os relatos — podem descrever o mesmo estudo.'],
  ['Posso usar o diagrama em uma publicação?', 'Sim, respeitando a atribuição CC BY 4.0 dos templates PRISMA 2020 e as políticas da revista.'],
];
export default function AboutPage() { return <InfoPage eyebrow="PROJETO AUTORAL · CIÊNCIA ABERTA" title="Sobre o PRISMA Diagram" lead="Uma ferramenta independente para transformar contagens e decisões documentadas em relatos mais claros, rastreáveis e publicáveis."><h2>Propósito</h2><p>O PRISMA Diagram atende pesquisadores, estudantes, bibliotecários, orientadores, revisores e editores envolvidos em síntese de evidências. Ele combina educação, edição vetorial, validação numérica, checklist e exportação científica.</p><h2>Princípios</h2><ul><li>Dados locais e portáveis.</li><li>Regras determinísticas e explicáveis.</li><li>Sem correções silenciosas de dados científicos.</li><li>Acessibilidade e internacionalização desde o modelo de domínio.</li><li>Independência institucional explícita.</li></ul><h2>Perguntas frequentes</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</InfoPage>; }
