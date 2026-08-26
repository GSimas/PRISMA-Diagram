import type { AssistantProviderId } from './types';

export interface AssistantProviderMeta {
  id: AssistantProviderId;
  label: string;
  defaultModel: string;
  modelHint: string;
  keyUrl: string;
  needsBaseUrl?: boolean;
}

export const assistantProviders: AssistantProviderMeta[] = [
  {
    id: 'openai',
    label: 'OpenAI',
    defaultModel: 'gpt-4o-mini',
    modelHint: 'e.g. gpt-4o-mini, gpt-4.1-mini',
    keyUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    defaultModel: 'claude-sonnet-5',
    modelHint: 'e.g. claude-sonnet-5, claude-haiku-4-5',
    keyUrl: 'https://console.anthropic.com/settings/keys',
  },
  {
    id: 'google',
    label: 'Google (Gemini)',
    defaultModel: 'gemini-2.5-flash',
    modelHint: 'e.g. gemini-2.5-flash, gemini-2.5-pro',
    keyUrl: 'https://aistudio.google.com/apikey',
  },
  {
    id: 'openrouter',
    label: 'OpenRouter',
    defaultModel: 'openai/gpt-4o-mini',
    modelHint: 'e.g. openai/gpt-4o-mini, anthropic/claude-sonnet-5',
    keyUrl: 'https://openrouter.ai/keys',
  },
  {
    id: 'custom',
    label: 'Custom (OpenAI-compatible)',
    defaultModel: '',
    modelHint: 'exact model id served by your endpoint',
    keyUrl: '',
    needsBaseUrl: true,
  },
];

export const assistantProviderMeta = (id: AssistantProviderId): AssistantProviderMeta =>
  assistantProviders.find((provider) => provider.id === id) ?? assistantProviders[0];
