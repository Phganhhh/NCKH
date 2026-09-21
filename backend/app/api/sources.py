from __future__ import annotations

from fastapi import APIRouter

from app.schemas.asset import SourceListResponse
from app.services.source_service import list_sources

router = APIRouter(prefix="/api/sources", tags=["sources"])


@router.get("", response_model=SourceListResponse)
def get_sources() -> SourceListResponse:
    items = list_sources()
    return SourceListResponse(items=items, total=len(items))
