"""RAG pipeline: Query -> Hybrid Retrieval -> Rerank -> Top-K -> Prompt -> LLM -> Answer."""
from __future__ import annotations

from functools import lru_cache

from app.core.config import get_settings
from app.llm.extractive import ExtractiveProvider
from app.llm.factory import get_llm_provider
from app.prompts.chatbot import (
    NO_DATA_MESSAGE,
    OUT_OF_SCOPE_MESSAGE,
    SYSTEM_PROMPT,
    build_user_prompt,
)
from app.rag.knowledge_base import get_knowledge_base
from app.rag.reranker import KeywordOverlapReranker, Reranker
from app.rag.retrievers import BM25Retriever, EmbeddingRetriever, HybridRetriever, Retriever
from app.rag.types import RagResult, RetrievedChunk

OUT_OF_SCOPE_COVERAGE = 0.2

LLM_ERROR_MESSAGE = (
    "Xin lỗi, hiện tôi không kết nối được tới mô hình ngôn ngữ. "
    "Bạn thử lại sau ít phút nhé — nội dung trên website vẫn xem được bình thường."
)


def build_retriever() -> Retriever:
    settings = get_settings()
    kb = get_knowledge_base()
    retrievers: list[Retriever] = [BM25Retriever(kb)]
    if settings.llm_enabled and settings.embedding_model:
        retrievers.append(
            EmbeddingRetriever(
                kb,
                api_key=settings.llm_api_key,
                base_url=settings.llm_base_url,
                model=settings.embedding_model,
            )
        )
    return retrievers[0] if len(retrievers) == 1 else HybridRetriever(retrievers)


class RagPipeline:
    def __init__(self, retriever: Retriever, reranker: Reranker) -> None:
        self.retriever = retriever
        self.reranker = reranker
        self.settings = get_settings()

    def retrieve(self, question: str) -> list[RetrievedChunk]:
        candidates = self.retriever.retrieve(question, self.settings.rag_candidates)
        return self.reranker.rerank(question, candidates, self.settings.rag_top_k)

    def answer(self, question: str) -> RagResult:
        provider = get_llm_provider()
        chunks = self.retrieve(question)

        if not chunks:
            return RagResult(OUT_OF_SCOPE_MESSAGE, [], grounded=False, provider=provider.name)

        top = chunks[0]
        top_coverage = top.debug.get("coverage", 0.0)

        # Ngưỡng 1 — coverage có trọng số IDF: câu hỏi chứa nhiều từ khoá không tồn tại
        # trong KB (ví dụ "Bitcoin") sẽ bị coi là ngoài phạm vi.
        if top_coverage < self.settings.rag_min_coverage:
            message = OUT_OF_SCOPE_MESSAGE if top_coverage < OUT_OF_SCOPE_COVERAGE else NO_DATA_MESSAGE
            return RagResult(message, [], grounded=False, provider=provider.name)

        # Ngưỡng 2 — điểm tổng hợp sau rerank.
        if top.score < self.settings.rag_min_score:
            return RagResult(NO_DATA_MESSAGE, [], grounded=False, provider=provider.name)

        if isinstance(provider, ExtractiveProvider):
            return RagResult(
                provider.answer_from_context(question, chunks),
                chunks,
                grounded=True,
                provider=provider.name,
            )

        try:
            answer = provider.complete(SYSTEM_PROMPT, build_user_prompt(question, chunks))
        except Exception:  # noqa: BLE001 - lỗi LLM không được làm sập API
            return RagResult(LLM_ERROR_MESSAGE, chunks, grounded=False, provider=provider.name)
        return RagResult(answer, chunks, grounded=True, provider=provider.name)


@lru_cache
def get_pipeline() -> RagPipeline:
    return RagPipeline(retriever=build_retriever(), reranker=KeywordOverlapReranker())
