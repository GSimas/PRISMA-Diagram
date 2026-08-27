import { migrateProject, projectSchema } from '../domain/schema';
import type { PrismaProject } from '../domain/types';

export function safeFileName(input: string, extension: string): string {
  const base = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'prisma-lab';
  return `${base}.${extension.replace(/^\./, '')}`;
}

export function serializeProject(project: PrismaProject): string {
  return JSON.stringify(projectSchema.parse(project), null, 2);
}

export function restoreProject(text: string): PrismaProject {
  return migrateProject(JSON.parse(text));
}

export function downloadBlob(data: BlobPart, fileName: string, type: string): void {
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
