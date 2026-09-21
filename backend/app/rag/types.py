from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class KBChunk:
    """Một đơn vị nội dung trong Global Knowledge Base."""

    id: str
    content: str
    title: str
    topic: str | None = None
    song_id: str | None = None
    source: str | None = None
    doc_id: str | None = None

    @property
    def is_placeholder(self) -> bool:
        return "[PLACEHOLDER CONTENT" in self.content


@dataclass
class RetrievedChunk:
    chunk: KBChunk
    score: float
    debug: dict[str, float] = field(default_factory=dict)


@dataclass
class RagResult:
    answer: str
    sources: list[RetrievedChunk]
    grounded: bool
    provider: str
