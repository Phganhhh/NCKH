# Dự án WebAR Hát Xoan Phú Thọ

Ứng dụng công nghệ WebAR để số hóa và nâng cao trải nghiệm di sản Hát Xoan Phú Thọ.

## Cấu trúc dự án

```
AI_NCKH/
├── client/                 # Web Frontend (Module 1 & 2)
│   ├── assets/             # Hình ảnh, video, audio, target files
│   ├── css/
│   ├── js/
│   │   ├── ar/             # MindAR + A-Frame logic
│   │   ├── ui/             # UI + chat widget
│   │   ├── api.js          # Gọi backend
│   │   └── app.js          # Entry point
│   └── index.html
│
└── server/                 # RAG Chatbot Backend (Module 3)
    ├── app.py
    ├── main.py
    ├── requirements.txt
    ├── config.py
    ├── .env.example
    ├── README.md
    ├── data/               # Tài liệu tri thức Hát Xoan
    ├── rag/                # RAG pipeline
    ├── api/                # FastAPI routes
    ├── models/             # Pydantic schemas
    └── tests/              # Unit tests
```

## Tài liệu chi tiết

- [PLAN.md](PLAN.md): Phân tích yêu cầu và thiết kế kiến trúc
- [server/README.md](server/README.md): Hướng dẫn Module AI
