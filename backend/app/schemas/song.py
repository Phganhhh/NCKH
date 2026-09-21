from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.schemas.asset import AssetOut


class SongBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    slug: str
    title: str
    category: str | None = None
    short_description: str | None = None
    thumbnail_url: str | None = None
    status: str = "published"


class SongSummary(SongBase):
    """Dùng cho danh sách / card."""


class SongDetail(SongBase):
    description: str | None = None
    lyrics: str | None = None
    cultural_info: str | None = None
    performance_info: str | None = None
    video_url: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None
    assets: list[AssetOut] = []


class SongListResponse(BaseModel):
    items: list[SongSummary]
    total: int
