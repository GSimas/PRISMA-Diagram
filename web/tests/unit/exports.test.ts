import { describe, expect, it } from 'vitest';
import { createProject } from '../../src/domain/project';
import { generateCsv, generateInteractiveHtml, generateReportHtml, generateSvg, generateXlsx } from '../../src/features/export/exporters';

describe('exportadores', () => {
  const project = createProject({ title: 'Teste <seguro>', model: 'updated-databases-other', example: true });

  it('gera SVG acessível e escapa conteúdo', () => {
    const svg = generateSvg(project, 'pt-BR');
    expect(svg).toContain('role="img"');
    expect(svg).toContain('Teste &lt;seguro&gt;');
    expect(svg).not.toContain('<title id="title">Teste <seguro>');
    expect(svg).toContain('Identificação de novos estudos em bases de dados e registros');
    expect(svg).toContain('#ffbf24');
  });

  it('gera CSV tabular com BOM', () => {
    const csv = generateCsv(project);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
    expect(csv).toContain('"field","value","origin","calculation"');
  });

  it('gera HTML interativo e relatório autocontidos', () => {
    expect(generateInteractiveHtml(project, 'en')).toContain("querySelectorAll('g[role=link]')");
    expect(generateReportHtml(project, 'pt-BR')).toContain('Checklist PRISMA 2020');
  });

  it('gera pasta XLSX com fluxo, exclusões e checklist', async () => {
    const blob = await generateXlsx(project);
    expect(blob.type).toContain('spreadsheetml');
    expect(blob.size).toBeGreaterThan(1000);
  });
});
