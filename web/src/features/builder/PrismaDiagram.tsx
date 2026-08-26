'use client';

import { useMemo } from 'react';
import type { CountKey, Locale, PrismaProject } from '../../domain/types';
import { describeFlow } from '../../domain/calculations';
import { getDiagramNodes } from './diagramModel';

interface Props {
  project: PrismaProject;
  locale: Locale;
  selected: CountKey;
  onSelect: (field: CountKey) => void;
  zoom?: number;
}

export function PrismaDiagram({ project, locale, selected, onSelect, zoom = 1 }: Props) {
  const nodes = useMemo(() => getDiagramNodes(project, locale), [project, locale]);
  const main = nodes.filter((node) => node.x < 500);
  const sides = nodes.filter((node) => node.x >= 500);
  const height = Math.max(...nodes.map((node) => node.y + node.height), 700) + 50;

  return (
    <div className="diagram-scroller" tabIndex={0} aria-label="Área panorâmica do diagrama">
      <svg
        id="prisma-diagram-svg"
        className="prisma-svg"
        viewBox={`0 0 880 ${height}`}
        width={880 * zoom}
        height={height * zoom}
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
        <g aria-hidden="true" className="diagram-connections">
          {main.slice(0, -1).map((node, index) => {
            const next = main[index + 1];
            return <line key={node.id} x1={node.x + node.width / 2} y1={node.y + node.height} x2={next.x + next.width / 2} y2={next.y - 7} markerEnd="url(#arrowhead)" />;
          })}
          {sides.map((node) => {
            const source = main.find((candidate) => candidate.y === node.y);
            if (node.id === 'identified-other') {
              const target = main.find((candidate) => candidate.id === 'removed');
              return target ? <path key={node.id} d={`M ${node.x + node.width / 2} ${node.y + node.height} V ${target.y - 22} H ${target.x + target.width / 2} V ${target.y - 7}`} markerEnd="url(#arrowhead)" /> : null;
            }
            return source ? <line key={node.id} x1={source.x + source.width} y1={source.y + source.height / 2} x2={node.x - 7} y2={node.y + node.height / 2} markerEnd="url(#arrowhead)" /> : null;
          })}
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
              <rect x={node.x} y={node.y} width={node.width} height={node.height} rx="2" />
              {node.lines.map((line, index) => (
                <text key={line} x={node.x + 18} y={node.y + 24 + index * 20} className={index === 0 ? 'node-heading' : 'node-line'}>
                  {line}
                </text>
              ))}
            </g>
          ))}
        </g>
        <text x="22" y={height - 16} className="diagram-credit">Baseado no PRISMA 2020 · CC BY 4.0 · ferramenta independente</text>
      </svg>
    </div>
  );
}
