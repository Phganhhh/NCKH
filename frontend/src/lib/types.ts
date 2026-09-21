export interface SongSummary {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  short_description: string | null;
  thumbnail_url: string | null;
  status: string;
}

export interface Asset {
  id: string;
  song_id: string | null;
  asset_type: 'image' | 'video' | 'audio' | 'document' | 'ar_poster' | 'ar_video';
  url: string | null;
  source: string | null;
  author: string | null;
  license: string | null;
  description: string | null;
}

export interface SongDetail extends SongSummary {
  description: string | null;
  lyrics: string | null;
  cultural_info: string | null;
  performance_info: string | null;
  video_url: string | null;
  assets: Asset[];
}

export interface ChatSource {
  title: string;
  source: string | null;
  topic: string | null;
  song_id: string | null;
  score: number | null;
}

export interface ChatResponse {
  answer: string;
  conversation_id: string;
  sources: ChatSource[];
  grounded: boolean;
  provider: string;
}

export interface SourceRow {
  asset: string;
  type: string;
  source: string;
  author: string;
  license: string;
  url: string;
  date_accessed: string;
  purpose: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
}
