import { API_URL } from '@/lib/config';
import type { ChatResponse, ListResponse, SongDetail, SongSummary, SourceRow } from '@/lib/types';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    cache: 'no-store',
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    throw new ApiError(detail?.detail ?? `Request failed: ${response.status}`, response.status);
  }
  return (await response.json()) as T;
}

/** Server-side fetch: trả mảng rỗng khi backend chết để trang vẫn render error/empty state. */
export async function getSongs(params?: { q?: string }): Promise<SongSummary[] | null> {
  const query = params?.q ? `?q=${encodeURIComponent(params.q)}` : '';
  try {
    const data = await request<ListResponse<SongSummary>>(`/api/songs${query}`);
    return data.items;
  } catch {
    return null;
  }
}

export async function getSong(idOrSlug: string): Promise<SongDetail | null> {
  try {
    return await request<SongDetail>(`/api/songs/${encodeURIComponent(idOrSlug)}`);
  } catch {
    return null;
  }
}

export async function getSources(): Promise<SourceRow[] | null> {
  try {
    const data = await request<ListResponse<SourceRow>>('/api/sources');
    return data.items;
  } catch {
    return null;
  }
}

/** Client-side: lỗi được ném ra để ChatWidget hiển thị error state. */
export async function sendChatMessage(message: string, conversationId?: string): Promise<ChatResponse> {
  return request<ChatResponse>('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message, conversation_id: conversationId ?? null }),
  });
}
