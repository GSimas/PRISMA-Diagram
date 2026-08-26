'use client';

import { useMemo } from 'react';
import type { CountKey, Locale, PrismaProject } from '../../domain/types';
import { describeFlow } from '../../domain/calculations';
import { getDiagramChrome, getDiagramConnections, getDiagramNodes } from './diagramModel';

export type DiagramStage = 'identification' | 'screening' | 'included';

interface Props {
  project: PrismaProject;
  locale: Locale;
  selected: CountKey;
  onSelect: (field: CountKey) => void;
  onSelectStage?: (stage: DiagramStage) => void;
  zoom?: number;
}

export function PrismaDiagram({ project, locale, selected, onSelect, onSelectStage, zoom = 1 }: Props) {
  const style = project.presentation.diagramStyle ?? 'classic';
  const nodes = useMemo(() => getDiagramNodes(project, locale, style), [project, locale, style]);
  const chrome = useMemo(() => getDiagramChrome(project, locale, style), [project, locale, style]);
  const connections = useMemo(() => getDiagramConnections(nodes, style), [nodes, style]);
  const lastNodeBottom = Math.max(...nodes.map((node) => node.y + node.height));

  return (
    <div className="diagram-scroller" tabIndex={0} aria-label="Área panorâmica do diagrama">
      <svg
        id="prisma-diagram-svg"
        className={`prisma-svg prisma-svg-${style}`}
        data-style={style}
        viewBox={`0 0 ${chrome.width} ${chrome.height}`}
        width={chrome.width * zoom}
        height={chrome.height * zoom}
        role="group"
        aria-labelledby="diagram-title diagram-description"
      >
        <title id="diagram-title">{project.title}</title>
        <desc id="diagram-description">{describeFlow(project)}</desc>
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" className="diagram-arrow-head" />
          </marker>
        </defs>
        {style === 'classic' && (
          <g className="classic-chrome">
            <g aria-hidden="true">
              <rect className="classic-source-header main-source" x="70" y="30" width="557" height="31" rx="15.5" />
              <text className="classic-source-label" x="348.5" y="50">{chrome.mainHeader}</text>
              {chrome.hasOtherSources && <>
                <rect className="classic-source-header other-source" x="662" y="30" width="558" height="31" rx="15.5" />
                <text className="classic-source-label" x="941" y="50">{chrome.otherHeader}</text>
              </>}
            </g>
            {([
              ['identification', chrome.identificationTop, chrome.screeningTop - chrome.identificationTop - 54, chrome.identification],
              ['screening', chrome.screeningTop, chrome.includedTop - chrome.screeningTop - 18, chrome.screening],
              ['included', chrome.includedTop, lastNodeBottom - chrome.includedTop + 15, chrome.included],
            ] as [DiagramStage, number, number, string][]).map(([stage, y, height, label]) => (
              <g
                key={stage}
                className="classic-stage-group"
                role="button"
                tabIndex={0}
                aria-label={`${label}. Ir para o formulário desta etapa.`}
                onClick={() => onSelectStage?.(stage)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectStage?.(stage);
                  }
                }}
              >
                <rect className="classic-stage-band" x="17" y={y} width="31" height={height} rx="11" />
                <text className="classic-stage-label" transform={`translate(36 ${y + height / 2}) rotate(-90)`}>{label}</text>
              </g>
            ))}
          </g>
        )}
        <g aria-hidden="true" className="diagram-connections">
          {connections.map((connection) => <path key={connection.id} d={connection.d} markerEnd="url(#arrowhead)" />)}
        </g>
        <g>
          {nodes.map((node) => (
            <g
              key={node.id}
              className={`diagram-node ${node.kind ?? ''} ${selected === node.field ? 'selected' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`${node.lines.join('. ')}. Selecionar para editar detalhes.`}
              onClick={() => onSelect(node.field)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(node.field);
                }
              }}
            >
              <rect x={node.x} y={node.y} width={node.width} height={node.height} rx={style === 'classic' ? 0 : 2} />
              {node.lines.map((line, index) => (
                <text
                  key={`${line}-${index}`}
                  x={style === 'classic' ? node.x + node.width / 2 : node.x + 18}
                  y={style === 'classic' ? node.y + node.height / 2 - ((node.lines.length - 1) * 15) / 2 + index * 15 + 4 : node.y + 24 + index * 20}
                  textAnchor={style === 'classic' ? 'middle' : undefined}
                  className={index === 0 ? 'node-heading' : 'node-line'}
                >
                  {line}
                </text>
              ))}
            </g>
          ))}
        </g>
        <text x={style === 'classic' ? 70 : 22} y={chrome.height - 16} className="diagram-credit">{chrome.credit}</text>
      </svg>
    </div>
  );
}
