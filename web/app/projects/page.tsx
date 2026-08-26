import type { Metadata } from 'next';
import { ProjectsDashboard } from '@/src/features/projects/ProjectsDashboard';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Meus projetos',
  description: 'Gerencie localmente seus projetos de diagramas PRISMA 2020, backups e restaurações.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return <ProjectsDashboard />;
}
