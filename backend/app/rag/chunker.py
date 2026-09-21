from __future__ import annotations

from app.rag.types import KBChunk

MAX_CHARS = 800


def split_paragraphs(body: str) -> list[str]:
    return [p.strip() for p in body.split("\n\n") if p.strip()]


def chunk_document(
    *,
    doc_id: str,
    title: str,
    body: str,
    topic: str | None = None,
    song_id: str | None = None,
    source: str | None = None,
) -> list[KBChunk]:
    """Gộp các đoạn liền kề tới khi chạm MAX_CHARS -> chunk giữ nguyên ngữ cảnh đoạn."""
    chunks: list[KBChunk] = []
    buffer: list[str] = []
    length = 0

    def flush() -> None:
        nonlocal buffer, length
        if not buffer:
            return
        chunks.append(
            KBChunk(
                id=f"{doc_id}#{len(chunks) + 1}",
                content="\n\n".join(buffer),
                title=title,
                topic=topic,
                song_id=song_id,
                source=source,
                doc_id=doc_id,
            )
        )
        buffer, length = [], 0

    for para in split_paragraphs(body):
        if length + len(para) > MAX_CHARS and buffer:
            flush()
        buffer.append(para)
        length += len(para)
    flush()
    return chunks
