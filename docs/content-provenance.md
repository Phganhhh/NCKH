# Content Provenance

Đây là đề tài nghiên cứu văn hoá → **mọi nội dung và media phải truy được nguồn**.

## Nguyên tắc

1. KHÔNG tự tạo: sự kiện lịch sử, số liệu, thông tin văn hoá, lời bài hát, hình ảnh, video.
2. Nội dung chưa có nguồn xác minh phải ghi rõ:
   `[PLACEHOLDER CONTENT – REPLACE WITH VERIFIED SOURCE]`
3. Mọi asset phải có dòng tương ứng trong `data/sources/asset_sources.csv`.
4. Chatbot chỉ trả lời dựa trên KB; khi KB không có → phải nói "chưa có đủ dữ liệu", không suy đoán.

## Trạng thái hiện tại của prototype

| Loại nội dung | Trạng thái |
|---|---|
| Thông tin tổng quan Hát Xoan | **Cần xác minh** — chỉ giữ các phát biểu ở mức khung, trỏ tới hồ sơ UNESCO ICH (xem `asset_sources.csv`) |
| Lịch sử, nghệ nhân, phường Xoan, không gian diễn xướng | PLACEHOLDER |
| 3 bài Xoan mẫu (tên, mô tả, lời ca) | PLACEHOLDER — tên "Bài Xoan 1/2/3" là nhãn tạm, không phải tên bài Xoan thật |
| Hình ảnh, video, audio | PLACEHOLDER (không có file media thật trong repo) |
| Poster AR, video AR | PLACEHOLDER — do AR team cung cấp |

## Quy trình thay nội dung thật

1. Thu thập tài liệu gốc → `data/raw/` (giữ nguyên bản, ghi tên file có nguồn).
2. Làm sạch/chuẩn hoá → `data/cleaned/`.
3. Viết lại thành chunk KB có front-matter (`id`, `title`, `topic`, `song_id`, `source`) → `data/knowledge/`.
4. Thêm dòng nguồn vào `data/sources/asset_sources.csv`.
5. Cập nhật `data/seed/songs.json`, chạy lại `python -m scripts.seed`.
6. Xoá các dấu `[PLACEHOLDER CONTENT – REPLACE WITH VERIFIED SOURCE]` tương ứng.

## Gợi ý nguồn cần liên hệ/xác minh

- Hồ sơ di sản UNESCO ICH về Hát Xoan (bản chính thức).
- Sở Văn hoá, Thể thao và Du lịch tỉnh Phú Thọ.
- Các phường Xoan gốc tại Phú Thọ (tư liệu biểu diễn, lời ca).
- Công trình nghiên cứu/luận văn đã công bố về Hát Xoan.

> Ghi chú: repo này **không** đính kèm nội dung sao chép từ các nguồn trên. Cần xin phép/ghi nguồn trước khi đưa vào bản public.
