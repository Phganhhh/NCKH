from rag.ingest import load_txt_files, split_text
from rag.constants import DATA_DIR

def test_load_data():
    documents = load_txt_files(DATA_DIR)
    assert len(documents) > 0
    print(f"Loaded {len(documents)} files")

def test_split_text():
    text = "a " * 500
    chunks = split_text(text, chunk_size=100, overlap=20)
    assert len(chunks) > 0
    print(f"Split into {len(chunks)} chunks")

if __name__ == "__main__":
    test_load_data()
    test_split_text()
