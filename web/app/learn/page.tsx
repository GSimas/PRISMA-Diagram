import type { Metadata } from 'next';
import { LearnHub } from '@/src/features/learn/LearnHub';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Aprender PRISMA',
  description: 'Central educacional multilíngue sobre PRISMA 2020, diagrama de fluxo, unidades de contagem e extensões.',
  alternates: { canonical: '/learn' },
};

export default function LearnPage() { return <LearnHub />; }
