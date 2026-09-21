from __future__ import annotations

from app.db.base import Base
from app.db.session import engine
from app.models import asset, conversation, song  # noqa: F401  (đăng ký metadata)


def init_db() -> None:
    """Tạo bảng nếu chưa tồn tại. Prototype dùng create_all thay cho Alembic."""
    Base.metadata.create_all(bind=engine)
