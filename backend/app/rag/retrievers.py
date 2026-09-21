"""Retriever layer.

Interface `Retriever` cho phép thay BM25 bằng pgvector/Qdrant sau này mà không
phải đổi pipeline. MVP mặc định dùng BM25 in-process (chạy được khi không có API key).
"""
from __future__ import annotations

import math
from collections import Counter
from functools import lru_cache
from typing import Protocol

from app.rag.knowledge_base import KnowledgeBase, get_knowledge_base
from app.rag.text import bigrams, content_tokens, tokenize
from app.rag.types import KBChunk, RetrievedChunk

K1 = 1.5
B = 0.75


class Retriever(Protocol):
    name: str

    def retrieve(self, query: str, k: int) -> list[RetrievedChunk]: ...


def _index_terms(text: str) -> list[str]:
    toks = tokenize(text)
    return toks + bigrams(toks)


class BM25Retriever:
    """BM25 thuần Python — đủ tốt cho KB vài chục chunk, không cần dependency."""

    name = "bm25"

    def __init__(self, kb: KnowledgeBase) -> None:
        self.chunks: list[KBChunk] = kb.chunks
        self.docs: list[Counter[str]] = [Counter(_index_terms(c.content + " " + c.title)) for c in self.chunks]
        self.lengths = [sum(d.values()) or 1 for d in self.docs]
        self.avg_len = sum(self.lengths) / len(self.lengths) if self.lengths else 1.0
        self.df: Counter[str] = Counter()
        for doc in self.docs:
            self.df.update(doc.keys())
        self.n = len(self.docs)

    def _idf(self, term: str) -> float:
        df = self.df.get(term, 0)
        return math.log(1 + (self.n - df + 0.5) / (df + 0.5))

    def score(self, query_terms: list[str], idx: int) -> float:
        doc, dl, total = self.docs[idx], self.lengths[idx], 0.0
        for term in query_terms:
            freq = doc.get(term, 0)
            if not freq:
                continue
            total += self._idf(term) * (freq * (K1 + 1)) / (freq + K1 * (1 - B + B * dl / self.avg_len))
        return total

    def retrieve(self, query: str, k: int) -> list[RetrievedChunk]:
        if not self.chunks:
            return []
        terms = _index_terms(query)
        scored = [(self.score(terms, i), i) for i in range(self.n)]
        scored = [s for s in scored if s[0] > 0]
        scored.sort(reverse=True)
        best = scored[0][0] if scored else 1.0
        return [
            RetrievedChunk(chunk=self.chunks[i], score=raw / best if best else 0.0, debug={"bm25": round(raw, 3)})
            for raw, i in scored[:k]
        ]


class EmbeddingRetriever:
    """Vector search qua embedding API (OpenAI-compatible). Chỉ bật khi có LLM_API_KEY.

    Embedding của KB được tính một lần lúc khởi tạo và giữ trong memory — phù hợp
    quy mô prototype. Khi KB lớn lên, thay class này bằng pgvector/Qdrant.
    """

    name = "embedding"

    def __init__(self, kb: KnowledgeBase, *, api_key: str, base_url: str, model: str) -> None:
        self.chunks = kb.chunks
        self.api_key, self.base_url, self.model = api_key, base_url.rstrip("/"), model
        self.vectors: list[list[float]] | None = None

    def _embed(self, texts: list[str]) -> list[list[float]]:
        import httpx

        resp = httpx.post(
            f"{self.base_url}/embeddings",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={"model": self.model, "input": texts},
            timeout=30.0,
        )
        resp.raise_for_status()
        return [item["embedding"] for item in resp.json()["data"]]

    def _ensure_index(self) -> None:
        if self.vectors is None:
            self.vectors = self._embed([c.title + "\n" + c.content for c in self.chunks]) if self.chunks else []

    @staticmethod
    def _cosine(a: list[float], b: list[float]) -> float:
        dot = sum(x * y for x, y in zip(a, b))
        na = math.sqrt(sum(x * x for x in a)) or 1.0
        nb = math.sqrt(sum(y * y for y in b)) or 1.0
        return dot / (na * nb)

    def retrieve(self, query: str, k: int) -> list[RetrievedChunk]:
        try:
            self._ensure_index()
            if not self.vectors:
                return []
            qv = self._embed([query])[0]
        except Exception:  # noqa: BLE001 - lỗi mạng/API không được làm sập chatbot
            return []
        scored = sorted(
            ((self._cosine(qv, v), i) for i, v in enumerate(self.vectors)), reverse=True
        )[:k]
        return [
            RetrievedChunk(chunk=self.chunks[i], score=float(s), debug={"cosine": round(float(s), 3)})
            for s, i in scored
        ]


class HybridRetriever:
    """Kết hợp nhiều retriever bằng Reciprocal Rank Fusion."""

    name = "hybrid"

    def __init__(self, retrievers: list[Retriever], rrf_k: int = 60) -> None:
        self.retrievers = retrievers
        self.rrf_k = rrf_k

    def retrieve(self, query: str, k: int) -> list[RetrievedChunk]:
        fused: dict[str, RetrievedChunk] = {}
        scores: dict[str, float] = {}
        for retriever in self.retrievers:
            for rank, item in enumerate(retriever.retrieve(query, k)):
                key = item.chunk.id
                scores[key] = scores.get(key, 0.0) + 1.0 / (self.rrf_k + rank + 1)
                if key not in fused:
                    fused[key] = item
                fused[key].debug[retriever.name] = round(item.score, 3)
        ranked = sorted(fused.values(), key=lambda c: scores[c.chunk.id], reverse=True)[:k]
        best = max((scores[c.chunk.id] for c in ranked), default=1.0) or 1.0
        for item in ranked:
            item.score = scores[item.chunk.id] / best
        return ranked


class CorpusStats:
    """Thống kê document-frequency của KB — dùng để chấm trọng số từ khoá."""

    def __init__(self, chunks: list[KBChunk]) -> None:
        self.n = max(len(chunks), 1)
        self.df: Counter[str] = Counter()
        for chunk in chunks:
            self.df.update(set(tokenize(chunk.content + " " + chunk.title)))

    def idf(self, term: str) -> float:
        """Từ không xuất hiện trong KB (df=0) có trọng số cao nhất -> câu hỏi chứa
        nhiều từ lạ sẽ bị coi là ngoài phạm vi."""
        return math.log(1 + self.n / (self.df.get(term, 0) + 0.5))


@lru_cache
def get_corpus_stats() -> CorpusStats:
    return CorpusStats(get_knowledge_base().chunks)


def coverage(query: str, chunk: KBChunk) -> float:
    """Độ phủ có trọng số IDF của câu hỏi trong chunk.

    Đây là tín hiệu *tuyệt đối* (không phụ thuộc ranking) nên dùng được làm ngưỡng
    phát hiện câu hỏi ngoài phạm vi / không có trong Knowledge Base.
    """
    q_terms = set(content_tokens(query))
    if not q_terms:
        return 0.0
    stats = get_corpus_stats()
    doc_terms = set(tokenize(chunk.content + " " + chunk.title))
    matched = sum(stats.idf(t) for t in q_terms if t in doc_terms)
    total = sum(stats.idf(t) for t in q_terms) or 1.0
    return matched / total
