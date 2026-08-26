import type { Locale } from '../domain/types';

export const supportedLocales: Locale[] = ['pt-BR', 'en', 'it', 'fr', 'de', 'zh-CN'];
const baseMap: Record<string, Locale> = { pt: 'pt-BR', en: 'en', it: 'it', fr: 'fr', de: 'de', zh: 'zh-CN' };

export function detectLocale(languages: readonly string[] = []): Locale {
  for (const language of languages) {
    const normalized = language.replace('_', '-');
    const exact = supportedLocales.find((locale) => locale.toLowerCase() === normalized.toLowerCase());
    if (exact) return exact;
  }
  for (const language of languages) {
    const base = language.toLowerCase().split(/[-_]/)[0];
    if (baseMap[base]) return baseMap[base];
  }
  return 'en';
}
