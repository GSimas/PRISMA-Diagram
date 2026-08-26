export type AssistantProviderId = 'openai' | 'anthropic' | 'google' | 'openrouter' | 'custom';

export interface AssistantProviderConfig {
  apiKey: string;
  model: string;
  baseUrl?: string;
}

export interface AssistantSettings {
  consent: boolean;
  activeProvider: AssistantProviderId;
  providers: Partial<Record<AssistantProviderId, AssistantProviderConfig>>;
}

export type AssistantRole = 'user' | 'assistant' | 'error';

export interface AssistantMessage {
  id: string;
  role: AssistantRole;
  content: string;
  at: string;
}

export type AssistantErrorReason = 'missing-key' | 'network' | 'http' | 'empty-response';

export class AssistantError extends Error {
  reason: AssistantErrorReason;
  constructor(reason: AssistantErrorReason, message: string) {
    super(message);
    this.reason = reason;
  }
}
