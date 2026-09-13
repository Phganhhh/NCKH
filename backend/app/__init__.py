import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from app.api.chat import router as chat_router

app = FastAPI(title="Hát Xoan RAG Chatbot", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/chat", tags=["chat"])


@app.get("/")
def root():
    return {"message": "Hát Xoan RAG Chatbot API"}


@app.get("/demo")
def demo():
    demo_path = os.path.join(os.path.dirname(__file__), "demo-chat.html")
    return FileResponse(demo_path)
