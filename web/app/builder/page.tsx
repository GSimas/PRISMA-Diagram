import type { Metadata } from 'next';
import { BuilderWorkspace } from '@/src/features/builder/BuilderWorkspace';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Criar diagrama',
  description: 'Construtor local de diagramas PRISMA 2020 com cálculo rastreável, validação e exportação científica.',
  alternates: { canonical: '/builder' },
};

export default function BuilderPage() {
  return <BuilderWorkspace />;
}
