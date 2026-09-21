from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.asset import Asset
from app.models.song import Song
from app.repositories.asset_repository import AssetRepository
from app.repositories.song_repository import SongRepository


class SongNotFoundError(Exception):
    pass


class SongService:
    def __init__(self, db: Session) -> None:
        self.songs = SongRepository(db)
        self.assets = AssetRepository(db)

    def list_songs(self, *, q: str | None = None, category: str | None = None, limit: int = 50) -> list[Song]:
        return self.songs.list(q=q, category=category, limit=limit)

    def get_song(self, id_or_slug: str) -> Song:
        song = self.songs.get(id_or_slug)
        if song is None:
            raise SongNotFoundError(id_or_slug)
        return song

    def list_assets(self, id_or_slug: str) -> list[Asset]:
        song = self.get_song(id_or_slug)
        return self.assets.list_by_song(song.id)
