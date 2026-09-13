import requests

API_URL = "http://localhost:8000/chat"

print("=" * 50)
print("  DEMO CHATBOT HÁT XOAN")
print("  Gõ câu hỏi và nhấn Enter (gõ 'exit' để thoát)")
print("=" * 50)

while True:
    query = input("\nBạn: ").strip()

    if not query:
        continue

    if query.lower() in ["exit", "quit", "thoat"]:
        print("Tạm biệt!")
        break

    try:
        print("Bot: ", end="", flush=True)
        response = requests.post(API_URL, json={"query": query}, timeout=30)
        response.raise_for_status()
        data = response.json()
        print(data["answer"])
    except requests.exceptions.ConnectionError:
        print("Không thể kết nối đến server. Hãy đảm bảo server đang chạy: python main.py")
    except Exception as e:
        print(f"Lỗi: {e}")
