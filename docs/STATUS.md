# Trạng thái dự án

Cập nhật lần cuối: 2026-09-14

## Module đang thực hiện

MODULE 02 — 3 Virtual Posters (bắt đầu: Gate 1 của Module 01 đã pass).

## MODULE 01 — Hoàn thành (Gate 1 PASS 2026-09-14)

- [x] React + Vite, trang `Home` và `ARExperience`
- [x] HTTPS local (`@vitejs/plugin-basic-ssl`), hướng dẫn tunnel cloudflared
- [x] Xin quyền camera kèm UI lỗi (từ chối / thiếu HTTPS / không hỗ trợ)
- [x] MindAR 1.2.5 + three 0.160 (mind-ar cần `sRGBEncoding`, bỏ từ three r162+)
- [x] Compiler image target offline `frontend/tools/compile-target.mjs` (nhận PNG lẫn JPEG)
- [x] AR overlay bám target, tự đúng tỉ lệ ảnh nhờ đọc header `.mind` (`src/services/target.js`)
- [x] Chế độ demo `?demo=1` xem trước giao diện hậu tracking không cần camera
- [x] Tracking poster thành công + AR overlay xuất hiện + test điện thoại thật

Bằng chứng Gate 1: người dùng quét poster thật bằng điện thoại qua link HTTPS ngày 2026-09-14, overlay xuất hiện đúng như demo mô phỏng. Video/ảnh bổ sung (nếu có) đặt ở `docs/gate1/`.

## Gate hiện tại (Gate 2)

```
Scan poster vật lý
→ 3 poster ảo xuất hiện
→ Có spatial behavior rõ ràng
```

## Blocker

Không có.

## Ghi chú chuyển sang Module 02

- Hệ trục anchor: unit local [0,1] ánh xạ theo chiều NGANG target; chiều cao target = `ratio = height/width` đọc từ `.mind` qua `loadTargetSize()`. Poster ảo muốn phủ đúng target dùng position `(0.5, ratio/2, 0)`.
- Đổi ảnh test: `cd frontend && npm run compile-target <ảnh> public/targets/poster-page-1.mind` — không cần sửa code.
- Ảnh test hiện tại là ảnh dọc 592x1280 (ảnh thẻ đăng ký xe); 3 poster ảo của Module 02 cần bố cục theo ratio này hoặc đọc ratio động như hiện tại.
- Mock data 3 bài hát nằm ở `frontend/src/data/` (chưa tạo); API `/songs` thật thuộc Module 05 — Module 02 dùng mock.
- `public/targets/module01-demo.mind` không dùng, có thể xóa.
- Backend giữ nguyên RAG chatbot, chưa có `/songs`.
