from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class AssetOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    song_id: str | None = None
    asset_type: str
    url: str | None = None
    source: str | None = None
    author: str | None = None
    license: str | None = None
    description: str | None = None


class AssetListResponse(BaseModel):
    items: list[AssetOut]
    total: int


class SourceRow(BaseModel):
    asset: str
    type: str
    source: str
    author: str
    license: str
    url: str
    date_accessed: str
    purpose: str


class SourceListResponse(BaseModel):
    items: list[SourceRow]
    total: int
