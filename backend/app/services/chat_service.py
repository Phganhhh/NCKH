from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.conversation import Conversation, Message
from app.rag.pipeline import get_pipeline
from app.schemas.chat import ChatRequest, ChatResponse, ChatSource


class ChatService:
    """Điều phối: (tuỳ chọn) lưu memory -> chạy RAG -> trả answer + sources."""

    def __init__(self, db: Session | None = None) -> None:
        self.db = db
        self.settings = get_settings()
        self.pipeline = get_pipeline()

    def _persist(self, conversation_id: str, question: str, answer: str) -> None:
        if not (self.settings.enable_chat_memory and self.db):
            return
        conversation = self.db.get(Conversation, conversation_id)
        if conversation is None:
            conversation = Conversation(id=conversation_id, session_id=conversation_id)
            self.db.add(conversation)
        conversation.updated_at = datetime.now(timezone.utc)
        self.db.add(Message(id=uuid.uuid4().hex, conversation_id=conversation_id, role="user", content=question))
        self.db.add(
            Message(id=uuid.uuid4().hex, conversation_id=conversation_id, role="assistant", content=answer)
        )
        self.db.commit()

    def ask(self, payload: ChatRequest) -> ChatResponse:
        conversation_id = payload.conversation_id or uuid.uuid4().hex
        result = self.pipeline.answer(payload.message.strip())
        self._persist(conversation_id, payload.message.strip(), result.answer)

        sources = [
            ChatSource(
                title=item.chunk.title,
                source=item.chunk.source,
                topic=item.chunk.topic,
                song_id=item.chunk.song_id,
                score=round(item.score, 3),
            )
            for item in result.sources
        ]
        # Loại nguồn trùng tiêu đề (chunk cùng document) để UI gọn hơn.
        unique: dict[str, ChatSource] = {}
        for source in sources:
            unique.setdefault(source.title, source)

        return ChatResponse(
            answer=result.answer,
            conversation_id=conversation_id,
            sources=list(unique.values()),
            grounded=result.grounded,
            provider=result.provider,
        )
