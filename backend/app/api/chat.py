"""FastAPI router cho /api/chat."""
from __future__ import annotations

import json
import uuid
from typing import List, Optional

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.services.chat_service import chat, stream_chat

router = APIRouter(prefix="/api", tags=["chat"])


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    conversation_id: Optional[str] = None


class SourceItem(BaseModel):
    title: str
    source: str
    score: float


class ChatResponse(BaseModel):
    answer: str
    conversation_id: str
    sources: List[SourceItem]


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(body: ChatRequest) -> ChatResponse:
    conv_id = body.conversation_id or str(uuid.uuid4())
    result = await chat(message=body.message, conversation_id=conv_id)
    return ChatResponse(
        answer=result.answer,
        conversation_id=result.conversation_id,
        sources=[SourceItem(**s) for s in result.sources],
    )


@router.post("/chat/stream")
async def chat_stream_endpoint(body: ChatRequest) -> StreamingResponse:
    """SSE stream: meta → delta... → done."""
    conv_id = body.conversation_id or str(uuid.uuid4())

    async def event_stream():
        async for event in stream_chat(message=body.message, conversation_id=conv_id):
            payload = json.dumps(event, ensure_ascii=False)
            yield f"event: {event['type']}\ndata: {payload}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
