'use client';

import { create } from 'zustand';
import type { CountKey, PrismaProject } from '../domain/types';
import { createProject } from '../domain/project';

interface ProjectStore {
  project: PrismaProject;
  past: PrismaProject[];
  future: PrismaProject[];
  setProject: (project: PrismaProject) => void;
  patchProject: (patch: Partial<PrismaProject>, action?: string) => void;
  updateCount: (key: CountKey, value: number | null) => void;
  updateProject: (project: PrismaProject, action?: string) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
}

const clone = (project: PrismaProject) => structuredClone(project);

export const useProjectStore = create<ProjectStore>((set) => ({
  project: createProject(),
  past: [],
  future: [],
  setProject: (project) => set({ project: clone(project), past: [], future: [] }),
  patchProject: (patch, action = 'Projeto atualizado') => set((state) => ({
    past: [...state.past.slice(-29), clone(state.project)],
    project: { ...state.project, ...patch, updatedAt: new Date().toISOString(), history: [...state.project.history.slice(-99), { id: crypto.randomUUID(), at: new Date().toISOString(), action }] },
    future: [],
  })),
  updateCount: (key, value) => set((state) => ({
    past: [...state.past.slice(-29), clone(state.project)],
    project: {
      ...state.project,
      counts: { ...state.project.counts, [key]: value },
      updatedAt: new Date().toISOString(),
      history: [...state.project.history.slice(-99), { id: crypto.randomUUID(), at: new Date().toISOString(), action: 'Contagem atualizada', field: key, previous: state.project.counts[key], next: value }],
    },
    future: [],
  })),
  updateProject: (project, action = 'Projeto atualizado') => set((state) => ({
    past: [...state.past.slice(-29), clone(state.project)],
    project: { ...clone(project), updatedAt: new Date().toISOString(), history: [...project.history.slice(-99), { id: crypto.randomUUID(), at: new Date().toISOString(), action }] },
    future: [],
  })),
  undo: () => set((state) => {
    const previous = state.past.at(-1);
    return previous ? { project: clone(previous), past: state.past.slice(0, -1), future: [clone(state.project), ...state.future].slice(0, 30) } : state;
  }),
  redo: () => set((state) => {
    const next = state.future[0];
    return next ? { project: clone(next), past: [...state.past, clone(state.project)].slice(-30), future: state.future.slice(1) } : state;
  }),
  reset: () => set({ project: createProject(), past: [], future: [] }),
}));
