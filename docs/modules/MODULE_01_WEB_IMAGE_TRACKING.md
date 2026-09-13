# MODULE 01 — Web + Image Tracking

## Trạng thái

- [ ] Chưa bắt đầu
- [x] Đang làm / chờ Gate (code hoàn thành, chờ bằng chứng điện thoại thật)

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
- [ ] Tracking poster thành công
- [ ] Hiển thị AR overlay
- [ ] Test trên điện thoại thật

Ghi chú: "Hiển thị AR overlay" đã code xong (plane CanvasTexture trên anchor 0) nhưng chỉ tick khi có bằng chứng chạy thật cùng mục tracking.

## Gate 1

Pass khi có bằng chứng chạy trên điện thoại thật:

```
QR/link HTTPS
→ Website
→ Camera
→ Quét poster
→ AR overlay xuất hiện
```

## Không làm trong module này

- [ ] Carousel
- [ ] Video
- [ ] Chatbot
- [ ] Database

## Ghi chú

Chưa làm fancy UI. Gate này kiểm tra AR foundation.
