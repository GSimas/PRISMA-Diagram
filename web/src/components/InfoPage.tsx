import type { ReactNode } from 'react';

export function InfoPage({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: ReactNode }) {
  return <main id="main-content" className="content-page info-page"><header className="page-hero compact"><div><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}</h1><p>{lead}</p></div></header><article className="prose-page">{children}</article></main>;
}
