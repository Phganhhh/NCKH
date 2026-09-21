# Chatbot & RAG

## 1. Nguyên tắc: MỘT Global Knowledge Base

```text
                 HÁT XOAN KB  (data/knowledge/*.md)
                     │
       ┌─────────────┼─────────────┐
    History        Songs         Culture
       │             │             │
  Performance     Lyrics       Costumes
```

Không có "KB của bài Xoan 1/2/3". Chỉ có **một** KB; mỗi chunk mang metadata:

```json
{ "content": "...", "metadata": { "topic": "song", "song_id": "xoan_001", "source": "source_003", "title": "Bài Xoan 1 — Giới thiệu" } }
```

Metadata dùng cho: filtering, debugging, citations, evaluation — **không** dùng để tách thành nhiều chatbot.

## 2. Pipeline

```text
USER → POST /api/chat
  ↓ Query processing (normalize, detect out-of-scope keywords)
  ↓ Hybrid Retrieval
      ├── BM25Retriever        (pure python, luôn bật)
      └── EmbeddingRetriever   (bật khi có LLM_API_KEY + EMBEDDING_MODEL)
  ↓ Fusion (Reciprocal Rank Fusion)
  ↓ Reranker (KeywordOverlapReranker — interface sẵn cho cross-encoder)
  ↓ Top-K context (RAG_TOP_K, default 5)
  ↓ Prompt builder (backend/app/prompts/chatbot.py)
  ↓ LLM provider
  ↓ Answer + sources
```

Nếu điểm cao nhất < `RAG_MIN_SCORE` → trả lời "chưa có đủ dữ liệu trong Knowledge Base", `grounded=false`, không gọi LLM.

## 3. Interfaces (để mở rộng)

```python
class Retriever(Protocol):
    def retrieve(self, query: str, k: int) -> list[RetrievedChunk]: ...

class Reranker(Protocol):
    def rerank(self, query: str, chunks: list[RetrievedChunk], k: int) -> list[RetrievedChunk]: ...

class LLMProvider(Protocol):
    name: str
    def complete(self, system: str, user: str) -> str: ...
```

Thay BM25 → pgvector/Qdrant, hoặc KeywordOverlap → cross-encoder, chỉ cần implement interface và đổi factory trong `rag/pipeline.py`.

## 4. LLM providers

| Provider | Khi nào dùng | Cấu hình |
|---|---|---|
| `openai_compatible` | Có API key (OpenAI, OpenRouter, Together, LM Studio...) | `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL` |
| `extractive-fallback` | Mặc định khi **không** có API key | không cần gì |

`extractive-fallback` ghép các đoạn KB liên quan nhất thành câu trả lời + ghi rõ đang ở chế độ trích xuất. Nhờ vậy demo RAG chạy được offline, vẫn thể hiện đúng retrieval + citation.

## 5. System prompt

Đặt tại `backend/app/prompts/chatbot.py`, **không** hard-code trong router. Nội dung: chỉ dùng thông tin trong KB, không bịa, nói rõ khi thiếu dữ liệu, luôn kèm nguồn, trả lời tiếng Việt, từ chối câu hỏi ngoài phạm vi Hát Xoan.

## 6. Ingest KB

```bash
cd backend && python -m scripts.build_kb   # kiểm tra & in thống kê chunks
```
KB được load vào memory lúc startup (`rag/knowledge_base.py`). File `.md` trong `data/knowledge/` có front-matter:

```markdown
---
id: kb_001
title: Giới thiệu Hát Xoan
topic: history
song_id:
source: source_001
---
Nội dung...
```

## 7. Test tối thiểu (`backend/tests/test_rag.py`)

1. Hát Xoan là gì?
2. Hát Xoan có những đặc điểm gì?
3. Bài Xoan 1 là gì?
4. Nội dung bài Xoan?
5. Câu hỏi ngoài phạm vi (ví dụ: "Giá Bitcoin hôm nay?") → phải từ chối.
6. Câu hỏi không có trong KB → phải nói chưa đủ dữ liệu, không bịa.

## 8. UI

Floating button góc dưới phải, xuất hiện ở **mọi page** (đặt trong `app/layout.tsx`). Có loading state, error state, empty state, hiển thị nguồn dưới mỗi câu trả lời, responsive (full-screen sheet trên mobile).
