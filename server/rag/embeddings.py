import google.generativeai as genai
from config import GOOGLE_API_KEY, EMBEDDING_MODEL

def get_embedding(text: str) -> list[float]:
    """Trả về vector embedding cho một đoạn văn bản."""
    genai.configure(api_key=GOOGLE_API_KEY)
    result = genai.embed_content(
        model=EMBEDDING_MODEL,
        content=text,
        task_type="retrieval_document"
    )
    return result["embedding"]

def get_query_embedding(text: str) -> list[float]:
    """Trả về vector embedding cho câu hỏi."""
    genai.configure(api_key=GOOGLE_API_KEY)
    result = genai.embed_content(
        model=EMBEDDING_MODEL,
        content=text,
        task_type="retrieval_query"
    )
    return result["embedding"]
