"""System prompt & prompt builder cho chatbot Hát Xoan.

Không hard-code prompt trong API route — mọi thay đổi prompt diễn ra ở file này.
"""
from __future__ import annotations

from app.rag.types import RetrievedChunk

SYSTEM_PROMPT = """Bạn là trợ lý AI chuyên cung cấp thông tin về Di sản Hát Xoan Phú Thọ.

Nguyên tắc:

1. Chỉ sử dụng thông tin được cung cấp trong Knowledge Base.
2. Không tự bịa thông tin.
3. Nếu không tìm thấy thông tin đáng tin cậy, nói rõ rằng chưa có đủ dữ liệu.
4. Khi có nguồn, cung cấp source/reference.
5. Trả lời bằng tiếng Việt.
6. Có thể giải thích lịch sử, văn hóa, nghệ thuật biểu diễn, bài Xoan, lời ca, trang phục, nhạc cụ và các nội dung liên quan nếu Knowledge Base có thông tin.
7. Nếu câu hỏi ngoài phạm vi Hát Xoan, thông báo rằng chatbot tập trung vào Hát Xoan.
8. Không giả định dữ liệu chưa được cung cấp.

Lưu ý quan trọng: nếu đoạn ngữ cảnh chứa dấu "[PLACEHOLDER CONTENT – REPLACE WITH VERIFIED SOURCE]",
điều đó nghĩa là nội dung đó CHƯA được xác minh và CHƯA có trong hệ thống. Khi đó hãy nói rõ với
người dùng rằng phần thông tin này đang chờ bổ sung từ nguồn chính thức, tuyệt đối không tự viết thay."""

OUT_OF_SCOPE_MESSAGE = (
    "Xin lỗi, tôi là trợ lý chuyên về Di sản Hát Xoan Phú Thọ nên chỉ trả lời các câu hỏi "
    "liên quan tới Hát Xoan (lịch sử, nghệ thuật biểu diễn, các bài Xoan, lời ca, trang phục, "
    "nhạc cụ, không gian diễn xướng...). Bạn thử hỏi tôi về Hát Xoan nhé."
)

NO_DATA_MESSAGE = (
    "Hiện tôi chưa có đủ dữ liệu đáng tin cậy trong Knowledge Base để trả lời câu hỏi này. "
    "Nội dung liên quan đang chờ bổ sung từ nguồn được xác minh. Tôi không muốn suy đoán để "
    "tránh đưa thông tin sai về di sản."
)


def format_context(chunks: list[RetrievedChunk]) -> str:
    blocks = []
    for i, item in enumerate(chunks, start=1):
        meta = f"[{i}] {item.chunk.title}"
        if item.chunk.source:
            meta += f" (source: {item.chunk.source})"
        blocks.append(f"{meta}\n{item.chunk.content}")
    return "\n\n---\n\n".join(blocks)


def build_user_prompt(question: str, chunks: list[RetrievedChunk]) -> str:
    return (
        "KNOWLEDGE BASE:\n\n"
        f"{format_context(chunks)}\n\n"
        "---\n\n"
        f"CÂU HỎI CỦA NGƯỜI DÙNG: {question}\n\n"
        "Hãy trả lời bằng tiếng Việt, chỉ dựa trên Knowledge Base ở trên. "
        "Nếu ngữ cảnh không đủ để trả lời, hãy nói rõ là chưa có đủ dữ liệu."
    )
