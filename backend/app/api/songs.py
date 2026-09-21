from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.asset import AssetListResponse, AssetOut
from app.schemas.song import SongDetail, SongListResponse, SongSummary
from app.services.song_service import SongNotFoundError, SongService

router = APIRouter(prefix="/api/songs", tags=["songs"])


@router.get("", response_model=SongListResponse)
def list_songs(
    q: str | None = Query(default=None, description="Tìm theo tiêu đề/mô tả"),
    category: str | None = Query(default=None),
    limit: int = Query(default=50, ge=1, le=100),
    db: Session = Depends(get_db),
) -> SongListResponse:
    songs = SongService(db).list_songs(q=q, category=category, limit=limit)
    items = [SongSummary.model_validate(s) for s in songs]
    return SongListResponse(items=items, total=len(items))


@router.get("/{id_or_slug}", response_model=SongDetail)
def get_song(id_or_slug: str, db: Session = Depends(get_db)) -> SongDetail:
    try:
        song = SongService(db).get_song(id_or_slug)
    except SongNotFoundError:
        raise HTTPException(status_code=404, detail="Song not found") from None
    return SongDetail.model_validate(song)


@router.get("/{id_or_slug}/assets", response_model=AssetListResponse)
def list_song_assets(id_or_slug: str, db: Session = Depends(get_db)) -> AssetListResponse:
    try:
        assets = SongService(db).list_assets(id_or_slug)
    except SongNotFoundError:
        raise HTTPException(status_code=404, detail="Song not found") from None
    items = [AssetOut.model_validate(a) for a in assets]
    return AssetListResponse(items=items, total=len(items))
