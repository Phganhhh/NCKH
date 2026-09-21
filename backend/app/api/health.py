from __future__ import annotations

from fastapi import APIRouter
from sqlalchemy import text

from app.db.session import engine
from app.llm.factory import get_llm_provider
from app.rag.knowledge_base import get_knowledge_base
from app.schemas.chat import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        database = "connected"
    except Exception:  # noqa: BLE001
        database = "unavailable"
    return HealthResponse(
        status="ok",
        database=database,
        llm_provider=get_llm_provider().name,
        kb_chunks=len(get_knowledge_base()),
    )
