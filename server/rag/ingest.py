import os
import glob

from config import DATA_DIR, CHUNK_SIZE, CHUNK_OVERLAP
from rag.embeddings import get_embedding
from rag.vector_store import add_documents, clear_collection

def split_text(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> list[str]:
    """Chia văn bản thành các đoạn nhỏ với overlap."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk.strip())
        start = end - overlap
    return chunks

def load_txt_files(folder: str) -> list[tuple[str, str]]:
    """Đọc tất cả file .txt trong thư mục, trả về list (filename, content)."""
    documents = []
    pattern = os.path.join(folder, "*.txt")
    for filepath in glob.glob(pattern):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        documents.append((os.path.basename(filepath), content))
    return documents

def ingest(folder: str = DATA_DIR):
    """Nạp toàn bộ tài liệu .txt vào ChromaDB."""
    print("Bắt đầu nạp dữ liệu vào ChromaDB...")
    clear_collection()

    documents = load_txt_files(folder)
    if not documents:
        print(f"Không tìm thấy file .txt trong {folder}")
        return

    all_ids = []
    all_texts = []
    all_embeddings = []

    for idx, (filename, content) in enumerate(documents):
        chunks = split_text(content)
        for chunk_idx, chunk in enumerate(chunks):
            doc_id = f"{filename}_{chunk_idx}"
            print(f"Embedding: {doc_id}")
            embedding = get_embedding(chunk)
            all_ids.append(doc_id)
            all_texts.append(chunk)
            all_embeddings.append(embedding)

    add_documents(all_ids, all_texts, all_embeddings)
    print(f"Hoàn tất! Đã nạp {len(all_ids)} chunks.")

if __name__ == "__main__":
    ingest()
