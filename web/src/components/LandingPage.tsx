'use client';

import { ArrowRight, Database, FileDown, Languages, LockKeyhole, Network, ScanSearch, ShieldCheck } from 'lucide-react';
import { useApp } from '../app/AppProviders';
import type { Locale } from '../domain/types';

const landing: Record<Locale, { eyebrow: string; title: string; emphasis: string; lead: string; primary: string; secondary: string; privacy: string; section: string; sectionLead: string }> = {
  'pt-BR': { eyebrow: 'PRISMA 2020 · dados locais · seis idiomas', title: 'PRISMA', emphasis: 'Lab', lead: 'Construa, verifique e publique diagramas PRISMA 2020 com orientação metodológica, cálculos rastreáveis e controle total dos seus dados.', primary: 'Criar meu diagrama', secondary: 'Entender o PRISMA', privacy: 'Seus projetos permanecem neste navegador. Nenhum dado científico é enviado por padrão.', section: 'Uma ferramenta de relato, não um atalho metodológico.', sectionLead: 'Cada recurso preserva a distinção entre registros, relatos e estudos — sem corrigir dados científicos silenciosamente.' },
  en: { eyebrow: 'PRISMA 2020 · local data · six languages', title: 'PRISMA', emphasis: 'Lab', lead: 'Build, check and publish PRISMA 2020 diagrams with methodological guidance, traceable calculations and full control of your data.', primary: 'Create my diagram', secondary: 'Understand PRISMA', privacy: 'Projects stay in this browser. No scientific data is sent by default.', section: 'A reporting tool, not a methodological shortcut.', sectionLead: 'Every feature preserves the distinction between records, reports and studies—without silently correcting scientific data.' },
  it: { eyebrow: 'PRISMA 2020 · dati locali · sei lingue', title: 'PRISMA', emphasis: 'Lab', lead: 'Crea, verifica e pubblica diagrammi PRISMA 2020 con guida metodologica, calcoli tracciabili e pieno controllo dei dati.', primary: 'Crea il diagramma', secondary: 'Comprendere PRISMA', privacy: 'I progetti restano nel browser. Nessun dato scientifico viene inviato per impostazione predefinita.', section: 'Uno strumento di reporting, non una scorciatoia metodologica.', sectionLead: 'Ogni funzione distingue record, report e studi senza correggere silenziosamente i dati.' },
  fr: { eyebrow: 'PRISMA 2020 · données locales · six langues', title: 'PRISMA', emphasis: 'Lab', lead: 'Créez, vérifiez et publiez des diagrammes PRISMA 2020 avec des calculs traçables et le contrôle de vos données.', primary: 'Créer mon diagramme', secondary: 'Comprendre PRISMA', privacy: 'Les projets restent dans ce navigateur. Aucune donnée scientifique n’est envoyée par défaut.', section: 'Un outil de compte rendu, pas un raccourci méthodologique.', sectionLead: 'Chaque fonction distingue enregistrements, rapports et études sans corriger silencieusement les données.' },
  de: { eyebrow: 'PRISMA 2020 · lokale Daten · sechs Sprachen', title: 'PRISMA', emphasis: 'Lab', lead: 'Erstellen, prüfen und veröffentlichen Sie PRISMA-2020-Diagramme mit nachvollziehbaren Berechnungen und voller Datenkontrolle.', primary: 'Diagramm erstellen', secondary: 'PRISMA verstehen', privacy: 'Projekte bleiben in diesem Browser. Wissenschaftliche Daten werden standardmäßig nicht gesendet.', section: 'Ein Berichtswerkzeug, keine methodische Abkürzung.', sectionLead: 'Jede Funktion unterscheidet Datensätze, Berichte und Studien, ohne Daten stillschweigend zu korrigieren.' },
  'zh-CN': { eyebrow: 'PRISMA 2020 · 本地数据 · 六种语言', title: 'PRISMA', emphasis: 'Lab', lead: '借助方法提示、可追溯计算和完全本地的数据控制，创建、检查并发布 PRISMA 2020 流程图。', primary: '创建流程图', secondary: '了解 PRISMA', privacy: '项目保存在此浏览器中，默认不会发送任何科研数据。', section: '报告工具，而非方法学捷径。', sectionLead: '每项功能都区分记录、报告和研究，绝不静默修改科研数据。' },
};

const stages = [
  { label: 'Identificação', value: '2.481', note: 'registros encontrados' },
  { label: 'Triagem', value: '1.906', note: 'registros avaliados' },
  { label: 'Elegibilidade', value: '126', note: 'relatos avaliados' },
  { label: 'Inclusão', value: '34', note: 'estudos incluídos' },
];

export function LandingPage() {
  const { locale } = useApp();
  const text = landing[locale];
  return (
    <main id="main-content" className="landing-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span /> {text.eyebrow}</p><h1 id="hero-title">{text.title} <em>{text.emphasis}</em></h1><p className="hero-lead">{text.lead}</p><div className="hero-actions"><a className="primary-button" href="/builder">{text.primary} <ArrowRight size={17} /></a><a className="text-link" href="/learn">{text.secondary} ↘</a></div><p className="privacy-note"><LockKeyhole size={16} /> {text.privacy}</p></div>
        <div className="diagram-preview" aria-label="Exemplo fictício de fluxo PRISMA"><div className="preview-meta"><span>PRÉVIA DO FLUXO</span><span>EXEMPLO FICTÍCIO</span></div><div className="flow">{stages.map((stage, index) => <div className="flow-step" key={stage.label}><span className="stage-number">0{index + 1}</span><div className="flow-card"><small>{stage.label}</small><strong>{stage.value}</strong><span>{stage.note}</span></div>{index < stages.length - 1 && <span className="flow-line" />}</div>)}</div><div className="preview-status"><span className="status-dot" /> Estrutura compatível com o modelo selecionado</div></div>
      </section>
      <section className="home-intro"><p className="kicker">ASSISTÊNCIA AO RELATO</p><h2>{text.section}</h2><p>{text.sectionLead}</p></section>
      <section className="feature-grid">
        <article><Network /><span>01</span><h3>Quatro modelos oficiais</h3><p>Revisões novas ou atualizadas, com bases e registros ou também outras fontes.</p></article>
        <article><ShieldCheck /><span>02</span><h3>Validação explicável</h3><p>Cada alerta mostra o que ocorreu, por que importa e quais valores revisar.</p></article>
        <article><FileDown /><span>03</span><h3>Publicação científica</h3><p>PDF e SVG vetoriais, PNG, HTML interativo, dados, relatório e pacote ZIP.</p></article>
        <article><Languages /><span>04</span><h3>Seis idiomas</h3><p>Português, inglês, italiano, francês, alemão e chinês simplificado.</p></article>
        <article><ScanSearch /><span>05</span><h3>Checklist integrado</h3><p>Acompanhe os 27 itens, a localização no manuscrito e o progresso por seção.</p></article>
        <article><Database /><span>06</span><h3>Local-first</h3><p>IndexedDB, salvamento automático, backups portáteis e funcionamento sem login.</p></article>
      </section>
      <section className="independence-note"><ShieldCheck size={26} /><div><h2>Independente por definição.</h2><p>Baseado no PRISMA 2020, sem afiliação, certificação ou endosso do PRISMA Executive. As verificações avaliam consistência do diagrama, não a conformidade integral do manuscrito.</p></div></section>
    </main>
  );
}
