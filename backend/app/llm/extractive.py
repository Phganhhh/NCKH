"""Fallback provider: không cần API key.

Ghép các đoạn KB liên quan nhất thành câu trả lời trích xuất. Nhờ vậy toàn bộ
pipeline RAG (retrieval → rerank → citation) vẫn demo được khi chưa cấu hình LLM.
"""
from __future__ import annotations

from app.rag.types import RetrievedChunk

PLACEHOLDER_NOTE = (
    "Lưu ý: phần nội dung liên quan trong Knowledge Base hiện là nội dung tạm "
    "([PLACEHOLDER]) và đang chờ bổ sung từ nguồn được xác minh."
)

FOOTER = (
    "\n\n_(Chế độ trích xuất: chưa cấu hình LLM_API_KEY nên câu trả lời được tổng hợp "
    "trực tiếp từ Knowledge Base thay vì diễn đạt lại bằng mô hình ngôn ngữ.)_"
)


class ExtractiveProvider:
    name = "extractive-fallback"

    def __init__(self, max_chunks: int = 3) -> None:
        self.max_chunks = max_chunks

    def complete(self, system_prompt: str, user_prompt: str) -> str:  # pragma: no cover - không dùng
        raise NotImplementedError("ExtractiveProvider dùng answer_from_context()")

    def answer_from_context(self, question: str, chunks: list[RetrievedChunk]) -> str:
        selected = chunks[: self.max_chunks]
        if not selected:
            return "Chưa có dữ liệu phù hợp trong Knowledge Base."

        parts: list[str] = []
        has_placeholder = False
        for item in selected:
            if item.chunk.is_placeholder:
                has_placeholder = True
            text = item.chunk.content.strip()
            parts.append(f"**{item.chunk.title}**\n{text}")

        answer = "Dựa trên Knowledge Base về Hát Xoan:\n\n" + "\n\n".join(parts)
        if has_placeholder:
            answer += f"\n\n{PLACEHOLDER_NOTE}"
        return answer + FOOTER
