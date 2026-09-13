from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_chat_endpoint():
    response = client.post("/chat", json={"query": "Hát Xoan là gì?"})
    assert response.status_code == 200
    assert "answer" in response.json()
    print(response.json())

if __name__ == "__main__":
    test_chat_endpoint()
