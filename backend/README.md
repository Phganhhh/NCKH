# Hát Xoan RAG Chatbot

Backend FastAPI cho hệ thống WebAR Hát Xoan Phú Thọ.

## Cấu trúc

```text
backend/
├── main.py
├── config.py
├── requirements.txt
├── .env.example
├── demo_cli.py
├── app/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── rag/
│   ├── database/
│   └── data/
└── tests/
```

## Chạy backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate

pip install -r requirements.txt
copy .env.example .env
```

### Build ChromaDB

```bash
python -m app.rag.ingest
```

### Chạy API

```bash
python main.py
```

API chạy tại:

```text
http://localhost:8000
```

Demo chatbot:

```text
http://localhost:8000/demo
```

## Test

```bash
python -m pytest tests/
```

Lưu ý: một số test gọi thật Gemini API và cần `GOOGLE_API_KEY`.
