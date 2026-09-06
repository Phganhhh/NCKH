import google.generativeai as genai
from config import GOOGLE_API_KEY, GEMINI_MODEL
from rag.prompt import build_prompt

def generate_answer(query: str, context: str) -> str:
    """Gửi prompt có context cho Gemini và trả về câu trả lời."""
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel(GEMINI_MODEL)
    prompt = build_prompt(context, query)
    response = model.generate_content(prompt)
    return response.text.strip()
