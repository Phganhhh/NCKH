export async function askChatbot(query, songId = null) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, song_id: songId })
    });

    if (!response.ok) {
      throw new Error(`Chatbot API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { answer: "Không thể kết nối chatbot.", sources: [] };
  }
}
