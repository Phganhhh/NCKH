import os
import chromadb

from rag.constants import CHROMA_DIR, COLLECTION_NAME

def get_collection():
    """Khởi tạo hoặc lấy collection ChromaDB."""
    os.makedirs(CHROMA_DIR, exist_ok=True)
    client = chromadb.PersistentClient(path=CHROMA_DIR)
    collection = client.get_or_create_collection(name=COLLECTION_NAME)
    return collection

def add_documents(ids: list[str], texts: list[str], embeddings: list[list[float]]):
    """Thêm tài liệu vào ChromaDB."""
    collection = get_collection()
    collection.add(ids=ids, documents=texts, embeddings=embeddings)

def search_similar(embedding: list[float], top_k: int = 3):
    """Tìm top_k tài liệu gần nhất."""
    collection = get_collection()
    results = collection.query(query_embeddings=[embedding], n_results=top_k)
    return results

def clear_collection():
    """Xóa toàn bộ dữ liệu trong collection."""
    client = chromadb.PersistentClient(path=CHROMA_DIR)
    try:
        client.delete_collection(name=COLLECTION_NAME)
    except Exception:
        pass
