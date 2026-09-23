"""LLM provider: Google Gemini (google-genai SDK) hoặc Extractive Fallback."""
from __future__ import annotations

from typing import List

from app.core.config import LLM_API_KEY, LLM_MODEL
from app.rag.retrievers import Chunk

# System prompt chuyên biệt về Hát Xoan
_SYSTEM_PROMPT = """Bạn là trợ lý AI chuyên về di sản văn hóa phi vật thể Hát Xoan Phú Thọ.
Hãy trả lời câu hỏi của người dùng DỰA TRÊN ngữ cảnh được cung cấp.
Nếu ngữ cảnh không đủ thông tin, hãy thành thật nói rằng bạn không có đủ thông tin và gợi ý người dùng tìm hiểu thêm tại các nguồn chính thức (UNESCO, Bộ VHTTDL, Sở VHTTDL Phú Thọ).
KHÔNG được bịa đặt thông tin về di sản. Trả lời bằng tiếng Việt, rõ ràng và thân thiện."""


def _build_context(chunks: List[Chunk]) -> str:
    parts = []
    for i, c in enumerate(chunks, 1):
        parts.append(f"[{i}] Nguồn: {c.source} — {c.title}\n{c.text}")
    return "\n\n".join(parts)


def _extractive_fallback(query: str, chunks: List[Chunk]) -> str:
    """Fallback khi không có API key: trả về đoạn phù hợp nhất."""
    if not chunks:
        return (
            "Xin lỗi, tôi không tìm thấy thông tin liên quan đến câu hỏi của bạn "
            "trong kho tư liệu hiện tại. Bạn có thể tìm hiểu thêm tại "
            "https://ich.unesco.org hoặc Cổng thông tin Du lịch Phú Thọ."
        )
    best = chunks[0]
    return f"{best.text}\n\n(Nguồn: {best.source})"


# Gemini 2.5+/3.x tính cả token "thinking" vào max_output_tokens,
# nên đặt dư rộng để phần trả lời hiển thị không bị cắt giữa chừng.
_MAX_OUTPUT_TOKENS = 4096


def _user_message(query: str, chunks: List[Chunk]) -> str:
    context = _build_context(chunks)
    return (
        f"Ngữ cảnh:\n{context}\n\nCâu hỏi: {query}"
        if chunks
        else f"Câu hỏi: {query}"
    )


_client = None

def _get_client():
    global _client
    if _client is None:
        from google import genai  # type: ignore
        _client = genai.Client(api_key=LLM_API_KEY)
    return _client


def _get_config():
    from google.genai import types  # type: ignore

    cfg_kwargs = {
        "system_instruction": _SYSTEM_PROMPT,
        "temperature": 0.3,
        "max_output_tokens": 1024,
    }
    # Tắt độ trễ thinking để trả token đầu tiên ngay lập tức (< 1s)
    try:
        cfg_kwargs["thinking_config"] = types.ThinkingConfig(thinking_budget=0)
    except Exception:
        pass

    return types.GenerateContentConfig(**cfg_kwargs)


def _genai_client_and_config():
    return _get_client(), _get_config()


async def generate_answer(query: str, chunks: List[Chunk]) -> str:
    """Sinh câu trả lời. Dùng Gemini nếu có API key, ngược lại dùng extractive."""
    if not LLM_API_KEY:
        return _extractive_fallback(query, chunks)

    try:
        client, config = _genai_client_and_config()
        response = await client.aio.models.generate_content(
            model=LLM_MODEL,
            contents=_user_message(query, chunks),
            config=config,
        )
        return response.text or ""

    except Exception as exc:  # noqa: BLE001
        # Fallback nếu API lỗi
        return (
            f"Rất tiếc, tôi gặp sự cố khi kết nối AI ({type(exc).__name__}). "
            "Vui lòng thử lại sau.\n\n"
            + _extractive_fallback(query, chunks)
        )


async def stream_answer(query: str, chunks: List[Chunk]):
    """Async generator: sinh câu trả lời từng mảnh để stream lên client."""
    if not LLM_API_KEY:
        yield _extractive_fallback(query, chunks)
        return

    try:
        client, config = _genai_client_and_config()
        stream = await client.aio.models.generate_content_stream(
            model=LLM_MODEL,
            contents=_user_message(query, chunks),
            config=config,
        )
        async for chunk in stream:
            if chunk.text:
                yield chunk.text
    except Exception as exc:  # noqa: BLE001
        yield (
            f"\n\nRất tiếc, tôi gặp sự cố khi kết nối AI ({type(exc).__name__}). "
            "Vui lòng thử lại sau."
        )
