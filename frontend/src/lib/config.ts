/** Cấu hình runtime đọc từ biến môi trường. Không hard-code URL trong component. */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

/** URL trải nghiệm WebAR (Zapworks). Rỗng = chưa cấu hình -> trang /ar hiển thị fallback. */
export const AR_URL = process.env.NEXT_PUBLIC_AR_URL ?? '';

export const isArConfigured = (): boolean => AR_URL.trim().length > 0;

export const SITE = {
  name: 'Hát Xoan Phú Thọ',
  tagline: 'Khám phá di sản văn hóa phi vật thể qua trải nghiệm số',
  description:
    'Nền tảng số hóa và nâng cao trải nghiệm thưởng thức Di sản Hát Xoan Phú Thọ bằng Web, RAG Chatbot và WebAR.',
} as const;
