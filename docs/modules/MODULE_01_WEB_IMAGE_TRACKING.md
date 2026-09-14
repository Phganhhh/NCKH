# MODULE 01 — Web + Image Tracking

## Trạng thái

- [x] Hoàn thành — Gate 1 PASS 2026-09-14 (người dùng test trên điện thoại thật)

## Mục tiêu

Xây nền tảng web và làm cho luồng AR cơ bản chạy trên điện thoại thật.

## Việc cần làm

- [x] Khởi tạo React + Vite trong `frontend/`
- [x] Tạo trang `Home`
- [x] Tạo trang `ARExperience`
- [x] Cấu hình HTTPS local hoặc HTTPS tunnel
- [x] Xin quyền camera
- [x] Cài MindAR
- [x] Tạo image target từ poster vật lý
- [x] Tracking poster thành công
- [x] Hiển thị AR overlay
- [x] Test trên điện thoại thật

## Gate 1

Pass khi có bằng chứng chạy trên điện thoại thật:

```
QR/link HTTPS
→ Website
→ Camera
→ Quét poster
→ AR overlay xuất hiện
```

Bằng chứng: người dùng quét poster thật bằng điện thoại qua link HTTPS ngày 2026-09-14, AR overlay xuất hiện đúng như chế độ demo mô phỏng. Video/ảnh bổ sung (nếu lưu): `docs/gate1/`.

## Không làm trong module này

- [x] Carousel (chuyển Module 03)
- [x] Video (chuyển Module 04)
- [x] Chatbot (chuyển Module 06)
- [x] Database (chuyển Module 05)

## Ghi chú

Chưa làm fancy UI. Gate này kiểm tra AR foundation.
Hạ tầng để lại cho module sau: `tools/compile-target.mjs` (PNG+JPEG), `src/services/target.js` (đọc tỉ lệ target từ .mind), chế độ demo `?demo=1`.
