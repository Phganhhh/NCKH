"""Tiện ích xử lý văn bản tiếng Việt (nhẹ, không phụ thuộc thư viện ngoài)."""
from __future__ import annotations

import re
import unicodedata

_PUNCT = re.compile(r"[^\w\s]", flags=re.UNICODE)

# Stopword tiếng Việt rút gọn — đủ dùng cho retrieval ở quy mô prototype.
STOPWORDS: frozenset[str] = frozenset(
    """
    là gì của và các những một cái này kia đó đây cho với về từ trong ngoài trên dưới
    có không được khi nào thì mà nhưng hay hoặc như tại bởi vì nên rằng ra vào lên xuống
    tôi bạn mình chúng ta họ ai đâu sao thế nhé ạ hả rồi đã đang sẽ cũng rất quá lắm
    bao nhiêu thế nào hãy xin vui lòng please the a an of is what how
    """.split()
)


def normalize(text: str) -> str:
    text = unicodedata.normalize("NFC", text or "")
    return _PUNCT.sub(" ", text.lower())


def tokenize(text: str) -> list[str]:
    return [t for t in normalize(text).split() if t]


def content_tokens(text: str) -> list[str]:
    """Bỏ stopword — dùng để tính độ phủ (coverage) của câu hỏi."""
    return [t for t in tokenize(text) if t not in STOPWORDS and len(t) > 1]


def bigrams(tokens: list[str]) -> list[str]:
    """Tiếng Việt nhiều từ ghép 2 âm tiết ('hát xoan', 'lời ca') -> thêm bigram."""
    return [f"{a}_{b}" for a, b in zip(tokens, tokens[1:])]
