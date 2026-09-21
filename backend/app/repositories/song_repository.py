from __future__ import annotations

from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.models.song import Song


class SongRepository:
    """Lớp truy cập dữ liệu — service không được query trực tiếp."""

    def __init__(self, db: Session) -> None:
        self.db = db

    def list(self, *, q: str | None = None, category: str | None = None, limit: int = 50) -> list[Song]:
        stmt = select(Song).where(Song.status == "published")
        if q:
            pattern = f"%{q.strip()}%"
            stmt = stmt.where(or_(Song.title.ilike(pattern), Song.short_description.ilike(pattern)))
        if category:
            stmt = stmt.where(Song.category == category)
        stmt = stmt.order_by(Song.id).limit(limit)
        return list(self.db.execute(stmt).scalars().all())

    def get(self, id_or_slug: str) -> Song | None:
        stmt = select(Song).where(or_(Song.id == id_or_slug, Song.slug == id_or_slug))
        return self.db.execute(stmt).scalars().first()

    def upsert(self, song: Song) -> Song:
        merged = self.db.merge(song)
        self.db.flush()
        return merged
