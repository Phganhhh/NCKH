"""Chat service — orchestrate RAG pipeline: retrieve → generate → return."""
from __future__ import annotations

import logging
import time
from dataclasses import dataclass
from typing import List

from app.llm.provider import generate_answer, stream_answer
from app.rag.retrievers import Chunk, get_retriever
from app.core.config import RAG_TOP_K

logger = logging.getLogger(__name__)


@dataclass
class ChatResult:
    answer: str
    sources: List[dict]
    conversation_id: str


def _build_sources(chunks: List[Chunk]) -> List[dict]:
    seen: set[str] = set()
    sources = []
    for c in chunks:
        if c.source not in seen:
            seen.add(c.source)
            sources.append({"title": c.title, "source": c.source, "score": round(c.score, 3)})
    return sources


async def chat(message: str, conversation_id: str) -> ChatResult:
    """
    Pipeline:
    1. BM25 retrieval từ Knowledge Base.
    2. Gọi LLM (hoặc extractive fallback) với context.
    3. Trả về answer + sources.
    """
    t0 = time.perf_counter()
    logger.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    logger.info("[CHAT] conv_id=%s", conversation_id)
    logger.info("[CHAT] query   = %s", message)

    # --- Bước 1: Retrieval ---
    retriever = get_retriever()
    chunks: List[Chunk] = retriever.retrieve(message, top_k=RAG_TOP_K)
    t_retrieve = time.perf_counter()
    logger.info("[RAG]  retrieved %d chunks in %.3fs", len(chunks), t_retrieve - t0)
    for i, c in enumerate(chunks, 1):
        logger.info("[RAG]  chunk[%d] score=%.3f src=%s", i, c.score, c.source)

    # --- Bước 2: LLM Generation ---
    answer = await generate_answer(message, chunks)
    t_llm = time.perf_counter()
    logger.info("[LLM]  generated answer in %.3fs", t_llm - t_retrieve)
    logger.info("[LLM]  answer preview: %s…", answer[:120].replace('\n', ' '))

    # --- Bước 3: Build sources ---
    sources = _build_sources(chunks)

    logger.info("[CHAT] total latency=%.3fs, sources=%s", time.perf_counter() - t0, [s["source"] for s in sources])
    logger.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

    return ChatResult(
        answer=answer,
        sources=sources,
        conversation_id=conversation_id,
    )


async def stream_chat(message: str, conversation_id: str):
    """
    Pipeline streaming — yield từng sự kiện dict:
    {"type":"meta", conversation_id, sources} → {"type":"delta","text"}... → {"type":"done"}
    """
    t0 = time.perf_counter()
    logger.info("[CHAT-STREAM] conv_id=%s query=%s", conversation_id, message)

    retriever = get_retriever()
    chunks: List[Chunk] = retriever.retrieve(message, top_k=RAG_TOP_K)
    logger.info("[RAG]  retrieved %d chunks", len(chunks))

    yield {
        "type": "meta",
        "conversation_id": conversation_id,
        "sources": _build_sources(chunks),
    }
    async for delta in stream_answer(message, chunks):
        yield {"type": "delta", "text": delta}

    logger.info("[CHAT-STREAM] done in %.3fs", time.perf_counter() - t0)
    yield {"type": "done"}

