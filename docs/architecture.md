# Architecture — Hát Xoan Digital Experience

> Prototype / POC. Mục tiêu: chạy được end-to-end, kiến trúc rõ ràng, dễ mở rộng.

## 1. Sơ đồ tổng thể

```text
                    HÁT XOAN DIGITAL EXPERIENCE
                              │
              ┌───────────────┴────────────────┐
              ▼                                ▼
        WEB INFORMATION                   WEBAR EXPERIENCE
       (Next.js frontend)                 (Zapworks - external)
              │                                │
      ┌───────┼────────┐                ┌──────┴──────┐
      │       │        │                │             │
   Content  Video   Chatbot          Image         AR Video
      │       │        │             Tracking      (đóng gói
      └───┬───┘        ▼                            trong Zap)
          │           RAG
          │            │
          ▼            ▼
     FastAPI  ──►  GLOBAL KNOWLEDGE BASE (1 KB duy nhất)
          │            │
          ▼            ▼
    PostgreSQL /     LLM Provider
    SQLite (dev)     (OpenAI-compatible, optional)
```

## 2. Thành phần

| Thành phần | Công nghệ | Trách nhiệm |
|---|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS | Website, song explorer, video player, chatbot UI, AR entry point |
| Backend | FastAPI, Pydantic v2, SQLAlchemy 2.0 | REST API cho songs/assets/chat, RAG orchestration |
| Database | SQLite (mặc định dev) hoặc PostgreSQL/Supabase | Lưu songs, assets, conversations, messages |
| RAG | In-process pipeline (chunk → hybrid retrieve → rerank → prompt → LLM) | Trả lời grounded + sources |
| AR | Zapworks WebAR (external URL) | Image tracking, 3 virtual posters, AR video |

## 3. Nguyên tắc kiến trúc

1. **Website là nền tảng chính.** Mọi thứ khác là module gắn vào website.
2. **Chatbot là module AI bên trong website**, dùng **một Global Knowledge Base duy nhất** cho toàn bộ Hát Xoan. Không có KB riêng cho từng bài Xoan — chỉ có `metadata.song_id` để filter/cite.
3. **AR là module độc lập.** Website chỉ cung cấp entry point (`/ar` → `NEXT_PUBLIC_AR_URL`). Website KHÔNG render AR, KHÔNG phát video AR. AR không gọi backend lúc runtime.
4. **Fail-soft:** AR chưa cấu hình → hiển thị thông báo + fallback, không crash. Backend chết → frontend hiển thị error state, trang vẫn render.
5. **Không over-engineer:** không Kubernetes, microservices, Redis, Kafka, Celery, auth phức tạp, admin CMS.

## 4. Layering (backend)

```text
api/        (FastAPI routers — chỉ validate & điều phối)
  └── services/     (business logic: song_service, chat_service)
        ├── repositories/  (truy cập DB — SQLAlchemy)
        └── rag/           (knowledge base, retriever, reranker, pipeline)
              └── llm/     (provider abstraction: OpenAI-compatible | extractive fallback)
```

Không viết logic nghiệp vụ trong router. Không truy cập DB trực tiếp từ router.

## 5. Luồng dữ liệu chính (happy path)

```text
Browser → Next.js page (SSR fetch) → GET /api/songs        → PostgreSQL/SQLite
Browser → ChatWidget            → POST /api/chat          → chat_service
                                                             → RAG pipeline
                                                                 → KB chunks (BM25 + vector)
                                                                 → reranker → top-K
                                                                 → prompt → LLM
                                                             ← answer + sources
Browser → /ar → window.open(NEXT_PUBLIC_AR_URL) → Zapworks WebAR (ngoài hệ thống)
```

## 6. Quyết định kỹ thuật (và lý do)

| Quyết định | Lý do |
|---|---|
| SQLite mặc định, Postgres qua `DATABASE_URL` | Chạy được ngay không cần cài DB; đổi sang Supabase chỉ bằng 1 biến môi trường |
| RAG in-process thay vì vector DB ngoài | 3 bài Xoan + KB nhỏ (~vài chục chunks) → không cần Qdrant/pgvector ở MVP; interface `Retriever` cho phép thay thế sau |
| BM25 pure-Python là retriever mặc định | Hoạt động **không cần API key**, tốt với tiếng Việt có dấu; embedding retriever bật khi có `LLM_API_KEY` |
| LLM provider abstraction + extractive fallback | Demo chạy offline; cắm OpenAI/OpenRouter/Gemini-compatible chỉ bằng env |
| Zapworks nhúng qua URL, không iframe bắt buộc | Camera permission + tracking ổn định hơn khi mở tab riêng |

## 7. Future work

Xem `README.md` → *Future improvements* (pgvector, cross-encoder reranker, persistent memory, admin CMS, analytics, i18n EN).
