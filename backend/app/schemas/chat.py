from __future__ import annotations

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    conversation_id: str | None = None


class ChatSource(BaseModel):
    title: str
    source: str | None = None
    topic: str | None = None
    song_id: str | None = None
    score: float | None = None


class ChatResponse(BaseModel):
    answer: str
    conversation_id: str
    sources: list[ChatSource] = []
    grounded: bool = True
    provider: str = "unknown"


class HealthResponse(BaseModel):
    status: str
    database: str
    llm_provider: str
    kb_chunks: int
