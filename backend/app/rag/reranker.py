from __future__ import annotations

from typing import Protocol

from app.rag.retrievers import coverage
from app.rag.types import RetrievedChunk


class Reranker(Protocol):
    name: str

    def rerank(self, query: str, chunks: list[RetrievedChunk], k: int) -> list[RetrievedChunk]: ...


class KeywordOverlapReranker:
    """Rerank nhẹ: kết hợp điểm retrieval và độ phủ từ khoá.

    Interface giữ nguyên để sau này thay bằng cross-encoder (ví dụ bge-reranker)
    mà không phải sửa pipeline.
    """

    name = "keyword-overlap"

    def __init__(self, retrieval_weight: float = 0.45, coverage_weight: float = 0.55) -> None:
        self.retrieval_weight = retrieval_weight
        self.coverage_weight = coverage_weight

    def rerank(self, query: str, chunks: list[RetrievedChunk], k: int) -> list[RetrievedChunk]:
        for item in chunks:
            cov = coverage(query, item.chunk)
            item.debug["coverage"] = round(cov, 3)
            item.debug["retrieval"] = round(item.score, 3)
            item.score = self.retrieval_weight * item.score + self.coverage_weight * cov
        return sorted(chunks, key=lambda c: c.score, reverse=True)[:k]
