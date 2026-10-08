# NCKH HÁT XOAN – Website giới thiệu di sản Hát Xoan Phú Thọ

Website prototype giới thiệu di sản văn hóa phi vật thể đại diện của nhân loại **Hát Xoan Phú Thọ**, tích hợp trải nghiệm AR, tour khám phá và chatbot hỏi đáp.

---

## Yêu cầu hệ thống

- [XAMPP](https://www.apachefriends.org/) (PHP >= 8.0, Apache, MySQL/MariaDB) hoặc tương đương
- Trình duyệt hiện đại: Chrome, Edge, Firefox, Safari
- Kết nối Internet (để tải Tailwind CSS CDN, Google Fonts và một số ảnh/video từ bên ngoài)

---

## Cài đặt và chạy dự án

### 1. Tải mã nguồn

Clone repo về máy:

```bash
git clone https://github.com/username/NCKH-HATXOAN.git
```

Hoặc giải nén file ZIP vào thư mục web server.

### 2. Đặt mã nguồn vào htdocs

Với XAMPP trên Windows:

```
C:\xampp\htdocs\hat-xoan-final\
```

Hoặc tên thư mục bất kỳ, ví dụ:

```
C:\xampp\htdocs\NCKH-HATXOAN\
```

### 3. Khởi động XAMPP

Mở **XAMPP Control Panel**, bật **Apache** và **MySQL**.

### 4. Tạo database

Truy cập: http://localhost/phpmyadmin

- Tạo database mới tên `hat_xoan` (utf8mb4_unicode_ci)
- Import file `database.sql` vào database vừa tạo

Hoặc dùng dòng lệnh:

```bash
cd C:\xampp\htdocs\hat-xoan-final
C:\xampp\mysql\bin\mysql -u root -p hat_xoan < database.sql
```

> Mặc định XAMPP không có mật khẩu MySQL. Nếu bạn đã đặt password, hãy thêm sau `-p`.

### 5. Truy cập website

Mở trình duyệt:

```
http://localhost/hat-xoan-final/
```

Hoặc nếu bạn để tên thư mục khác:

```
http://localhost/NCKH-HATXOAN/
```

---

## Cấu trúc thư mục

```
hat-xoan-final/
├── index.php                   # Trang chủ
├── pages/
│   └── kham-pha-di-san.php     # Trang khám phá di sản chi tiết
├── ar/
│   └── index.php               # Trải nghiệm AR Portal
├── tour/
│   └── index.php               # Tour khám phá + đặt lịch
├── chatbot/
│   └── index.php               # Redirect về trang chủ
├── auth/
│   ├── login.php               # Đăng nhập (demo)
│   └── register.php            # Đăng ký (demo)
├── includes/
│   ├── header.php              # Header chung
│   ├── footer.php              # Footer chung
│   └── chatbot.php             # Widget chatbot
├── assets/
│   ├── css/                    # original.css, site.css
│   ├── o2o.css                 # CSS cho trang AR và Tour
│   └── js/site.js              # JavaScript chung
├── images/                     # Hình ảnh dự án
├── audio/                      # File audio minh họa
├── database.sql                # Schema MySQL
└── README.md                   # File bạn đang đọc
```

---

## Lưu ý khi sử dụng

- Đây là **prototype**, các chức năng đăng nhập/đăng ký/đặt tour hiện chỉ là giao diện demo.
- Một số con số trong trang Tour (30 khách, 25 đã giữ, giảm 20%,...) là dữ liệu minh họa.
- Trải nghiệm AR yêu cầu trình duyệt hỗ trợ `getUserMedia` và cần chạy trên `localhost` hoặc HTTPS.
- Chatbot hiện trả lời theo từ khóa (rule-based), chưa kết nối API AI thật.

---

## Cấu hình tùy chọn

### Đổi tên database

Nếu bạn muốn dùng tên database khác, hãy sửa lại file `database.sql` trước khi import, sau đó cập nhật các file PHP nếu có kết nối MySQL (hiện chưa có kết nối sẵn).

### Chạy trên cổng khác

Nếu XAMPP Apache chạy trên cổng khác (ví dụ 8080), truy cập:

```
http://localhost:8080/hat-xoan-final/
```

---

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy fork repo, tạo branch mới và gửi pull request.

---

## License

Dự án phục vụ mục đích học tập và nghiên cứu khoa học.

---

## Liên hệ

Nếu gặp lỗi khi setup, hãy kiểm tra lại:

1. Apache và MySQL đã bật chưa?
2. File nằm đúng trong `htdocs` chưa?
3. Database `hat_xoan` đã được import chưa?
4. Truy cập URL đúng chưa?
