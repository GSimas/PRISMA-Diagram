'use client';

import { AssistantError, type AssistantMessage, type AssistantProviderConfig, type AssistantProviderId } from './types';

interface SendParams {
  providerId: AssistantProviderId;
  config: AssistantProviderConfig;
  systemPrompt: string;
  history: AssistantMessage[];
}

const TIMEOUT_MS = 30000;

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new AssistantError('network', 'Request timed out.');
    }
    throw new AssistantError('network', 'Network request failed.');
  } finally {
    window.clearTimeout(timer);
  }
}

async function readErrorBody(response: Response): Promise<string> {
  try {
    const text = await response.text();
    return text.slice(0, 300);
  } catch {
    return '';
  }
}

const toOpenAiMessages = (systemPrompt: string, history: AssistantMessage[]) => [
  { role: 'system', content: systemPrompt },
  ...history.filter((m) => m.role !== 'error').map((m) => ({ role: m.role, content: m.content })),
];

async function sendOpenAiCompatible(baseUrl: string, config: AssistantProviderConfig, systemPrompt: string, history: AssistantMessage[], extraHeaders: Record<string, string> = {}): Promise<string> {
  const response = await fetchWithTimeout(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${config.apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model: config.model,
      messages: toOpenAiMessages(systemPrompt, history),
      max_tokens: 800,
      temperature: 0.3,
    }),
  });
  if (!response.ok) {
    const body = await readErrorBody(response);
    throw new AssistantError('http', `HTTP ${response.status}: ${body}`);
  }
  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const content = data?.choices?.[0]?.message?.content;
  if (!content || typeof content !== 'string') throw new AssistantError('empty-response', 'Empty response from provider.');
  return content;
}

async function sendAnthropic(config: AssistantProviderConfig, systemPrompt: string, history: AssistantMessage[]): Promise<string> {
  const response = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: config.model,
      system: systemPrompt,
      max_tokens: 800,
      messages: history.filter((m) => m.role !== 'error').map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!response.ok) {
    const body = await readErrorBody(response);
    throw new AssistantError('http', `HTTP ${response.status}: ${body}`);
  }
  const data = (await response.json()) as { content?: { text?: string }[] };
  const text = Array.isArray(data?.content) ? data.content.map((block) => block.text ?? '').join('') : '';
  if (!text) throw new AssistantError('empty-response', 'Empty response from provider.');
  return text;
}

async function sendGoogle(config: AssistantProviderConfig, systemPrompt: string, history: AssistantMessage[]): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent?key=${encodeURIComponent(config.apiKey)}`;
  const response = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: history
        .filter((m) => m.role !== 'error')
        .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      generationConfig: { maxOutputTokens: 800, temperature: 0.3 },
    }),
  });
  if (!response.ok) {
    const body = await readErrorBody(response);
    throw new AssistantError('http', `HTTP ${response.status}: ${body}`);
  }
  const data = (await response.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  const parts = data?.candidates?.[0]?.content?.parts;
  const text = Array.isArray(parts) ? parts.map((p) => p.text ?? '').join('') : '';
  if (!text) throw new AssistantError('empty-response', 'Empty response from provider.');
  return text;
}

export async function sendAssistantMessage({ providerId, config, systemPrompt, history }: SendParams): Promise<string> {
  if (!config.apiKey.trim()) throw new AssistantError('missing-key', 'Missing API key.');
  if (providerId === 'custom' && !config.baseUrl?.trim()) throw new AssistantError('missing-key', 'Missing base URL.');

  switch (providerId) {
    case 'openai':
      return sendOpenAiCompatible('https://api.openai.com/v1', config, systemPrompt, history);
    case 'openrouter':
      return sendOpenAiCompatible('https://openrouter.ai/api/v1', config, systemPrompt, history, {
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
        'X-Title': 'PRISMA Lab',
      });
    case 'custom':
      return sendOpenAiCompatible(config.baseUrl!, config, systemPrompt, history);
    case 'anthropic':
      return sendAnthropic(config, systemPrompt, history);
    case 'google':
      return sendGoogle(config, systemPrompt, history);
    default:
      throw new AssistantError('missing-key', 'Unknown provider.');
  }
}
