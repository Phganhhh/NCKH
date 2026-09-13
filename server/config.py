import os
from dotenv import load_dotenv

load_dotenv()

# API Key của Google (Gemini + Embedding)
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")

# Model Gemini dùng để sinh câu trả lời
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

# Model embedding của Google
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "models/text-embedding-004")

# Đường dẫn lưu ChromaDB
CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db")

# Thư mục chứa tài liệu gốc
DATA_DIR = os.getenv("DATA_DIR", "./data")

# Tham số chia chunk
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "400"))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "50"))

# Số lượng chunk trả về khi tìm kiếm
TOP_K = int(os.getenv("TOP_K", "3"))
