export const SCHEMA_VERSION = 2 as const;

export type Locale = 'pt-BR' | 'en' | 'it' | 'fr' | 'de' | 'zh-CN';
export type ThemePreference = 'system' | 'light' | 'dark';
export type ReviewKind = 'new' | 'updated';
export type DiagramModel =
  | 'new-databases'
  | 'new-databases-other'
  | 'updated-databases'
  | 'updated-databases-other';
export type ProjectStatus = 'draft' | 'review' | 'complete';
export type ValidationStatus = 'valid' | 'attention' | 'inconsistency' | 'missing' | 'not-applicable';
export type ChecklistStatus = 'not-started' | 'in-progress' | 'complete' | 'not-applicable';

export const countKeys = [
  'previousStudies', 'previousReports', 'databases', 'registers', 'websites',
  'organisations', 'citationSearching', 'otherSources', 'duplicates',
  'automationExcluded', 'removedOther', 'screened', 'recordsExcluded',
  'reportsSought', 'reportsNotRetrieved', 'reportsAssessed', 'reportsExcluded',
  'otherReportsSought', 'otherReportsNotRetrieved', 'otherReportsAssessed', 'otherReportsExcluded',
  'newStudies', 'newReports', 'totalStudies', 'totalReports',
] as const;

export type CountKey = (typeof countKeys)[number];
export type Counts = Record<CountKey, number | null>;

export interface SourceItem {
  id: string;
  type: 'database' | 'register' | 'website' | 'organisation' | 'citation' | 'other';
  name: string;
  count: number;
}

export interface ExclusionReason {
  id: string;
  label: string;
  count: number;
}

export interface ManualOverride {
  value: number;
  justification: string;
  updatedAt: string;
}

export interface NodeProvenance {
  note: string;
  responsible: string;
  date: string;
  url: string;
  repositoryRef: string;
}

export interface ChecklistEntry {
  item: number;
  status: ChecklistStatus;
  note: string;
  location: string;
  page: string;
  section: string;
  url: string;
  reviewedAt: string;
}

export interface HistoryEntry {
  id: string;
  at: string;
  action: string;
  field?: CountKey;
  previous?: number | null;
  next?: number | null;
}

export interface PresentationPreferences {
  mode: 'prisma' | 'presentation';
  diagramStyle: 'classic' | 'modern';
  density: 'compact' | 'comfortable';
  orientation: 'portrait' | 'landscape';
  accent: string;
  showTitle: boolean;
  showOptionalDetails: boolean;
}

export interface PrismaProject {
  schemaVersion: typeof SCHEMA_VERSION;
  id: string;
  title: string;
  shortTitle: string;
  authors: string[];
  institution: string;
  protocolUrl: string;
  reviewType: 'systematic' | 'scoping' | 'living' | 'network-meta-analysis';
  reviewKind: ReviewKind;
  model: DiagramModel;
  guideline: 'PRISMA 2020';
  extensions: string[];
  locale: Locale;
  status: ProjectStatus;
  updatedDate: string;
  observations: string;
  sources: SourceItem[];
  counts: Counts;
  overrides: Partial<Record<CountKey, ManualOverride>>;
  exclusionReasons: ExclusionReason[];
  otherExclusionReasons: ExclusionReason[];
  provenance: Partial<Record<CountKey, NodeProvenance>>;
  checklist: ChecklistEntry[];
  presentation: PresentationPreferences;
  history: HistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface CalculatedCounts {
  values: Counts;
  origins: Record<CountKey, 'informed' | 'derived' | 'override' | 'not-applicable'>;
  formulas: Partial<Record<CountKey, string>>;
}

export interface ValidationIssue {
  id: string;
  status: ValidationStatus;
  title: string;
  location: CountKey | 'project' | 'model';
  why: string;
  how: string;
  related: CountKey[];
}
