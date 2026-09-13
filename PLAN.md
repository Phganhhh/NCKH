```markdown
# BÁO CÁO PHÂN TÍCH YÊU CẦU VÀ THIẾT KẾ KIẾN TRÚC HỆ THỐNG
**Đề tài Nghiên cứu Khoa học:** Ứng dụng công nghệ thực tế tăng cường (WebAR) nhằm số hóa và nâng cao trải nghiệm di sản Hát Xoan Phú Thọ

---

## 1. YÊU CẦU HỆ THỐNG (SYSTEM REQUIREMENTS)

### 1.1. Yêu cầu chức năng (Functional Requirements)
* **FR1 - Quét và Nhận diện Poster (Image Target Tracking):** Nhận diện trực tiếp ảnh poster vật lý qua camera trình duyệt thời gian thực mà không cần cài đặt ứng dụng độc lập.
* **FR2 - Trình diễn Không gian AR (Augmented Reality Display):** Neo các điểm tương tác (hotspots/buttons) và bảng thông tin cố định theo góc nhìn và tọa độ của poster ($x, y, z$).
* **FR3 - Trình phát Đa phương tiện (Multimedia Streaming):** 
  * Phát video trình diễn các tiết mục Hát Xoan chuẩn hóa.
  * Hiển thị lời bài hát phân cấp theo 3 chặng hát: Hát tế, Quả cách, Hát hội.
  * Xem hồ sơ trích ngang của các Nghệ nhân Nhân dân / Nghệ nhân Ưu tú.
* **FR4 - Trợ lý AI Hỏi - Đáp (RAG Chatbot):** Tiếp nhận câu hỏi ngôn ngữ tự nhiên về di sản Hát Xoan, truy xuất tri thức nội bộ và trả lời chính xác, loại trừ hiện tượng ảo giác (hallucination).

### 1.2. Yêu cầu phi chức năng (Non-Functional Requirements)
* **NFR1 - Khả năng tiếp cận:** Chạy trực tiếp trên trình duyệt di động (Chrome, Safari) thông qua giao thức HTTPS.
* **NFR2 - Hiệu năng Tracking:** Duy trì tốc độ khung hình từ 25–30 FPS; thời gian nhận diện và khóa mục tiêu (target) lần đầu dưới 2 giây.
* **NFR3 - Độ trễ phản hồi AI:** Thời gian phản hồi truy vấn Chatbot RAG dưới 3 giây.
* **NFR4 - Trải nghiệm người dùng:** Giao diện trực quan, tự động điều chỉnh tỷ lệ (responsive) trên nhiều kích thước màn hình thiết bị di động.

---

## 2. KIẾN TRÚC TỔNG THỂ HỆ THỐNG (SYSTEM ARCHITECTURE)

Hệ thống được thiết kế theo kiến trúc Client - Server phân tán:


```

[ Poster Vật Lý ]
│ (Camera stream)
▼
┌────────────────────────────────────────────────────────┐
│                   CLIENT (Web Browser)                 │
│  ┌───────────────────────┐   ┌───────────────────────┐ │
│  │     WebAR Engine      │   │   UI / Media Layer    │ │
│  │ (MindAR.js + A-Frame) │   │ (Video/Audio/Modals)  │ │
│  └───────────┬───────────┘   └───────────┬───────────┘ │
│              │                           │             │
│              └────────► Chat Widget ◄────┘             │
└──────────────────────────────┬─────────────────────────┘
│ HTTP / JSON API
▼
┌────────────────────────────────────────────────────────┐
│                BACKEND SERVICE (FastAPI)               │
│  ┌──────────────────────────────────────────────────┐  │
│  │                 API Route (/chat)                │  │
│  └──────────────────────────┬───────────────────────┘  │
│                             │                          │
│                             ▼                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │                RAG Pipeline                      │  │
│  │  1. Embedding câu hỏi                            │  │
│  │  2. Similarity Search (Cosine)                   │  │
│  │  3. Gửi Prompt có Context                        │  │
│  └──────────────┬─────────────────────────┬─────────┘  │
│                 │                         │            │
│                 ▼                         ▼            │
│       [ Vector Database ]            [ Cloud LLM ]     │
│          (ChromaDB)                  (Gemini API)      │
└────────────────────────────────────────────────────────┘

```

---

## 3. THIẾT KẾ CHI TIẾT CÁC MODULE

### 3.1. Module 1: Image Target & AR Core (Client-side)
* **Công nghệ:** `MindAR.js`, `A-Frame`.
* **Đầu vào:** Luồng hình ảnh từ thiết bị quay (Camera Stream) và file nhận diện số hóa `targets.mind`.
* **Cơ chế xử lý:**
  * Trích xuất các điểm đặc trưng (feature points) từ camera, so khớp với tập vector trong file `targets.mind`.
  * Tính toán ma trận biến đổi (Homography/Pose Estimation) để xác định vị trí $x, y, z$ và góc quay của poster.
* **Đầu ra:** Neo ma trận tọa độ vào entity của A-Frame để hiển thị các nút tương tác 2.5D/3D nổi trên poster.

### 3.2. Module 2: UI/UX & Multimedia Controller (Client-side)
* **Công nghệ:** HTML5, CSS3/TailwindCSS, Vanilla JavaScript.
* **Cơ chế xử lý:**
  * Bắt sự kiện người dùng bấm vào các nút điều hướng (Xem Biểu Diễn, Lời Bài Hát, Nghệ Nhân, Chat AI).
  * Điều khiển hiển thị Responsive Modals đè lên lớp quét AR.
  * Tối ưu hóa tài nguyên: Tự động tạm dừng render vòng lặp AR khi người dùng đang mở Modal Video/Audio để tiết kiệm pin và bộ nhớ thiết bị.

### 3.3. Module 3: RAG Chatbot Service (Server-side)
* **Công nghệ:** FastAPI (Python), ChromaDB, LangChain, Gemini API.
* **Luồng dữ liệu (Data Pipeline):**
  1. **Giai đoạn Offline (Indexing Phase):**
     * Văn bản tri thức chuẩn về Hát Xoan được phân tách (Text Splitting) thành các đoạn văn bản (chunk) 300–400 ký tự với overlap 50 ký tự.
     * Vector hóa thông qua mô hình Embedding (`text-embedding-004`).
     * Lưu trữ chỉ mục tại ChromaDB.
  2. **Giai đoạn Online (Query Phase):**
     * Endpoint `/chat` tiếp nhận request `{ "query": "..." }`.
     * Vector hóa câu hỏi, thực hiện tìm kiếm Top-K chunk tương đồng nhất từ ChromaDB qua độ tương đồng Cosine.
     * Ghép nối context vào Prompt khuôn mẫu:
       ```text
       Dựa vào thông tin sau để trả lời ngắn gọn về Hát Xoan. 
       Nếu không có thông tin, hãy trả lời 'Tư liệu chưa cập nhật':
       Context: {CONTEXT}
       Câu hỏi: {QUERY}
       ```
     * Gửi payload đến LLM và trả kết quả JSON về Client.

---

## 4. MA TRẬN PHÂN CHIA VÀ TÍCH HỢP HỆ THỐNG

| Module | Phụ trách chính | Đầu ra bàn giao | Điểm tích hợp (Integration Point) |
| :--- | :--- | :--- | :--- |
| **AR & Tracking** | Thành viên 2 | File `targets.mind`, Khung `a-scene` A-Frame | Cung cấp sự kiện `targetFound` / `targetLost` cho UI |
| **UI & Media** | Thành viên 3 | Giao diện Web, Modal đa phương tiện, Chat Widget | Nhận sự kiện từ AR; Gọi API Backend qua hàm `fetch()` |
| **RAG Backend** | Thành viên 1 | Script `ingest.py`, Server FastAPI chạy endpoint `/chat` | Nhận request JSON từ Chat Widget và trả về kết quả |

---

## 5. CHỈ SỐ ĐÁNH GIÁ THỰC NGHIỆM CHO NGHIÊN CỨU

### 5.1. Đánh giá Khả năng nhận diện AR
* Tỷ lệ nhận diện thành công theo điều kiện ánh sáng (Lux) và góc nghiêng quét ($15^\circ - 75^\circ$).
* Tần số quét khung hình (FPS) trên các dòng thiết bị (iOS/Android).

### 5.2. Đánh giá Hiệu quả RAG Chatbot
* Độ chính xác nội dung câu trả lời (Accuracy & Faithfulness).
* Thời gian phản hồi trung bình (Response Latency).

### 5.3. Đánh giá Trải nghiệm người dùng
* Điểm số đánh giá thang đo chuẩn hóa SUS (System Usability Scale) từ nhóm mẫu thử nghiệm thực tế.

```