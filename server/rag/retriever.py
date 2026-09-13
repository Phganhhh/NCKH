from rag.embeddings import get_query_embedding
from rag.vector_store import search_similar
from config import TOP_K

def get_relevant_context(query: str) -> str:
    """Tìm kiếm tài liệu liên quan đến câu hỏi."""
    query_embedding = get_query_embedding(query)
    results = search_similar(query_embedding, top_k=TOP_K)

    # Ghép các đoạn tài liệu thành một chuỗi context
    documents = results.get("documents", [[]])[0]
    if not documents:
        return ""

    context = "\n\n".join(documents)
    return context
