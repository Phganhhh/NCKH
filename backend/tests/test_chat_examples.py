import requests

queries = [
    "Hát Xoan có mấy chặng hát?",
    "Điệu Giáo Trống có ý nghĩa gì?",
    "Phường Xoan gồm những ai?"
]

for q in queries:
    r = requests.post("http://localhost:8000/chat", json={"query": q})
    data = r.json()
    print(f"Q: {q}")
    print(f"A: {data['answer']}")
    print()
