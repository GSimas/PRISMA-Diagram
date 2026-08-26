'use client';

import Dexie, { type Table } from 'dexie';
import type { PrismaProject } from '../domain/types';
import { migrateProject } from '../domain/schema';

class PrismaDiagramDatabase extends Dexie {
  projects!: Table<PrismaProject, string>;

  constructor() {
    super('prisma-diagram');
    this.version(1).stores({ projects: 'id, updatedAt, createdAt, status, model, title' });
    this.version(2).stores({ projects: 'id, updatedAt, createdAt, status, model, title, locale' });
  }
}

let database: PrismaDiagramDatabase | null = null;
const getDatabase = () => {
  if (typeof window === 'undefined') throw new Error('O banco local só está disponível no navegador.');
  database ??= new PrismaDiagramDatabase();
  return database;
};

export async function listProjects(): Promise<PrismaProject[]> {
  return (await getDatabase().projects.orderBy('updatedAt').reverse().toArray()).map(migrateProject);
}

export async function saveProject(project: PrismaProject): Promise<void> {
  await getDatabase().projects.put({ ...project, updatedAt: new Date().toISOString() });
}

export async function getProject(id: string): Promise<PrismaProject | undefined> {
  const project = await getDatabase().projects.get(id);
  return project ? migrateProject(project) : undefined;
}

export async function deleteProject(id: string): Promise<void> {
  await getDatabase().projects.delete(id);
}

export async function duplicateProject(project: PrismaProject): Promise<PrismaProject> {
  const now = new Date().toISOString();
  const copy = {
    ...structuredClone(project),
    id: crypto.randomUUID(),
    title: `${project.title} — cópia`,
    status: 'draft' as const,
    createdAt: now,
    updatedAt: now,
    history: [],
  };
  await getDatabase().projects.add(copy);
  return copy;
}
