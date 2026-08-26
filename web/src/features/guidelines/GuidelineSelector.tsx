'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, Route } from 'lucide-react';

const extensions = [
  { id: 'PRISMA-P', purpose: 'Protocolos de revisões sistemáticas', year: '2015', href: 'https://www.prisma-statement.org/protocols' },
  { id: 'PRISMA-ScR', purpose: 'Revisões de escopo', year: '2018', href: 'https://www.prisma-statement.org/scoping' },
  { id: 'PRISMA-S', purpose: 'Relato de buscas bibliográficas', year: '2021', href: 'https://www.prisma-statement.org/prisma-search' },
  { id: 'PRISMA-LSR', purpose: 'Revisões sistemáticas vivas', year: '2024', href: 'https://www.prisma-statement.org/living-systematic-reviews' },
  { id: 'PRISMA-NMA', purpose: 'Metanálises em rede', year: '2015', href: 'https://www.prisma-statement.org/network-meta-analyses' },
  { id: 'PRISMA-DTA', purpose: 'Acurácia de testes diagnósticos', year: '2018', href: 'https://www.prisma-statement.org/dta' },
  { id: 'PRISMA-IPD', purpose: 'Dados individuais de participantes', year: '2015', href: 'https://www.prisma-statement.org/individual-participant-data' },
  { id: 'PRISMA-Harms', purpose: 'Relato de danos', year: '2016', href: 'https://www.prisma-statement.org/harms' },
];

export function GuidelineSelector() {
  const [stage, setStage] = useState<'protocol' | 'complete'>('complete');
  const [type, setType] = useState<'systematic' | 'scoping' | 'living' | 'network'>('systematic');
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
    }
    if (searchDetail) result.push('PRISMA-S');
    return [...new Set(result)];
  }, [stage, type, searchDetail]);
  const model = `${updated ? 'updated' : 'new'}-databases${other ? '-other' : ''}`;

  return (
    <main id="main-content" className="content-page guidelines-page">
      <header className="page-hero"><div><p className="eyebrow"><span /> ASSISTENTE DE ORIENTAÇÃO</p><h1>Qual diretriz consultar?</h1><p>Responda a cinco perguntas para receber uma orientação inicial e links oficiais. O resultado não substitui aconselhamento metodológico.</p></div><Route size={72} strokeWidth={1} aria-hidden="true" /></header>
      <div className="guideline-layout">
        <form className="guideline-form">
          <fieldset><legend>1. Você está preparando um protocolo ou relatando uma revisão concluída?</legend><label><input type="radio" name="stage" checked={stage === 'protocol'} onChange={() => setStage('protocol')} /> Protocolo</label><label><input type="radio" name="stage" checked={stage === 'complete'} onChange={() => setStage('complete')} /> Revisão concluída</label></fieldset>
          <fieldset><legend>2. Qual é o tipo principal?</legend><select value={type} onChange={(event) => setType(event.target.value as typeof type)}><option value="systematic">Revisão sistemática</option><option value="scoping">Revisão de escopo</option><option value="living">Revisão sistemática viva</option><option value="network">Metanálise em rede</option></select></fieldset>
          <fieldset><legend>3. A revisão atualiza uma versão anterior?</legend><label><input type="checkbox" checked={updated} onChange={(event) => setUpdated(event.target.checked)} /> Sim, é uma revisão atualizada</label></fieldset>
          <fieldset><legend>4. Foram usadas outras fontes além de bases e registros?</legend><label><input type="checkbox" checked={other} onChange={(event) => setOther(event.target.checked)} /> Sites, organizações, citações ou outras fontes</label></fieldset>
          <fieldset><legend>5. É necessário detalhar o relato das buscas?</legend><label><input type="checkbox" checked={searchDetail} onChange={(event) => setSearchDetail(event.target.checked)} /> Consultar também PRISMA-S</label></fieldset>
        </form>
        <aside className="recommendation-panel" aria-live="polite"><p className="kicker">ORIENTAÇÃO INICIAL</p><h2>{recommendations.join(' + ')}</h2><p>{stage === 'protocol' ? 'PRISMA-P é específico para o desenvolvimento e relato de protocolos. Não é sinônimo de PRISMA 2020.' : 'A diretriz principal ou extensão deve ser lida junto com seus documentos explicativos oficiais.'}</p><ul>{recommendations.map((name) => <li key={name}>{name}</li>)}</ul>{stage === 'complete' && <a className="primary-button" href={`/builder?model=${model}`}>Iniciar modelo recomendado <ArrowRight size={16} /></a>}<small>Limite: este assistente usa respostas gerais e não avalia o desenho completo, a área temática ou exigências editoriais.</small></aside>
      </div>
      <section className="extension-directory"><header><p className="kicker">DIRETÓRIO OFICIAL</p><h2>Extensões selecionadas</h2><p>Estas páginas apresentam orientação educacional e links oficiais; o construtor não simula suporte integral a extensões ainda não implementadas.</p></header><div>{extensions.map((extension) => <article key={extension.id}><span>{extension.year}</span><h3>{extension.id}</h3><p>{extension.purpose}</p><a href={extension.href} target="_blank" rel="noopener noreferrer">Fonte oficial <ExternalLink size={13} /></a></article>)}</div></section>
    </main>
  );
}
