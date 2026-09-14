Hãy đọc theo thứ tự:

1. docs/STATUS.md
2. docs/MODULE_INDEX.md
3. docs/modules/MODULE_xx_[TÊN].md
4. PLAN.md phần tương ứng module này

Sau đó thực hiện module hiện tại theo đúng checklist.

Quy tắc:
- Chỉ làm đúng module hiện tại, không làm việc của module sau
- Làm checklist theo thứ tự
- Tự code, tự cấu hình, tự test phần có thể test tự động
- Khi xong từng mục, tick checklist
- Commit nhỏ theo từng việc, format: feat(module-xx): ...
- Cập nhật docs/STATUS.md
- Khi đến Gate: dừng lại, hướng dẫn tôi cách test trên thiết bị thật, và chờ tôi xác nhận
- Không tự tuyên bố Gate passed nếu chưa có bằng chứng
- Nếu thiếu asset/API key, ghi rõ blocker vào docs/STATUS.md rồi dừng