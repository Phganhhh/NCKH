const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function getSongs() {
  const response = await fetch(`${API_BASE_URL}/songs`);
  if (!response.ok) throw new Error("Không tải được danh sách bài hát");
  return response.json();
}

export async function getSongById(id) {
  const response = await fetch(`${API_BASE_URL}/songs/${id}`);
  if (!response.ok) throw new Error("Không tải được bài hát");
  return response.json();
}
