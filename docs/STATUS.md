# Trạng thái dự án

Cập nhật lần cuối: 2026-09-14

## Module đang thực hiện

MODULE 01 — Web + Image Tracking

## Việc cần làm trước khi code Module 01

- [ ] Khởi tạo React + Vite trong `frontend/`
- [ ] Cấu hình HTTPS local hoặc HTTPS tunnel
- [ ] Tạo image target từ poster vật lý
- [ ] Tích hợp MindAR

## Gate hiện tại

```
QR/link HTTPS
→ Website
→ Camera
→ Quét poster
→ AR overlay xuất hiện
```

## Blocker

Không có.

## Ghi chú

- Đã cấu trúc lại project từ `client/`, `server/` thành `frontend/`, `backend/`.
- Backend giữ nguyên chức năng RAG chatbot, chưa thêm API `/songs`.
- Frontend hiện là scaffold, Module 01 sẽ chuyển sang React/Vite.
