"""BM25 retriever — đọc data/knowledge/*.md lúc khởi động, truy vấn offline."""
from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import List

from rank_bm25 import BM25Okapi

from app.core.config import KNOWLEDGE_DIR, RAG_TOP_K, RAG_MIN_SCORE

# Section nhỏ hơn ngưỡng này sẽ được gộp với các section cùng file
_SMALL_SECTION = 500
# Giới hạn độ dài của một chunk sau gộp
_MAX_MERGED = 1200


@dataclass
class Chunk:
    text: str
    source: str          # tên file .md
    title: str           # dòng heading đầu tiên hoặc tên file
    score: float = 0.0


def _tokenize(text: str) -> List[str]:
    """Tokenize đơn giản: lowercase, tách từ (hỗ trợ tiếng Việt có dấu)."""
    text = text.lower()
    return re.findall(r"[\wÀ-ỹ]+", text)


def _load_chunks(knowledge_dir: Path) -> List[Chunk]:
    """Đọc tất cả .md trong knowledge_dir, tách thành các đoạn theo heading.

    Các section nhỏ (< _SMALL_SECTION ký tự) cùng file được gộp lại thành một
    chunk để ngữ cảnh truy xuất trọn vẹn (ví dụ đủ cả 3 chặng Hát Xoan).
    """
    chunks: List[Chunk] = []
    if not knowledge_dir.exists():
        return chunks

    for md_file in sorted(knowledge_dir.glob("*.md")):
        text = md_file.read_text(encoding="utf-8")
        # Bỏ phần YAML front matter (---...---) nếu có
        text = re.sub(r"^---[\s\S]*?---\n", "", text, count=1)

        # Tách theo heading (#, ##, ###)
        sections = re.split(r"(?m)^#{1,3}\s+", text)
        headings = [""] + re.findall(r"(?m)^#{1,3}\s+(.*)", text)

        buffer: List[tuple] = []
        buf_len = 0

        def flush() -> None:
            nonlocal buffer, buf_len
            if not buffer:
                return
            merged = "\n\n".join(
                f"## {h}\n{c}" if h else c for h, c in buffer
            ).strip()
            if len(merged) >= 30:
                chunks.append(
                    Chunk(
                        text=merged,
                        source=md_file.name,
                        title=next((h for h, _ in buffer if h), "").strip()
                        or md_file.stem,
                    )
                )
            buffer, buf_len = [], 0

        for heading, section in zip(headings, sections):
            content = section.strip()
            if not content:
                continue
            if len(content) >= _SMALL_SECTION:
                flush()
                if len(content) >= 30:  # bỏ đoạn quá ngắn
                    chunks.append(
                        Chunk(
                            text=content,
                            source=md_file.name,
                            title=heading.strip() or md_file.stem,
                        )
                    )
                continue
            if buf_len + len(content) > _MAX_MERGED:
                flush()
            buffer.append((heading.strip(), content))
            buf_len += len(content)
        flush()

    return chunks


class BM25Retriever:
    def __init__(self, knowledge_dir: Path = KNOWLEDGE_DIR) -> None:
        self._chunks = _load_chunks(knowledge_dir)
        if self._chunks:
            tokenized = [_tokenize(c.text) for c in self._chunks]
            self._bm25 = BM25Okapi(tokenized)
        else:
            self._bm25 = None

    def retrieve(
        self, query: str, top_k: int = RAG_TOP_K, min_score: float = RAG_MIN_SCORE
    ) -> List[Chunk]:
        if not self._bm25 or not self._chunks:
            return []

        tokens = _tokenize(query)
        scores = self._bm25.get_scores(tokens)

        # Ghép điểm vào chunk
        scored = [
            Chunk(text=c.text, source=c.source, title=c.title, score=float(s))
            for c, s in zip(self._chunks, scores)
        ]
        scored.sort(key=lambda x: x.score, reverse=True)

        # Lọc theo ngưỡng và giới hạn top-k
        return [c for c in scored[:top_k] if c.score >= min_score]


# Singleton — khởi tạo 1 lần khi import
_retriever: BM25Retriever | None = None


def get_retriever() -> BM25Retriever:
    global _retriever
    if _retriever is None:
        _retriever = BM25Retriever()
    return _retriever
