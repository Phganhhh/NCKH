# API

Base URL: `http://localhost:8000`. Swagger: `/docs`. OpenAPI JSON: `/openapi.json`.

## GET /health
```json
{ "status": "ok", "database": "connected", "llm_provider": "extractive-fallback", "kb_chunks": 42 }
```

## GET /api/songs
Query: `q` (search theo title/description, optional), `category` (optional), `limit` (default 50).
```json
{ "items": [ { "id": "xoan_001", "slug": "bai-xoan-1", "title": "Bài Xoan 1", "short_description": "...", "category": "...", "thumbnail_url": "...", "status": "published" } ], "total": 3 }
```

## GET /api/songs/{id_or_slug}
Trả về full detail (description, lyrics, cultural_info, performance_info, video_url) + `assets`.
404 → `{ "detail": "Song not found" }`.

## GET /api/songs/{id_or_slug}/assets
```json
{ "items": [ { "id": "asset_001", "asset_type": "image", "url": "...", "source": "...", "license": "..." } ], "total": 1 }
```

## GET /api/sources
Danh sách nguồn dữ liệu/media (đọc từ `data/sources/asset_sources.csv`) — phục vụ trang `/sources`.

## POST /api/chat
Request:
```json
{ "message": "Hát Xoan là gì?", "conversation_id": "abc123" }
```
Response:
```json
{
  "answer": "...",
  "conversation_id": "abc123",
  "sources": [ { "title": "Giới thiệu Hát Xoan", "source": "source_001", "topic": "history", "song_id": null, "score": 8.42 } ],
  "grounded": true,
  "provider": "extractive-fallback"
}
```
- `grounded=false` khi không tìm được context đủ điểm → answer là thông báo ngoài phạm vi / chưa có dữ liệu.
- `conversation_id` do client sinh nếu chưa có; server echo lại.

## Error contract
Mọi lỗi trả JSON `{ "detail": "..." }` với HTTP code chuẩn (400/404/422/500). Frontend luôn render error state thay vì crash.

## CORS
Cho phép `CORS_ORIGINS` (mặc định `http://localhost:3000`).
