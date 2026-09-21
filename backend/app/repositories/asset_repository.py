from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.asset import Asset


class AssetRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_by_song(self, song_id: str) -> list[Asset]:
        stmt = select(Asset).where(Asset.song_id == song_id).order_by(Asset.id)
        return list(self.db.execute(stmt).scalars().all())

    def upsert(self, asset: Asset) -> Asset:
        merged = self.db.merge(asset)
        self.db.flush()
        return merged
