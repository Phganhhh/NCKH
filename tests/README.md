Test tổng hợp nằm ở:
- backend/tests/  (pytest: API + RAG)
- frontend/tests/ (smoke.mjs: render các trang, fail-soft khi API lỗi)

Chạy:
  cd backend && pytest
  cd frontend && npm run smoke   # cần server đang chạy
