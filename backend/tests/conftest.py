from __future__ import annotations

import os
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
# Test luôn chạy trên SQLite riêng, không đụng DB dev.
os.environ.setdefault("DATABASE_URL", f"sqlite:///{BACKEND_DIR / 'test_hatxoan.db'}")
os.environ.setdefault("LLM_API_KEY", "")
os.environ.setdefault("ENABLE_CHAT_MEMORY", "false")

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.main import app  # noqa: E402
from scripts.seed import run as run_seed  # noqa: E402


@pytest.fixture(scope="session", autouse=True)
def seeded_db() -> None:
    run_seed()


@pytest.fixture(scope="session")
def client() -> TestClient:
    with TestClient(app) as test_client:
        yield test_client
