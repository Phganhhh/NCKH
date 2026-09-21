from __future__ import annotations

from functools import lru_cache

from app.core.config import get_settings
from app.llm.extractive import ExtractiveProvider
from app.llm.openai_compatible import OpenAICompatibleProvider


@lru_cache
def get_llm_provider() -> ExtractiveProvider | OpenAICompatibleProvider:
    settings = get_settings()
    if settings.llm_enabled:
        return OpenAICompatibleProvider(
            api_key=settings.llm_api_key,
            base_url=settings.llm_base_url,
            model=settings.llm_model,
        )
    return ExtractiveProvider()
