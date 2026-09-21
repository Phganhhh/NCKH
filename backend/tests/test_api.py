from __future__ import annotations

from fastapi.testclient import TestClient


def test_health(client: TestClient) -> None:
    response = client.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["database"] == "connected"
    assert body["kb_chunks"] > 0


def test_list_songs(client: TestClient) -> None:
    response = client.get("/api/songs")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 3
    assert {item["slug"] for item in body["items"]} == {"bai-xoan-1", "bai-xoan-2", "bai-xoan-3"}


def test_search_songs(client: TestClient) -> None:
    response = client.get("/api/songs", params={"q": "Bài Xoan 2"})
    assert response.status_code == 200
    assert response.json()["total"] == 1


def test_get_song_by_id_and_slug(client: TestClient) -> None:
    by_id = client.get("/api/songs/xoan_001").json()
    by_slug = client.get("/api/songs/bai-xoan-1").json()
    assert by_id["id"] == by_slug["id"] == "xoan_001"
    assert "lyrics" in by_id and "performance_info" in by_id


def test_get_song_not_found(client: TestClient) -> None:
    response = client.get("/api/songs/khong-ton-tai")
    assert response.status_code == 404
    assert response.json()["detail"] == "Song not found"


def test_song_assets(client: TestClient) -> None:
    response = client.get("/api/songs/xoan_001/assets")
    assert response.status_code == 200
    assert response.json()["total"] >= 1


def test_sources_endpoint(client: TestClient) -> None:
    response = client.get("/api/sources")
    assert response.status_code == 200
    assert response.json()["total"] > 0


def test_chat_endpoint_contract(client: TestClient) -> None:
    response = client.post("/api/chat", json={"message": "Hát Xoan là gì?", "conversation_id": "test-1"})
    assert response.status_code == 200
    body = response.json()
    assert body["conversation_id"] == "test-1"
    assert isinstance(body["answer"], str) and body["answer"]
    assert isinstance(body["sources"], list)


def test_chat_rejects_empty_message(client: TestClient) -> None:
    assert client.post("/api/chat", json={"message": ""}).status_code == 422


def test_openapi_available(client: TestClient) -> None:
    assert client.get("/openapi.json").status_code == 200
