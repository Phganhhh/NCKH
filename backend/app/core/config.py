"""Cấu hình ứng dụng — đọc từ biến môi trường / .env ở thư mục gốc repo."""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parents[2]
REPO_ROOT = BACKEND_DIR.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(REPO_ROOT / ".env", BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Hát Xoan Digital Experience API"
    app_version: str = "0.1.0"

    database_url: str = "sqlite:///./hatxoan.db"

    llm_api_key: str = ""
    llm_base_url: str = "https://api.openai.com/v1"
    llm_model: str = "gpt-4o-mini"
    embedding_model: str = "text-embedding-3-small"
    vector_db_url: str = ""

    rag_top_k: int = 5
    rag_min_score: float = 0.15
    rag_min_coverage: float = 0.34
    rag_candidates: int = 12

    enable_chat_memory: bool = False
    cors_origins: str = "http://localhost:3000"

    data_dir: Path = REPO_ROOT / "data"

    @property
    def knowledge_dir(self) -> Path:
        return self.data_dir / "knowledge"

    @property
    def seed_dir(self) -> Path:
        return self.data_dir / "seed"

    @property
    def sources_csv(self) -> Path:
        return self.data_dir / "sources" / "asset_sources.csv"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def llm_enabled(self) -> bool:
        return bool(self.llm_api_key.strip())


@lru_cache
def get_settings() -> Settings:
    return Settings()
