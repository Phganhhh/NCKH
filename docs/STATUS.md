# Trạng thái dự án

Cập nhật lần cuối: 2026-09-14

## Module đang thực hiện

MODULE 01 — Web + Image Tracking. Code hoàn thành, **chờ Gate 1 trên thiết bị thật**.

## Việc đã hoàn thành trong Module 01

- [x] Khởi tạo React + Vite trong `frontend/` (React 19 + react-router, route `/` và `/ar`)
- [x] Tạo trang `Home` (hướng dẫn in poster + nút vào AR)
- [x] Tạo trang `ARExperience` (xin quyền camera + scene AR + thanh trạng thái)
- [x] Cấu hình HTTPS local: `@vitejs/plugin-basic-ssl` trong `vite.config.js` (dev server chỉ chạy HTTPS)
- [x] Xin quyền camera: `getUserMedia` facingMode environment trước khi khởi động MindAR, có màn hình lỗi khi bị từ chối / thiếu HTTPS
- [x] Cài MindAR: mind-ar 1.2.5; hạ `three` xuống 0.160 vì mind-ar import `sRGBEncoding` (đã bỏ từ three r162+)
- [x] Tạo image target từ poster vật lý: `frontend/tools/compile-target.mjs` (offline compiler Node, không cần node-canvas) → `public/targets/poster-page-1.mind` từ `poster-page-1.png` (1584x1224)
- [x] Hiển thị AR overlay: plane CanvasTexture "HÁT XOAN PHÚ THỌ" gắn vào anchor 0 (code xong, chờ xác nhận trên thiết bị)
- [ ] Tracking poster thành công — chờ bằng chứng thiết bị thật
- [ ] Test trên điện thoại thật — Gate 1

Kiểm chứng tự động đã chạy: `npm run build` pass; dev server HTTPS trả 200 cho `/`, `/ar`, `/targets/poster-page-1.mind` (930018 bytes); HTTP thường bị từ chối.

## Gate hiện tại

```
QR/link HTTPS
→ Website
→ Camera
→ Quét poster
→ AR overlay xuất hiện
```

## Hướng dẫn test Gate 1 trên thiết bị thật

1. In `frontend/public/posters/poster-page-1.png` cỡ A4, đặt phẳng, đủ sáng.
2. Chạy dev server: `cd frontend && npm run dev`.
3. Mở trên điện thoại (cùng mạng LAN): `https://<IP-LAN-của-PC>:5173`
   - Chấp nhận cảnh báo chứng chỉ tự ký: iOS Safari → "Show Details" → "Visit Website"; Android Chrome → "Advanced" → "Proceed".
   - Hoặc dùng tunnel nếu mạng LAN chặn: `cloudflared tunnel --url https://localhost:5173` rồi mở link `https://*.trycloudflare.com` trả về (link HTTPS hợp lệ, quét QR cũng được).
4. Bấm "Vào trải nghiệm AR" → cho phép camera → hướng camera vào poster đã in, giữ cách 20–40 cm.
5. Kết quả mong đợi: thanh trạng thái chuyển "Đã nhận diện poster" và overlay chữ vàng-xanh nằm đè lên poster.
6. Bằng chứng Gate: quay video màn hình điện thoại chụp khoảnh khắc overlay xuất hiện.

Test nhanh không cần điện thoại: mở `https://localhost:5173/ar` trên PC có webcam, đưa poster in vào trước webcam.

## Blocker

Không có blocker code. Gate 1 cần thiết bị thật có camera — chờ người dùng test và xác nhận.

## Ghi chú

- Bundle ~2.8MB (tfjs + three + mind-ar) — bình thường với WebAR, sẽ tối ưu ở module sau nếu cần.
- `public/targets/module01-demo.mind` là target demo cũ (674x372, không khớp poster nào trong `public/posters/`) — không còn dùng, có thể xóa.
- Backend giữ nguyên chức năng RAG chatbot, chưa thêm API `/songs` (Module 05).
