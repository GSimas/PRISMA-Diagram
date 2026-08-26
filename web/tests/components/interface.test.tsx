import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '../../src/app/AppProviders';
import { GlobalHeader } from '../../src/components/GlobalHeader';
import { createProject } from '../../src/domain/project';
import { PrismaDiagram } from '../../src/features/builder/PrismaDiagram';
import { ExportPanel } from '../../src/features/export/ExportPanel';

describe('componentes essenciais', () => {
  it('troca idioma, tema e alto contraste com persistência', async () => {
    localStorage.clear();
    render(<AppProviders><GlobalHeader /></AppProviders>);
    await waitFor(() => expect(screen.getByLabelText('Idioma')).toBeEnabled());
    fireEvent.change(screen.getByLabelText('Idioma'), { target: { value: 'en' } });
    await waitFor(() => expect(document.documentElement.lang).toBe('en'));
    fireEvent.change(screen.getByLabelText('Theme'), { target: { value: 'dark' } });
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('dark'));
    fireEvent.click(screen.getByLabelText('Accessibility'));
    fireEvent.click(screen.getByLabelText('High contrast'));
    expect(document.documentElement.dataset.contrast).toBe('high');
    expect(localStorage.getItem('prisma-locale')).toBe('en');
  });

  it('oferece diagrama semântico operável por teclado', () => {
    const project = createProject({ example: true });
    let selected = '';
    render(<PrismaDiagram project={project} locale="pt-BR" selected="databases" onSelect={(field) => { selected = field; }} />);
    const nodes = screen.getAllByRole('button', { name: /Selecionar para editar detalhes/ });
    expect(screen.getByRole('group', { name: new RegExp(project.title) })).toBeInTheDocument();
    expect(document.querySelector('.prisma-svg')).toHaveAttribute('data-style', 'classic');
    fireEvent.keyDown(nodes[0], { key: 'Enter' });
    expect(selected).not.toBe('');
  });

  it('renderiza a alternativa editorial moderna quando selecionada', () => {
    const project = createProject({ example: true });
    project.presentation.diagramStyle = 'modern';
    render(<PrismaDiagram project={project} locale="pt-BR" selected="databases" onSelect={() => undefined} />);
    expect(document.querySelector('.prisma-svg')).toHaveAttribute('data-style', 'modern');
    expect(document.querySelector('.classic-chrome')).not.toBeInTheDocument();
  });

  it('expõe todos os formatos de exportação', () => {
    render(<ExportPanel project={createProject({ example: true })} locale="pt-BR" />);
    ['PDF vetorial', 'SVG', 'PNG 2×', 'HTML interativo', 'CSV', 'XLSX', 'Backup JSON', 'Relatório HTML', 'Pacote ZIP'].forEach((name) => {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    });
  });
});
