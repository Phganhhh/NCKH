from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

ASSET_TYPES = ("image", "video", "audio", "document", "ar_poster", "ar_video")


class Asset(Base):
    __tablename__ = "assets"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    song_id: Mapped[str | None] = mapped_column(ForeignKey("songs.id"), default=None, index=True)
    asset_type: Mapped[str] = mapped_column(String(32))
    url: Mapped[str | None] = mapped_column(String(512), default=None)
    source: Mapped[str | None] = mapped_column(String(512), default=None)
    author: Mapped[str | None] = mapped_column(String(255), default=None)
    license: Mapped[str | None] = mapped_column(String(255), default=None)
    description: Mapped[str | None] = mapped_column(Text, default=None)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    song: Mapped["Song | None"] = relationship(back_populates="assets")  # noqa: F821
