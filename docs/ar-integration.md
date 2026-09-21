# AR Integration (Zapworks WebAR)

## 1. Contract

```text
Website
   ↓
/ar  (landing page — KHÔNG render AR)
   ↓
NEXT_PUBLIC_AR_URL  → Zapworks WebAR
   ↓
Image Tracking (poster vật lý)
   ↓
3 Virtual Posters
   ↓
User chọn 1 poster
   ↓
AR Video phát trong không gian AR
```

Website **không** render AR, **không** phát video AR. AR **không** gọi backend lúc runtime — video AR đóng gói trong Zapworks project.

## 2. Phân chia trách nhiệm

| AR team (Zapworks) | Website team |
|---|---|
| Image target training (poster) | Trang `/ar` + CTA trên homepage |
| 3 virtual posters + interaction | Đọc `NEXT_PUBLIC_AR_URL` từ env |
| AR video playback | Giữ ID mapping nhất quán |
| Deploy & publish Zapworks URL/QR | Fallback khi AR chưa cấu hình / thiết bị không hỗ trợ |

## 3. ID mapping (nguồn sự thật chung)

| Song ID | Slug | AR Poster | AR Video |
|---|---|---|---|
| xoan_001 | bai-xoan-1 | AR_POSTER_001 | AR_VIDEO_001 |
| xoan_002 | bai-xoan-2 | AR_POSTER_002 | AR_VIDEO_002 |
| xoan_003 | bai-xoan-3 | AR_POSTER_003 | AR_VIDEO_003 |

Quy ước: tên asset trong Zapworks phải trùng cột *AR Poster* / *AR Video*. Khi thêm bài Xoan mới → thêm dòng ở đây trước, sau đó AR team tạo asset tương ứng.

## 4. Cấu hình

```env
NEXT_PUBLIC_AR_URL=https://<your-zapworks-project>.zappar.io/...
```

- Chưa có URL → `/ar` hiển thị: *"AR experience is not configured yet."* + hướng dẫn, **không crash**.
- Nút AR mở tab mới (`target="_blank"`, `rel="noopener noreferrer"`) — tránh vấn đề camera permission trong iframe.

## 5. Yêu cầu thiết bị

- HTTPS bắt buộc (Zapworks yêu cầu secure context cho camera).
- Mobile Chrome (Android) / Mobile Safari (iOS 13+).
- Cần poster vật lý làm image target. Poster mẫu: `data/assets/ar_poster_placeholder.txt` (PLACEHOLDER — thay bằng poster in thật).

## 6. Fallback

Trang `/ar` luôn hiển thị khối:

```text
Không thể khởi chạy AR?
Bạn vẫn có thể khám phá các bài Xoan trên website.
[ Khám phá các bài Xoan ]
```

Lỗi của module AR không được ảnh hưởng tới phần còn lại của website (AR chỉ là một link ra ngoài).

## 7. Checklist bàn giao cho AR team

- [ ] Poster vật lý final (in, ≥ A3, độ tương phản cao, nhiều feature điểm)
- [ ] 3 video biểu diễn đã có bản quyền/nguồn rõ ràng
- [ ] Zapworks project published, URL dán vào `NEXT_PUBLIC_AR_URL`
- [ ] QR code trỏ tới URL (in kèm poster)
- [ ] Test trên Android Chrome + iOS Safari
