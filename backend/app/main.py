from __future__ import annotations

import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import CORS_ORIGINS
from app.rag.retrievers import get_retriever

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    # Khởi tạo BM25 retriever lúc startup
    try:
        retriever = get_retriever()
        logger.info(
            "Knowledge Base loaded: %d chunks from data/knowledge/",
            len(retriever._chunks),
        )
    except Exception as exc:
        logger.warning("Could not load Knowledge Base: %s", exc)
    yield


app = FastAPI(
    title="Hát Xoan Digital API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — cho phép frontend (Next.js port 3000, static server port 8080)
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
from app.api.chat import router as chat_router  # noqa: E402

app.include_router(chat_router)

# Import các router khác nếu có (songs, health, sources) — bỏ qua nếu chưa có source
_optional_routers = [
    ("app.api.songs", "router"),
    ("app.api.health", "router"),
    ("app.api.sources", "router"),
]
for _module, _attr in _optional_routers:
    try:
        import importlib
        _mod = importlib.import_module(_module)
        app.include_router(getattr(_mod, _attr))
        logger.info("Router %s loaded.", _module)
    except Exception:
        pass  # router chưa có source file — bỏ qua


@app.get("/")
def root() -> dict:
    return {"service": "Hat Xoan Digital API", "version": "1.0.0", "status": "ok"}
