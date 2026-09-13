# Hát Xoan RAG Chatbot (Module 3)

Module AI chatbot sử dụng RAG (Retrieval-Augmented Generation) để trả lời câu hỏi về di sản Hát Xoan Phú Thọ.

## Cấu trúc thư mục

```
server/
├── app.py                  # FastAPI app chính
├── main.py                 # Entry point chạy server
├── config.py               # Đọc biến môi trường
├── requirements.txt        # Thư viện Python cần cài
├── .env.example            # Mẫu file môi trường
├── data/                   # Tài liệu tri thức (7 file .txt)
│   ├── 01_gioi_thieu_nguon_goc.txt
│   ├── 02_the_loai_va_cac_chang_bai_hat.txt
│   ├── ...
│   └── raw/                # File gốc (PDF)
├── rag/                    # RAG pipeline
│   ├── ingest.py           # Index dữ liệu vào ChromaDB
│   ├── embeddings.py       # Google embedding
│   ├── vector_store.py     # ChromaDB wrapper
│   ├── retriever.py        # Tìm kiếm tài liệu liên quan
│   ├── llm.py              # Gọi Gemini API
│   └── prompt.py           # Prompt template
├── api/                    # FastAPI routes
│   └── chat.py
├── models/                 # Pydantic schemas
│   └── schemas.py
├── tests/                  # Test scripts
│   ├── test_chat.py
│   └── test_ingest.py
└── chroma_db/              # Cơ sở dữ liệu vector
```

## Hướng dẫn chạy

1. Cài đặt thư viện:
   ```bash
   pip install -r requirements.txt
   ```

2. Tạo file `.env` từ `.env.example` và điền `GOOGLE_API_KEY`.

3. Index dữ liệu:
   ```bash
   python -m rag.ingest
   ```

4. Chạy server:
   ```bash
   python main.py
   ```

5. Test API:
   ```bash
   curl -X POST http://localhost:8000/chat -H "Content-Type: application/json" -d "{\"query\":\"Hát Xoan là gì?\"}"
   ```

## Lưu ý

- API Key của Google cần được giữ bí mật, không đẩy lên Git.
- Cần chạy HTTPS khi triển khai production vì WebAR yêu cầu HTTPS.
