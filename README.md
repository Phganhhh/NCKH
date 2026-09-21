# Hát Xoan Digital Experience

Prototype nền tảng số hóa và nâng cao trải nghiệm thưởng thức **Di sản Hát Xoan Phú Thọ** bằng
**Web + RAG Chatbot + WebAR (Zapworks)**.

> Đây là prototype/POC phục vụ đề tài nghiên cứu — không phải hệ thống production.
> Mọi nội dung văn hóa chưa có nguồn xác minh đều được đánh dấu `[PLACEHOLDER CONTENT – REPLACE WITH VERIFIED SOURCE]`.

---

## 1. Architecture

```text
                    HÁT XOAN DIGITAL EXPERIENCE
                              │
              ┌───────────────┴────────────────┐
              ▼                                ▼
        WEB INFORMATION                   WEBAR EXPERIENCE
        (Next.js 14)                      (Zapworks - external)
              │                                │
      ┌───────┼────────┐                ┌──────┴──────┐
   Content  Video   Chatbot          Image         AR Video
                       │             Tracking
                       ▼
                      RAG  (hybrid retrieval → rerank → prompt → LLM)
                       │
                       ▼
              GLOBAL KNOWLEDGE BASE  (một KB duy nhất, data/knowledge/*.md)
                       │
                       ▼
                      LLM  (OpenAI-compatible hoặc extractive fallback)
```

Chi tiết: [`docs/architecture.md`](docs/architecture.md)

## 2. Tech Stack

| Lớp | Công nghệ |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript (strict), Tailwind CSS, Lucide Icons |
| Backend | Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.0 |
| Database | SQLite (mặc định dev) · PostgreSQL / Supabase (qua `DATABASE_URL`) |
| RAG | BM25 (pure Python) + Embedding (tuỳ chọn) → RRF → reranker → LLM |
| AR | Zapworks WebAR (module độc lập, nhúng qua URL) |

## 3. Installation

Yêu cầu: **Node ≥ 18**, **Python ≥ 3.10**.

```bash
cp .env.example .env          # chỉnh sửa nếu cần (mặc định chạy được ngay)
```

**Backend**

```bash
cd backend
pip install -r requirements.txt
python -m scripts.seed           # nạp 3 bài Xoan mẫu + assets
uvicorn app.main:app --reload    # http://localhost:8000  ·  Swagger: /docs
```

**Frontend**

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev                      # http://localhost:3000
```

Hoặc dùng `make install && make seed && make backend` / `make frontend`.
Docker (tuỳ chọn): `docker compose up --build` (frontend 3000, backend 8000, postgres 5432).

## 4. Environment Variables

| Biến | Nơi dùng | Mặc định | Ý nghĩa |
|---|---|---|---|
| `DATABASE_URL` | backend | `sqlite:///./hatxoan.db` | Đổi sang `postgresql+psycopg://…` để dùng Postgres/Supabase (cần bỏ comment `psycopg` trong requirements) |
| `LLM_API_KEY` | backend | rỗng | Trống ⇒ chatbot chạy chế độ **extractive fallback** (vẫn có RAG + citation, không cần API key) |
| `LLM_BASE_URL` / `LLM_MODEL` | backend | OpenAI | Mọi endpoint chuẩn `/chat/completions` đều dùng được |
| `EMBEDDING_MODEL` | backend | `text-embedding-3-small` | Bật vector search khi có API key (hybrid với BM25) |
| `RAG_TOP_K` / `RAG_MIN_SCORE` / `RAG_MIN_COVERAGE` | backend | `5` / `0.15` / `0.34` | Tinh chỉnh retrieval & ngưỡng "ngoài phạm vi" |
| `ENABLE_CHAT_MEMORY` | backend | `false` | `true` ⇒ lưu `conversations`/`messages` vào DB |
| `CORS_ORIGINS` | backend | `http://localhost:3000` | |
| `NEXT_PUBLIC_API_URL` | frontend | `http://localhost:8000` | |
| `NEXT_PUBLIC_AR_URL` | frontend | rỗng | URL Zapworks WebAR. Trống ⇒ `/ar` hiển thị *"AR experience is not configured yet."* và **không crash** |

Không commit secret, không hard-code API key.

## 5. Database

Bảng: `songs`, `assets`, `conversations`, `messages` — xem [`docs/database.md`](docs/database.md).
Seed idempotent từ `data/seed/*.json`:

```bash
cd backend && python -m scripts.seed
```

## 6. RAG

```text
Query → Hybrid Retrieval (BM25 [+ Embedding]) → RRF → Reranker → Top-K → Prompt → LLM → Answer + Sources
```

- **Một Global Knowledge Base duy nhất** (`data/knowledge/*.md`), mỗi chunk có metadata
  (`topic`, `song_id`, `source`) phục vụ filtering/citation — **không** tạo KB riêng cho từng bài Xoan.
- Câu hỏi ngoài phạm vi hoặc không có trong KB ⇒ từ chối rõ ràng, không bịa.
- System prompt nằm ở `backend/app/prompts/chatbot.py` (không hard-code trong route).
- Kiểm tra KB: `cd backend && python -m scripts.build_kb`

Chi tiết: [`docs/chatbot.md`](docs/chatbot.md)

## 7. AR

Website **chỉ là entry point**: `/ar` → `NEXT_PUBLIC_AR_URL` → Zapworks WebAR → image tracking poster →
3 virtual posters → chọn 1 → AR video phát trong không gian AR.
Website không render AR, không phát video AR; AR không gọi backend lúc runtime.

ID mapping (`xoan_001 → AR_POSTER_001 / AR_VIDEO_001`, …) và phân chia trách nhiệm:
[`docs/ar-integration.md`](docs/ar-integration.md)

## 8. Demo flow

```text
Home → About → Songs → Song Detail → Watch Video → Ask Chatbot (RAG → Answer + Sources) → Click "Trải nghiệm AR" → Zapworks WebAR
```

## 9. Testing

```bash
cd backend && pytest                 # 18 test: API + RAG (6 nhóm câu hỏi bắt buộc)
cd frontend && npm run build         # typecheck + build
cd frontend && npm run smoke         # smoke test các trang (cần dev/start đang chạy)
SMOKE_BACKEND_DOWN=1 npm run smoke   # kiểm tra UI không vỡ khi API lỗi (tắt backend trước)
```

## 10. Content provenance

Xem [`docs/content-provenance.md`](docs/content-provenance.md) và `data/sources/asset_sources.csv`.
Trang `/sources` hiển thị bảng nguồn ngay trên website.

## 11. Known limitations

- Nội dung văn hóa hiện phần lớn là **placeholder**; chưa có media thật (ảnh/video/audio).
- RAG giữ KB trong bộ nhớ tiến trình — phù hợp KB nhỏ, chưa dùng vector DB ngoài.
- Reranker là keyword-overlap, chưa phải cross-encoder.
- Chat memory mặc định tắt (client-side state); bảng DB đã sẵn sàng.
- Chưa có auth, admin CMS, i18n; AR do team khác build trong Zapworks.
- `create_all()` thay cho migration (Alembic).

## 12. Future work

pgvector/Qdrant · cross-encoder reranker · persistent chat memory + đánh giá RAG (groundedness, citation accuracy) ·
admin CMS nhập liệu + duyệt nguồn · analytics · i18n (EN) · QR code in kèm poster · PWA/offline ·
CI/CD + Alembic migration.
