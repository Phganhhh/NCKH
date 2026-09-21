"""Nạp seed data (idempotent) từ data/seed/*.json vào database."""
from __future__ import annotations

import json
import sys

from app.core.config import get_settings
from app.db.init_db import init_db
from app.db.session import SessionLocal
from app.models.asset import Asset
from app.models.song import Song
from app.repositories.asset_repository import AssetRepository
from app.repositories.song_repository import SongRepository


def run() -> int:
    settings = get_settings()
    songs_file = settings.seed_dir / "songs.json"
    assets_file = settings.seed_dir / "assets.json"

    if not songs_file.exists():
        print(f"[seed] Không tìm thấy {songs_file}", file=sys.stderr)
        return 1

    init_db()
    songs = json.loads(songs_file.read_text(encoding="utf-8"))
    assets = json.loads(assets_file.read_text(encoding="utf-8")) if assets_file.exists() else []

    with SessionLocal() as db:
        song_repo, asset_repo = SongRepository(db), AssetRepository(db)
        for row in songs:
            song_repo.upsert(Song(**row))
        for row in assets:
            asset_repo.upsert(Asset(**row))
        db.commit()

    print(f"[seed] OK — {len(songs)} songs, {len(assets)} assets → {settings.database_url}")
    return 0


if __name__ == "__main__":
    raise SystemExit(run())
