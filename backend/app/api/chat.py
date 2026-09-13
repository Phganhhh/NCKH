from fastapi import APIRouter, HTTPException
from models.schemas import ChatRequest, ChatResponse
from rag.retriever import get_relevant_context
from rag.llm import generate_answer

router = APIRouter()

@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        context = get_relevant_context(request.query)
        answer = generate_answer(query=request.query, context=context)
        return ChatResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
