# Hát Xoan Digital — Hướng dẫn chạy demo

Dự án gồm **Backend Chatbot (Python/FastAPI)** trả lời về di sản Hát Xoan Phú Thọ dựa trên RAG và **Frontend HTML tĩnh** để người dùng tương tác.

---

## Yêu cầu trước khi chạy

- **Python** 3.11+ (khuyến nghị 3.13)
- Kết nối Internet (để gọi Gemini API)
- (Tùy chọn) Trình duyệt Chrome/Firefox/Edge hiện đại

---

## 1. Cài đặt backend

### Bước 1.1: Cài các gói Python cần thiết

Mở terminal tại thư mục gốc của project, sau đó chạy:

```bash
cd backend
pip install fastapi uvicorn pydantic python-dotenv rank-bm25 google-genai
```

> **Ghi chú:** Project hiện chưa có `requirements.txt`, các gói trên là tối thiểu để backend hoạt động.

### Bước 1.2: Chuẩn bị file `.env`

Ở thư mục gốc project, mở file `.env` và điền **Gemini API Key** của bạn:

```env
GEMINI_API_KEY=AIza...xxx
```

Nếu chưa có key, lấy miễn phí tại: https://aistudio.google.com/apikey

Các biến môi trường đã có sẵn giá trị mặc định phù hợp:

```env
LLM_MODEL=gemini-3.6-flash
DATABASE_URL=sqlite:///./hatxoan.db
CORS_ORIGINS=http://localhost:3000,http://localhost:8080,http://127.0.0.1:8080
```

> **Lưu ý:** Nếu để `GEMINI_API_KEY` trống, chatbot vẫn chạy ở chế độ **extractive fallback** (trích xuất đoạn văn từ kho tri thức, không dùng AI).

### Bước 1.3: Khởi động backend

Từ thư mục `backend`, chạy:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Nếu thành công, terminal sẽ hiển thị:

```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Kiểm tra nhanh API bằng trình duyệt hoặc curl:

```bash
curl http://localhost:8000/
```

Kết quả mong đợi:

```json
{"service":"Hat Xoan Digital API","version":"1.0.0","status":"ok"}
```

---

## 2. Cài đặt frontend

Frontend là một file HTML tĩnh, có thể phục vụ bằng bất kỳ cách nào.

### Cách đơn giản nhất: dùng Python

Từ thư mục gốc project (ngang hàng với `index.html`), chạy:

```bash
python -m http.server 8080
```

Sau đó mở trình duyệt tại: **http://localhost:8080**

### Cách khác: dùng Node / `npx`

```bash
npx serve .
```

Hoặc dùng VS Code Extension **Live Server** để mở `index.html`.

---

## 3. Test chatbot

### 3.1 Test qua giao diện web

1. Mở **http://localhost:8080**
2. Tìm nút/liên kết chat (thường là icon hoặc nút "Trò chuyện")
3. Gõ câu hỏi, ví dụ: *"Hát Xoan là gì?"* hoặc *"Hát Xoan có nguồn gốc từ đâu?"*

### 3.2 Test qua API trực tiếp

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hát Xoan là gì?","conversation_id":"demo-001"}'
```

Kết quả trả về dạng:

```json
{
  "answer": "Hát Xoan là loại hình nghệ thuật dân gian...",
  "sources": [...],
  "conversation_id": "demo-001"
}
```

### 3.3 Test streaming (SSE)

Chatbot trên web dùng endpoint stream để hiển thị câu trả lời từng chữ:

```bash
curl -N -X POST http://localhost:8000/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{"message":"Có mấy chặng hát?","conversation_id":"demo-001"}'
```

Các sự kiện SSE lần lượt: `meta` (conversation_id + sources) → nhiều `delta` (từng mảnh câu trả lời) → `done`.

---

## 4. Cấu trúc dữ liệu RAG

Các file tri thức nằm trong:

```
data/knowledge/
├── 01-gioi-thieu.md
├── 02-ba-chang.md
├── 03-lich-su.md
├── 04-lan-dieu.md
└── ...
```

Backend tự động đọc các file `.md` này khi khởi động, chia nhỏ theo heading và lập chỉ mục BM25 để trả lời câu hỏi.

---

## 5. Lưu ý & xử lý lỗi thường gặp

| Hiện tượng | Nguyên nhân gợi ý | Cách xử lý |
|---|---|---|
| `ClientError` hoặc lỗi 404 từ Gemini | Tên model không còn hỗ trợ | Kiểm tra `LLM_MODEL` trong `.env`, hiện tại dùng `gemini-3.6-flash` |
| `401` hoặc `API key not valid` | Sai hoặc thiếu Gemini API Key | Lấy key tại https://aistudio.google.com/apikey và điền vào `.env` |
| Frontend không kết nối được backend | Lỗi CORS hoặc sai port | Đảm bảo backend chạy ở `http://localhost:8000`, frontend ở `localhost:8080` |
| Câu trả lời chỉ là trích dẫn | Chế độ extractive fallback | Điền đúng `GEMINI_API_KEY` và restart backend |

---

## 6. Chạy nhanh một lệnh (cheatsheet)

Terminal 1 — Backend:

```bash
cd backend
pip install fastapi uvicorn pydantic python-dotenv rank-bm25 google-genai
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Terminal 2 — Frontend:

```bash
python -m http.server 8080
```

Mở trình duyệt: **http://localhost:8080**
