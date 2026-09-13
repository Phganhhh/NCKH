def build_prompt(context: str, query: str) -> str:
    """Xây dựng prompt gửi cho Gemini."""
    return f"""Dựa vào thông tin sau để trả lời ngắn gọn về Hát Xoan.
Nếu không có thông tin, hãy trả lời 'Tư liệu chưa cập nhật'.

Context:
{context}

Câu hỏi: {query}

Trả lời:"""
