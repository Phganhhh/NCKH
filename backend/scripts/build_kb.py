"""Kiểm tra Global Knowledge Base: số chunk, phân bố topic, cảnh báo placeholder."""
from __future__ import annotations

from collections import Counter

from app.core.config import get_settings
from app.rag.knowledge_base import get_knowledge_base


def run() -> int:
    settings = get_settings()
    kb = get_knowledge_base()
    print(f"[kb] Thư mục: {settings.knowledge_dir}")
    print(f"[kb] Tổng số chunk: {len(kb)}")

    topics = Counter(c.topic or "(none)" for c in kb.chunks)
    for topic, count in topics.most_common():
        print(f"  - topic={topic}: {count}")

    songs = Counter(c.song_id for c in kb.chunks if c.song_id)
    for song_id, count in songs.most_common():
        print(f"  - song_id={song_id}: {count}")

    placeholders = [c.id for c in kb.chunks if c.is_placeholder]
    print(f"[kb] Chunk còn PLACEHOLDER: {len(placeholders)}")
    for chunk_id in placeholders:
        print(f"  ! {chunk_id}")
    return 0


if __name__ == "__main__":
    raise SystemExit(run())
