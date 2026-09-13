# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Bối cảnh dự án

Đề tài NCKH: **WebAR POC số hóa di sản Hát Xoan Phú Thọ** — scope 8 tuần, không cài app, chạy trên trình duyệt điện thoại.

Luồng chính:

```text
Poster vật lý
→ QR
→ Website
→ Camera
→ MindAR image tracking
→ 3 poster ảo carousel
→ Chọn bài
→ Video biểu diễn
→ Chatbot RAG context-aware
→ Trả lời kèm nguồn
```

Trao đổi và viết tài liệu/code comments bằng **tiếng Việt**.

## Cấu trúc project

```text
frontend/
├── public/
│   ├── targets/
│   ├── posters/
│   ├── videos/
│   └── images/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── state/
│   ├── styles/
│   └── data/
└── index.html

backend/
├── app/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── rag/
│   ├── database/
│   └── data/
├── tests/
├── main.py
└── config.py

docs/
├── MODULE_INDEX.md
├── STATUS.md
└── modules/
```

## Quy trình bắt đầu mỗi phiên làm việc

Bắt buộc đọc theo thứ tự:

1. `docs/STATUS.md`
2. `docs/MODULE_INDEX.md`
3. Checklist module hiện tại trong `docs/modules/`
4. `PLAN.md` phần tương ứng module

Không bắt đầu module mới nếu Gate module hiện tại chưa pass.

## Commands

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

python -m app.rag.ingest
python main.py
python -m pytest tests/
```

Demo chatbot: `http://localhost:8000/demo`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:5173`

Camera/MindAR chỉ chạy trên `localhost` hoặc HTTPS. Khi test trên điện thoại thật, bắt buộc dùng HTTPS.

## Trạng thái code

- `frontend/`: scaffold chuẩn bị cho React/Vite + MindAR. Chưa có UI thật.
- `backend/`: FastAPI RAG chatbot. Chưa có `/songs` và database.
- `docs/modules/`: 8 checklist module tương ứng 8 tuần trong `PLAN.md`.

## Quyết định kiến trúc đã chốt

- Không dùng Plane Detection / WebXR / 3D sân khấu
- Video dùng HTML overlay `<video>`, không dùng VideoTexture trong Three.js
- 3 poster ảo nằm trong cùng 1 Image Target
- Swipe carousel dùng HTML/CSS touch events
- Dữ liệu bài hát qua API, không hard-code
- Chatbot nhận `song_id` làm context
- Chatbot trả về answer + sources
- 3 poster phải có spatial behavior: floating / parallax / depth

## Gate model

Mỗi module kết thúc bằng một Gate. Gate liên quan AR phải chạy trên điện thoại thật và có bằng chứng. Không được tuyên bố pass Gate khi chưa chạy thực tế.

## Skills playbook

| Khi làm việc gì | Dùng skill |
|---|---|
| Thiết kế UI | `.claude/skills/frontend-design` |
| Bug AR/tracking/UI | `superpowers:systematic-debugging` |
| API chat/RAG | `superpowers:test-driven-development` |
| Kiểm tra trước khi xong | `superpowers:verification-before-completion` |
| Review code | `superpowers:requesting-code-review` |

## Tài liệu chính

- [PLAN.md](PLAN.md): kế hoạch tổng thể
- [docs/MODULE_INDEX.md](docs/MODULE_INDEX.md): trạng thái 8 module
- [docs/STATUS.md](docs/STATUS.md): trạng thái hiện tại
- [backend/README.md](backend/README.md): hướng dẫn backend
