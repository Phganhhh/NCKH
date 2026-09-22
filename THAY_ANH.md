# Hướng dẫn thay ảnh trong web

## Thư mục ảnh

Tất cả ảnh nên để trong thư mục `images/`.

## Cách thay ảnh

### 1. Ảnh hero (banner đầu trang)

- Thay file `images/hero-hat-xoan.jpg` bằng ảnh của bạn.
- Giữ nguyên tên file hoặc sửa lại đường dẫn trong `index.html` tại dòng bắt đầu bằng `src="images/hero-hat-xoan.jpg"`.

### 2. Các ảnh còn lại trong trang

- Mở file `images-config.json`.
- Tìm ảnh muốn thay theo `section` (di-san, lich-su, ba-chang, thu-vien, nghe-nhan).
- Thay giá trị `current_url` bằng URL ảnh mới, hoặc đổi thành đường dẫn local ví dụ `images/ten-anh-moi.jpg`.
- Copy URL/đường dẫn mới vào đúng vị trí trong `index.html`.

## Gợi ý chọn ảnh cho net

- Ảnh ngang (landscape) cho hero, tối thiểu 1920px chiều rộng.
- Định dạng JPG hoặc WebP cho ảnh thật, PNG cho ảnh trong suốt.
- Nén ảnh trước khi đưa vào web (ví dụ: TinyPNG, Squoosh).
