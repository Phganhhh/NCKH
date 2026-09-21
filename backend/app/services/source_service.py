from __future__ import annotations

import csv

from app.core.config import get_settings
from app.schemas.asset import SourceRow


def list_sources() -> list[SourceRow]:
    """Đọc data/sources/asset_sources.csv cho trang /sources."""
    path = get_settings().sources_csv
    if not path.exists():
        return []
    with path.open(encoding="utf-8", newline="") as handle:
        return [
            SourceRow(
                asset=row.get("Asset", ""),
                type=row.get("Type", ""),
                source=row.get("Source", ""),
                author=row.get("Author", ""),
                license=row.get("License", ""),
                url=row.get("URL", ""),
                date_accessed=row.get("Date Accessed", ""),
                purpose=row.get("Purpose", ""),
            )
            for row in csv.DictReader(handle)
        ]
