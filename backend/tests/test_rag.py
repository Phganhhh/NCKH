"""Test RAG tối thiểu theo yêu cầu đề bài (6 nhóm câu hỏi)."""
from __future__ import annotations

from app.rag.knowledge_base import get_knowledge_base
from app.rag.pipeline import get_pipeline
from app.prompts.chatbot import NO_DATA_MESSAGE, OUT_OF_SCOPE_MESSAGE


def test_knowledge_base_is_global_and_has_metadata() -> None:
    kb = get_knowledge_base()
    assert len(kb) > 0
    assert {c.topic for c in kb.chunks} > {"overview"}
    assert kb.by_song("xoan_001"), "chunk phải gắn metadata song_id để citation/filtering"


def test_q1_hat_xoan_la_gi() -> None:
    result = get_pipeline().answer("Hát Xoan là gì?")
    assert result.grounded
    assert any("Hát Xoan" in item.chunk.content for item in result.sources)


def test_q2_dac_diem() -> None:
    result = get_pipeline().answer("Hát Xoan có những đặc điểm gì?")
    assert result.grounded
    assert any(item.chunk.topic == "characteristics" for item in result.sources)


def test_q3_bai_xoan_1() -> None:
    result = get_pipeline().answer("Bài Xoan 1 là gì?")
    assert result.grounded
    assert any(item.chunk.song_id == "xoan_001" for item in result.sources)


def test_q4_noi_dung_bai_xoan() -> None:
    result = get_pipeline().answer("Nội dung bài Xoan?")
    assert result.grounded
    assert result.sources


def test_q5_out_of_scope() -> None:
    result = get_pipeline().answer("Giá Bitcoin hôm nay bao nhiêu?")
    assert not result.grounded
    assert result.answer == OUT_OF_SCOPE_MESSAGE
    assert result.sources == []


def test_q6_not_in_kb_does_not_hallucinate() -> None:
    result = get_pipeline().answer("Hát Xoan có bao nhiêu nghệ nhân được phong tặng?")
    text = result.answer.lower()
    # Hoặc từ chối vì thiếu dữ liệu, hoặc trả lời nhưng nêu rõ nội dung là placeholder.
    assert (result.answer in {NO_DATA_MESSAGE, OUT_OF_SCOPE_MESSAGE}) or ("placeholder" in text)


def test_retrieval_is_deterministic() -> None:
    first = [c.chunk.id for c in get_pipeline().retrieve("trang phục Hát Xoan")]
    second = [c.chunk.id for c in get_pipeline().retrieve("trang phục Hát Xoan")]
    assert first == second
