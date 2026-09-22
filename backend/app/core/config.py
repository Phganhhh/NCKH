from __future__ import annotations
import os
from pathlib import Path
from dotenv import load_dotenv

# Tải .env từ gốc repo (2 cấp trên backend/)
_ROOT = Path(__file__).resolve().parents[3]
load_dotenv(_ROOT / ".env", override=False)

DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./hatxoan.db")

# Gemini API — lấy key tại https://aistudio.google.com/apikey
LLM_API_KEY: str = os.getenv("GEMINI_API_KEY", "") or os.getenv("LLM_API_KEY", "")
LLM_MODEL: str = os.getenv("LLM_MODEL", "gemini-3.6-flash")

VECTOR_DB_URL: str = os.getenv("VECTOR_DB_URL", "")

RAG_TOP_K: int = int(os.getenv("RAG_TOP_K", "5"))
RAG_MIN_SCORE: float = float(os.getenv("RAG_MIN_SCORE", "0.15"))

ENABLE_CHAT_MEMORY: bool = os.getenv("ENABLE_CHAT_MEMORY", "false").lower() == "true"

# CORS — tách bởi dấu phẩy
_cors_raw = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:8080,http://127.0.0.1:8080",
)
CORS_ORIGINS: list[str] = [o.strip() for o in _cors_raw.split(",") if o.strip()]

# Thư mục knowledge base
KNOWLEDGE_DIR: Path = _ROOT / "data" / "knowledge"
