// Kết nối với backend chatbot
async function askChatbot(query) {
    const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });
    const data = await response.json();
    return data.answer;
}

export { askChatbot };
