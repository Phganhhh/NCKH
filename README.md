# WebAR Hát Xoan Phú Thọ

POC WebAR số hóa và nâng cao trải nghiệm di sản Hát Xoan Phú Thọ.

## Luồng chính

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
→ Nguồn tài liệu
```

## Cấu trúc project

```text
NCKH/
├── frontend/
│   ├── public/
│   │   ├── targets/
│   │   ├── posters/
│   │   ├── videos/
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── state/
│   │   ├── styles/
│   │   └── data/
│   └── index.html
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── rag/
│   │   ├── database/
│   │   └── data/
│   ├── tests/
│   ├── main.py
│   └── config.py
│
├── docs/
│   ├── MODULE_INDEX.md
│   ├── STATUS.md
│   └── modules/
│
├── PLAN.md
└── CLAUDE.md
```

## Tài liệu

- [PLAN.md](PLAN.md): thiết kế tổng thể và kế hoạch 8 tuần
- [docs/MODULE_INDEX.md](docs/MODULE_INDEX.md): danh sách module và trạng thái
- [docs/STATUS.md](docs/STATUS.md): trạng thái hiện tại của dự án
- [backend/README.md](backend/README.md): hướng dẫn backend RAG

## Quy trình làm theo module

Mỗi tuần/module có một checklist riêng trong `docs/modules/`.

Nguyên tắc:

1. Đọc `docs/STATUS.md`
2. Đọc checklist module hiện tại
3. Làm việc trong `docs/modules/MODULE_xx...md`
4. Pass Gate mới sang module sau
5. Cập nhật `docs/STATUS.md` và `docs/MODULE_INDEX.md`
