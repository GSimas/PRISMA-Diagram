import type { Metadata } from 'next';
import { GuidelineSelector } from '@/src/features/guidelines/GuidelineSelector';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Diretrizes e extensões',
  description: 'Assistente para identificar PRISMA 2020, PRISMA-P, PRISMA-ScR, PRISMA-S, PRISMA-LSR e outras extensões.',
  alternates: { canonical: '/guidelines' },
};

export default function GuidelinesPage() { return <GuidelineSelector />; }
