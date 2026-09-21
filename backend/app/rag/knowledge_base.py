"""Global Knowledge Base — MỘT KB duy nhất cho toàn bộ Hát Xoan.

Mỗi file .md trong data/knowledge/ có front-matter:
    ---
    id: kb_001
    title: ...
    topic: ...
    song_id: ...
    source: ...
    ---
Metadata chỉ phục vụ filtering/citation/evaluation, KHÔNG tách thành nhiều KB.
"""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from app.core.config import get_settings
from app.rag.chunker import chunk_document
from app.rag.types import KBChunk


def parse_front_matter(raw: str) -> tuple[dict[str, str], str]:
    if not raw.startswith("---"):
        return {}, raw
    parts = raw.split("---", 2)
    if len(parts) < 3:
        return {}, raw
    meta: dict[str, str] = {}
    for line in parts[1].strip().splitlines():
        if ":" not in line:
            continue
        key, _, value = line.partition(":")
        meta[key.strip()] = value.strip()
    return meta, parts[2].strip()


def load_chunks(knowledge_dir: Path) -> list[KBChunk]:
    chunks: list[KBChunk] = []
    if not knowledge_dir.exists():
        return chunks
    for path in sorted(knowledge_dir.glob("*.md")):
        meta, body = parse_front_matter(path.read_text(encoding="utf-8"))
        if not body:
            continue
        chunks.extend(
            chunk_document(
                doc_id=meta.get("id") or path.stem,
                title=meta.get("title") or path.stem,
                body=body,
                topic=meta.get("topic") or None,
                song_id=meta.get("song_id") or None,
                source=meta.get("source") or None,
            )
        )
    return chunks


class KnowledgeBase:
    def __init__(self, chunks: list[KBChunk]) -> None:
        self.chunks = chunks

    def __len__(self) -> int:
        return len(self.chunks)

    def by_topic(self, topic: str) -> list[KBChunk]:
        return [c for c in self.chunks if c.topic == topic]

    def by_song(self, song_id: str) -> list[KBChunk]:
        return [c for c in self.chunks if c.song_id == song_id]


@lru_cache
def get_knowledge_base() -> KnowledgeBase:
    return KnowledgeBase(load_chunks(get_settings().knowledge_dir))
