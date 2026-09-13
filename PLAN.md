Có — và theo tôi **phương án mới này thực tế hơn phương án Plane Detection + 3D sân khấu trước đó rất nhiều**, đặc biệt với giới hạn **2 tháng, WebAR, không cài app** của bạn.

Tôi sẽ thiết kế lại toàn bộ AR theo hướng:

> **Poster vật lý → Image Tracking → 3 poster ảo → tương tác carousel → chọn bài hát → video biểu diễn + Chatbot hỏi đáp**

Đây có thể trở thành **luồng AR chính thức của POC**.

---

# 1. Đánh giá tổng thể phương án mới

Tôi đánh giá:

| Thành phần                    |     Khả thi | Độ khó |
| ----------------------------- | ----------: | -----: |
| Quét poster vật lý            |   ✅ Rất cao |     ⭐⭐ |
| Hiện 3 poster ảo              |   ✅ Rất cao |     ⭐⭐ |
| Bấm poster ảo                 |   ✅ Rất cao |     ⭐⭐ |
| Swipe ngang để chọn poster    |       ✅ Cao |    ⭐⭐⭐ |
| Hiện video tương ứng          |   ✅ Rất cao |     ⭐⭐ |
| Chatbot bên dưới video        |   ✅ Rất cao |     ⭐⭐ |
| RAG cho chatbot               |   ✅ Rất cao |    ⭐⭐⭐ |
| Tích hợp tất cả               |       ✅ Cao |   ⭐⭐⭐⭐ |
| Chạy ổn trên nhiều điện thoại | ⚠️ Cần test |   ⭐⭐⭐⭐ |

**Tổng thể: khoảng 8.5–9/10 về tính khả thi cho POC.**

Điểm quan trọng là bạn đã **loại bỏ Plane Detection**, vốn là một trong những phần rủi ro nhất của WebAR.

Hiện tại bạn chỉ cần:

> **Image Tracking + 2D UI + Video + Chatbot**

Đây là scope rất phù hợp với 8 tuần.

---

# 2. Tôi đề xuất thay đổi một chút cách hiểu về "3 poster ảo"

Có một điểm tôi muốn chỉnh trong thiết kế của bạn.

Không nên hiểu:

> Quét poster → 3 poster ảo nằm cố định trong không gian 3D → người dùng phải đi quanh chúng.

Mà nên thiết kế:

> **Quét poster → mở một AR experience → 3 poster ảo xuất hiện như một carousel trong không gian camera.**

Ví dụ:

```text
              CAMERA
                 │
                 ▼
        ┌─────────────────┐
        │  POSTER VẬT LÝ  │
        │                 │
        │     HÁT XOAN    │
        └─────────────────┘
                 │
                 │ Image Tracking
                 ▼
       ┌──────────────────────┐
       │      AR EXPERIENCE   │
       │                      │
       │   ←  ┌─────────┐ →   │
       │      │ BÀI 2   │      │
       │      │         │      │
       │      │ POSTER  │      │
       │      └─────────┘      │
       │                      │
       │   ●  ○  ○            │
       │                      │
       └──────────────────────┘
```

Người dùng:

**Swipe trái/phải**

→ poster chuyển

→ poster ở giữa được focus

→ bấm poster

→ mở nội dung.

Cách này vừa có cảm giác AR, vừa giống một **interactive exhibition**.

---

# 3. User Journey mới

Tôi đề xuất UX cuối cùng như sau.

## Phase 1 — Scan

Minh nhìn thấy:

```text
┌───────────────────────────────┐
│                               │
│       BẢO TỒN HÁT XOAN       │
│                               │
│       [HÌNH ẢNH HÁT XOAN]     │
│                               │
│             QR                │
│                               │
│     Quét để khám phá          │
└───────────────────────────────┘
```

Minh quét QR.

Browser mở:

```text
HÁT XOAN
Khám phá di sản bằng AR

[ Bắt đầu trải nghiệm ]
```

---

# 4. Phase 2 — Image Tracking

Minh bấm:

> **Bắt đầu trải nghiệm**

Camera mở.

Hệ thống hướng dẫn:

> Đưa camera về phía poster.

MindAR nhận diện poster.

Sau khi tracking thành công:

```text
          CAMERA VIEW

      ┌──────────────────┐
      │                  │
      │    POSTER        │
      │     VẬT LÝ       │
      │                  │
      └──────────────────┘

        ←  [ POSTER ]  →
             ○ ○ ○
```

3 poster ảo xuất hiện.

Ví dụ:

```text
        ←

      ┌───────────┐
      │           │
      │  BÀI 1    │
      │           │
      │  LỚP      │
      │  ...      │
      └───────────┘

      ┌───────────┐
      │           │
      │  BÀI 2    │
      │           │
      │  ...      │
      └───────────┘

      ┌───────────┐
      │           │
      │  BÀI 3    │
      │           │
      │  ...      │
      └───────────┘

                 →
```

Nhưng trên mobile, tôi **không khuyến nghị để cả 3 poster to ngang nhau**.

Nên làm kiểu:

```text
             ┌───────────┐
             │           │
      ┌──────│  BÀI 2    │──────┐
      │ BÀI1 │           │ BÀI3 │
      │      └───────────┘      │
             ● ○ ○
```

Poster trung tâm lớn hơn.

Hai poster bên cạnh nhỏ hơn.

Khi swipe:

```text
Before:

      BÀI 1     BÀI 2     BÀI 3
                  ↑
               selected


Swipe →

                BÀI 1     BÀI 2     BÀI 3
                            ↑
                         selected
```

Cảm giác sẽ giống **Netflix / Apple Music carousel**, nhưng nằm trong AR.

---

# 5. Phase 3 — Chọn bài hát

Khi người dùng bấm poster:

```text
        ┌──────────────────┐
        │                  │
        │     BÀI 2        │
        │                  │
        │   [Hình ảnh]     │
        │                  │
        │  Xem biểu diễn   │
        │                  │
        └──────────────────┘
```

Hệ thống chuyển sang:

```text
┌──────────────────────────────┐
│                              │
│       VIDEO BIỂU DIỄN       │
│                              │
│      ▶                      │
│                              │
├──────────────────────────────┤
│                              │
│  🤖 Hỏi về bài hát này       │
│                              │
│  ┌────────────────────────┐  │
│  │ Hỏi điều gì đó...      │  │
│  └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```

Đây là điểm tôi thấy **rất hay về mặt nghiên cứu**.

Bởi vì lúc này:

> AR không chỉ "hiện vật 3D".

Nó trở thành:

> **AR-based interactive information presentation.**

---

# 6. Một thay đổi quan trọng: Video không nhất thiết phải là AR

Đây là điểm tôi khuyên bạn nên giữ.

Sau khi chọn poster:

**Không cần cố làm video thành vật thể 3D trong AR.**

Có thể chuyển sang một **AR information panel / floating video panel**.

Ví dụ:

```text
          CAMERA

        POSTER VẬT LÝ

              │
              ▼

       ┌────────────────┐
       │                │
       │   VIDEO HÁT    │
       │     XOAN       │
       │                │
       │       ▶        │
       └────────────────┘

       ┌────────────────┐
       │ 🤖 Hỏi Chatbot │
       │                │
       │ [................]
       └────────────────┘
```

Như vậy vẫn nằm trong AR experience nhưng **không phải làm video texture lên một object 3D phức tạp**.

Điều này giảm rất nhiều độ khó.

---

# 7. Nhưng có một vấn đề kỹ thuật rất quan trọng

Bạn cần phân biệt:

### A. Video trong HTML UI

```text
AR camera
   +
HTML overlay
   +
<video>
```

vs.

### B. Video là object trong Three.js

```text
AR camera
   +
Three.js scene
   +
VideoTexture
```

Tôi khuyên **POC dùng A trước**.

Tức là:

```text
MindAR
   │
   ├── AR canvas
   │
   └── HTML UI
         ├── Carousel
         ├── Video
         └── Chatbot
```

Lý do:

* dễ responsive
* dễ swipe
* dễ làm chatbot
* dễ điều khiển video
* dễ debug
* dễ làm UI đẹp
* không cần xử lý video texture phức tạp

---

# 8. Kiến trúc AR mới

Tôi sẽ thiết kế kiến trúc thành:

```text
                    POSTER VẬT LÝ
                          │
                         QR
                          │
                          ▼
                    WEB APPLICATION
                          │
                          ▼
                     IMAGE TRACKING
                       MindAR
                          │
                          ▼
                 ┌──────────────────┐
                 │   AR EXPERIENCE  │
                 │                  │
                 │  Virtual Posters │
                 │       │          │
                 │       ▼          │
                 │    Carousel      │
                 │       │          │
                 │       ▼          │
                 │    Select Song   │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  Song Experience │
                 │                  │
                 │      Video       │
                 │        +         │
                 │     Chatbot      │
                 └────────┬─────────┘
                          │
                          ▼
                       FastAPI
                     /          \
                    /            \
                   ▼              ▼
             PostgreSQL        RAG
                                  │
                           ┌──────┴──────┐
                           │             │
                      Vector DB        LLM
```

---

# 9. Vai trò của từng công nghệ

Bây giờ hệ thống của bạn sẽ rõ ràng hơn rất nhiều.

| Công nghệ  | Vai trò             |
| ---------- | ------------------- |
| QR         | Entry point         |
| React      | Web UI              |
| MindAR     | Image tracking      |
| Three.js   | Render AR           |
| HTML/CSS   | Carousel + UI       |
| JavaScript | Interaction         |
| Video      | Nội dung biểu diễn  |
| FastAPI    | Backend             |
| PostgreSQL | Metadata            |
| ChromaDB   | Knowledge retrieval |
| RAG        | Grounding chatbot   |
| LLM        | Sinh câu trả lời    |

Đặc biệt:

> **AR không chịu trách nhiệm trả lời câu hỏi.**

AR chỉ chịu trách nhiệm:

> **Nhận diện → hiển thị → tương tác → dẫn người dùng tới nội dung.**

Chatbot chịu trách nhiệm:

> **Hiểu câu hỏi → retrieval → trả lời.**

---

# 10. Data model nên thiết kế ngay từ đầu

Đừng hard-code:

```javascript
poster1.mp4
poster2.mp4
poster3.mp4
```

Hãy thiết kế dữ liệu.

Ví dụ:

```json
{
  "id": "song_001",
  "title": "Bài hát 1",
  "poster": "/assets/posters/song1.webp",
  "video": "/assets/videos/song1.mp4",
  "description": "...",
  "knowledge_id": "xoan_song_001"
}
```

Sau này frontend gọi:

```http
GET /api/songs
```

Backend trả:

```json
[
  {
    "id": "song_001",
    "title": "...",
    "poster": "...",
    "video": "..."
  },
  {
    "id": "song_002",
    "title": "...",
    "poster": "...",
    "video": "..."
  },
  {
    "id": "song_003",
    "title": "...",
    "poster": "...",
    "video": "..."
  }
]
```

Carousel tự render.

Đây sẽ giúp hệ thống của bạn **có kiến trúc sản phẩm thực sự**, thay vì chỉ là demo.

---

# 11. Chatbot nên "biết" người dùng đang xem bài nào

Đây là chỗ tôi nghĩ bạn có thể làm rất hay.

Ví dụ người dùng đang xem:

```text
Song ID = xoan_001
```

Chatbot tự nhận context:

```json
{
  "current_song": "xoan_001"
}
```

Người dùng hỏi:

> "Bài này có ý nghĩa gì?"

Chatbot không cần đoán "bài này" là gì.

Backend nhận:

```text
question:
"Bài này có ý nghĩa gì?"

context:
song_id = xoan_001
```

RAG:

```text
Query
 ↓
Retrieve knowledge about xoan_001
 ↓
LLM
 ↓
Answer
```

Trải nghiệm sẽ tự nhiên hơn rất nhiều.

---

# 12. Thậm chí có thể thiết kế chatbot contextual

Ví dụ:

```text
🎵 Đang khám phá:
Bài hát X

🤖 Trợ lý Hát Xoan

Bạn có thể hỏi:

• Bài này có nguồn gốc từ đâu?
• Nội dung bài hát là gì?
• Ai thường biểu diễn?
• Trang phục trong bài này có ý nghĩa gì?
```

Sau đó:

```text
Người dùng:
"Trang phục này có ý nghĩa gì?"

Chatbot:
Theo tài liệu ..., trang phục ...
```

Điều này kết nối:

**AR → Knowledge Base → Chatbot**

rất đẹp về mặt kiến trúc nghiên cứu.

---

# 13. Một điểm tôi đặc biệt khuyên bạn: đừng làm 3 poster thành 3 Image Target

Bạn có thể nghĩ:

> Poster vật lý → hiện poster ảo → mỗi poster lại tracking một target.

**Không cần.**

Chỉ cần:

```text
POSTER VẬT LÝ
      │
      │ Image Target
      ▼
AR Scene
      │
      ├── Virtual Poster 1
      ├── Virtual Poster 2
      └── Virtual Poster 3
```

3 poster ảo chỉ là **3 object/UI trong cùng một AR scene**.

Điều này đơn giản hơn rất nhiều.

---

# 14. Swipe nên làm thế nào?

Có 2 hướng.

## Cách 1 — HTML/CSS Carousel

Tôi khuyến nghị.

```text
touchstart
     ↓
touchmove
     ↓
touchend
     ↓
calculate direction
     ↓
change selectedIndex
```

Ví dụ:

```text
swipe left
     ↓
index++
     ↓
poster animation
```

Ưu điểm:

* dễ
* mượt
* responsive
* dễ debug

---

## Cách 2 — Gesture trong Three.js

Ví dụ:

```text
Touch
 ↓
Raycaster
 ↓
3D Object
 ↓
drag
```

Khó hơn.

Không cần thiết cho POC.

---

# 15. Tôi sẽ thiết kế interaction như sau

### Trạng thái 1

```text
[ Poster 1 ] [ POSTER 2 ] [ Poster 3 ]
                 ↑
              selected
```

### Swipe trái

```text
[ Poster 2 ] [ POSTER 3 ] [ Poster 1 ]
                 ↑
              selected
```

### Swipe phải

```text
[ Poster 3 ] [ POSTER 1 ] [ Poster 2 ]
                 ↑
              selected
```

### Tap

```text
             ↓
       SELECT POSTER
             ↓
       SONG DETAIL
             ↓
       VIDEO + CHATBOT
```

Bạn có thể thêm animation:

```text
side poster
scale = 0.75

center poster
scale = 1.0
opacity = 1

transition:
300ms
ease-out
```

Sẽ khá đẹp.

---

# 16. Công nghệ tôi khuyên dùng

Tôi sẽ **không dùng Unity** cho phương án này.

Stack:

```text
Frontend
├── React
├── Vite
├── Three.js
├── MindAR
├── HTML/CSS
└── JavaScript

Backend
├── FastAPI
├── PostgreSQL
└── ChromaDB

AI
├── Embedding model
├── RAG
└── LLM

Assets
├── Poster
├── Video
└── Audio
```

MindAR phù hợp với phần image-tracking; Three.js phụ trách rendering/3D. Bạn không còn cần WebXR Plane Detection cho flow chính nữa.

Đây là một lợi thế lớn vì WebXR/AR hiện vẫn có khác biệt hỗ trợ đáng kể giữa trình duyệt. Dữ liệu tương thích hiện tại cho thấy Chrome Android hỗ trợ WebXR AR/hit-test, trong khi Safari trên iOS vẫn không hỗ trợ WebXR AR theo bảng hỗ trợ hiện tại. ([Can I Use][1])

**Do đó, nếu mục tiêu là "khách dùng điện thoại bất kỳ", bạn phải test thiết bị mục tiêu ngay từ đầu.**

---

# 17. Đây là thay đổi rất quan trọng đối với kế hoạch 8 tuần

Kế hoạch cũ có:

```text
Week 3
Plane Detection
3D scene
WebXR
```

Tôi sẽ **xóa hoàn toàn phần này khỏi MVP**.

Thay bằng:

```text
Week 3
AR Interaction + Carousel + Video
```

Điều này giải phóng rất nhiều thời gian.

---

# 18. Kế hoạch mới 8 tuần

## WEEK 1 — Web + Image Tracking

### Mục tiêu

Cuối tuần phải đạt:

```text
QR
 ↓
Website
 ↓
Camera
 ↓
Scan Poster
 ↓
AR activated
```

### Day 1

Thiết kế:

* user journey
* architecture
* folder structure
* Git repository

### Day 2

React/Vite.

### Day 3

Three.js.

Học:

* Scene
* Camera
* Renderer
* Mesh
* Texture

### Day 4

MindAR.

```text
Image Target
↓
Camera
↓
Tracking
```

### Day 5

Tạo poster target.

### Day 6

Render một AR object.

### Day 7

**GATE 1**

Điện thoại thật:

> QR → Camera → Poster tracking → AR object

Nếu chưa chạy trên điện thoại thật → **không chuyển Week 2.**

---

# 19. WEEK 2 — 3 Virtual Posters

Mục tiêu:

```text
Poster physical
       ↓
Image tracking
       ↓
3 virtual posters
```

### Day 8

Thiết kế 3 poster.

### Day 9

Import poster textures.

### Day 10

Position:

```text
Poster 1
Poster 2
Poster 3
```

### Day 11

Scale animation.

### Day 12

Center selection.

### Day 13

Visual effects.

### Day 14

**GATE 2**

Phải có:

> Scan → 3 poster xuất hiện.

---

# 20. WEEK 3 — Carousel Interaction

Đây là tuần cực kỳ quan trọng.

### Day 15

Touch event.

```text
touchstart
touchmove
touchend
```

### Day 16

Swipe detection.

### Day 17

Carousel.

### Day 18

Animation.

### Day 19

Tap poster.

### Day 20

State management:

```javascript
selectedSong
```

### Day 21

**GATE 3**

Phải làm được:

```text
Scan
 ↓
3 posters
 ↓
Swipe
 ↓
Select
 ↓
Open song
```

---

# 21. WEEK 4 — Video Experience

Mục tiêu:

```text
Select poster
       ↓
Song detail
       ↓
Video
```

### Day 22

Collect 3 videos.

### Day 23

Video compression.

### Day 24

HTML video player.

### Day 25

Poster → video mapping.

### Day 26

Loading screen.

### Day 27

Play/pause/fullscreen.

### Day 28

**GATE 4**

```text
Poster
 ↓
Select
 ↓
Correct video
 ↓
Play
```

---

# 22. WEEK 5 — Database + Backend

Mục tiêu:

Không hard-code dữ liệu nữa.

```text
Frontend
    ↓
FastAPI
    ↓
Database
```

Database:

```text
songs
├── id
├── title
├── description
├── poster_url
├── video_url
└── knowledge_id
```

### Day 29

ERD.

### Day 30

PostgreSQL/SQLite.

### Day 31

FastAPI.

### Day 32

API:

```http
GET /songs
GET /songs/{id}
```

### Day 33

Frontend integration.

### Day 34

AR → `song_id`.

### Day 35

**GATE 5**

Không còn hard-code nội dung chính.

---

# 23. WEEK 6 — Chatbot + RAG

Mục tiêu:

```text
Video
  +
Chatbot
  ↓
Question
  ↓
RAG
  ↓
Answer
  ↓
Source
```

### Day 36

Thu thập tài liệu Hát Xoan.

### Day 37

Cleaning.

### Day 38

Chunking.

### Day 39

Embedding.

### Day 40

ChromaDB.

### Day 41

RAG.

### Day 42

Context:

```text
song_id
+
question
```

---

# 24. WEEK 7 — Integration

Đây là tuần quan trọng nhất.

Full flow:

```text
             QR
              ↓
             WEB
              ↓
       CAMERA / AR
              ↓
      IMAGE TRACKING
              ↓
       3 VIRTUAL POSTERS
              ↓
        SWIPE CAROUSEL
              ↓
         SELECT SONG
              ↓
       VIDEO EXPERIENCE
              ↓
          CHATBOT
              ↓
            RAG
              ↓
         KNOWLEDGE DB
              ↓
           ANSWER
```

### Day 43

Homepage.

### Day 44

AR UI.

### Day 45

Carousel + video.

### Day 46

Chatbot.

### Day 47

Context-aware chatbot.

### Day 48

Source citation.

### Day 49

QR → end-to-end.

---

# 25. WEEK 8 — Evaluation

Bạn cần biến nó từ:

> "Demo công nghệ"

thành:

> **POC có đánh giá nghiên cứu.**

## Technical metrics

Bạn có thể đo:

### AR

* Tracking success rate
* Tracking time
* Interaction success rate

### Web

* Initial loading time
* Video loading time

### Chatbot

* Answer accuracy
* Faithfulness
* Response time

---

# 26. User experiment

Ví dụ:

**20–30 người dùng.**

Cho họ thực hiện:

### Task 1

Scan QR.

### Task 2

Scan poster.

### Task 3

Swipe 3 poster.

### Task 4

Select một bài.

### Task 5

Xem video.

### Task 6

Đặt câu hỏi cho chatbot.

Sau đó khảo sát:

| Tiêu chí               | 1–5 |
| ---------------------- | --: |
| Dễ sử dụng             |     |
| Dễ tương tác           |     |
| AR thú vị              |     |
| Carousel thú vị        |     |
| Video hữu ích          |     |
| Chatbot hữu ích        |     |
| Dễ tiếp nhận thông tin |     |
| Hài lòng               |     |
| Muốn tìm hiểu thêm     |     |

---

# 27. Điểm mạnh của phương án mới về mặt luận văn

Tôi đánh giá **phương án mới còn phù hợp với mục tiêu nghiên cứu hơn phương án cũ ở khía cạnh UX**.

Bạn có thể mô hình hóa:

```text
Traditional Exhibition
        │
        ▼
      Poster
        │
        ▼
   Static Information
```

Trong hệ thống của bạn:

```text
Physical Poster
       │
       ▼
      AR
       │
       ▼
Interactive Song Selection
       │
       ▼
Video Performance
       │
       ▼
Conversational QA
       │
       ▼
Knowledge Exploration
```

Tức là:

> **Passive viewing → Interactive exploration → Conversational learning**

Đây là narrative rất tốt cho báo cáo.

---

# 28. Tôi cũng đề xuất bỏ luôn "3D sân khấu" khỏi MVP

Không phải vì nó không hay.

Mà vì:

### Phương án cũ

```text
Image Tracking
      ↓
Plane Detection
      ↓
3D environment
      ↓
Multiple characters
      ↓
Animation
      ↓
Audio
      ↓
Chatbot
```

Có quá nhiều risk.

Trong khi phương án mới:

```text
Image Tracking
      ↓
Virtual Posters
      ↓
Carousel
      ↓
Video
      ↓
Chatbot
```

Ít risk hơn rất nhiều.

Bạn có thể đưa:

> **3D performance scene / Plane Detection**

vào **Future Development**.

---

# 29. Tuy nhiên, tôi muốn cảnh báo một vấn đề

Bạn nói:

> "sau khi quét poster đó thì nó sẽ hiện ra 3 poster ảo"

Nếu 3 poster chỉ đơn giản là **3 ảnh 2D phẳng**, giám khảo có thể hỏi:

> "Vậy AR ở đây có gì khác website bình thường?"

Đây là câu hỏi rất đáng lo.

Vì vậy, tôi khuyên **3 poster phải có một chút spatial/AR behavior**.

Ví dụ:

```text
Physical Poster
       ↓
AR tracking
       ↓
3 floating posters
       ↓
poster depth
poster scale
poster rotation
floating animation
parallax
```

Khi camera di chuyển:

```text
camera move
     ↓
virtual posters remain anchored
     ↓
parallax/spatial effect
```

Như vậy mới có:

> **AR interaction**

chứ không phải:

> Website mở 3 ảnh.

---

# 30. Thiết kế visual tôi khuyên dùng

Ví dụ:

```text
               CAMERA

     ┌─────────────────────────┐
     │                         │
     │        HÁT XOAN         │
     │                         │
     │   ┌─────┐ ┌──────┐     │
     │   │ B1  │ │  B2  │     │
     │   └─────┘ └──────┘     │
     │             ┌─────┐    │
     │             │ B3  │    │
     │             └─────┘    │
     │                         │
     │       ← Swipe →         │
     │                         │
     │          ● ○ ○          │
     └─────────────────────────┘
```

Nhưng animation:

```text
Poster 1
  ↓
rotate slightly

Poster 2
  ↓
scale 1.0
glow/highlight

Poster 3
  ↓
scale 0.8
```

Khi swipe:

```text
300–500ms transition
```

Tôi nghĩ đây sẽ tạo cảm giác khá tốt trên điện thoại.

---

# 31. Kiến trúc code tôi đề xuất

Ngay từ đầu nên tổ chức:

```text
frontend/
│
├── src/
│   ├── components/
│   │   ├── ARScene/
│   │   ├── PosterCarousel/
│   │   ├── SongCard/
│   │   ├── VideoPlayer/
│   │   └── Chatbot/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── ARExperience/
│   │   └── SongExperience/
│   │
│   ├── services/
│   │   ├── api.js
│   │   └── chatbot.js
│   │
│   └── data/
│
├── public/
│   ├── targets/
│   ├── posters/
│   ├── videos/
│   └── images/
│
backend/
│
├── app/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── rag/
│   └── database/
│
└── data/
```

---

# 32. MVP cuối cùng tôi chốt cho bạn

Nếu tôi là người quản lý technical scope của project này, tôi sẽ chốt:

### MUST HAVE

```text
[1] Physical Poster
        ↓
[2] QR
        ↓
[3] Web
        ↓
[4] Camera
        ↓
[5] Image Tracking
        ↓
[6] 3 Virtual Posters
        ↓
[7] Swipe Carousel
        ↓
[8] Select Song
        ↓
[9] Video
        ↓
[10] Contextual Chatbot
        ↓
[11] RAG
        ↓
[12] Sources
```

### SHOULD HAVE

```text
+ AR animations
+ spatial depth
+ poster parallax
+ loading animation
+ suggested questions
+ chat history
```

### COULD HAVE

```text
+ voice input
+ voice output
+ English
+ more songs
+ quiz
```

### WON'T HAVE

```text
❌ Plane Detection
❌ VR
❌ Native mobile app
❌ Full 3D performance environment
❌ Photorealistic digital human
❌ Custom motion capture
❌ Kubernetes
❌ Microservices
```

---

# 33. Kết luận của tôi

**Tôi ủng hộ bạn chuyển sang phương án này.**

Thậm chí tôi đánh giá nó **phù hợp với POC 2 tháng hơn phương án 3D Plane Detection trước đó**.

Luồng chính thức nên là:

```text
             PHYSICAL POSTER
                    │
                   QR
                    │
                    ▼
               WEB APP
                    │
                    ▼
              IMAGE TRACKING
                    │
                    ▼
           ┌─────────────────┐
           │  3 AR POSTERS   │
           │                 │
           │ ← SWIPE →       │
           └────────┬────────┘
                    │
              SELECT SONG
                    │
                    ▼
           ┌─────────────────┐
           │      VIDEO      │
           │                 │
           ├─────────────────┤
           │    CHATBOT      │
           │       ↓         │
           │      RAG        │
           │       ↓         │
           │ KNOWLEDGE BASE  │
           └─────────────────┘
```

Và về mặt ý tưởng nghiên cứu, bạn có thể diễn đạt nó rất đẹp:

> **“Sử dụng WebAR để chuyển poster vật lý từ một phương tiện cung cấp thông tin tĩnh thành một điểm tương tác số, cho phép người dùng khám phá các tiết mục Hát Xoan thông qua lựa chọn trực quan, xem nội dung biểu diễn và tương tác với trợ lý hội thoại dựa trên cơ sở tri thức.”**

Đây là hướng tôi sẽ chọn nếu mục tiêu của bạn là **làm được một POC hoàn chỉnh, đẹp khi demo, có thành phần AI/RAG, có AR thực sự, và vẫn đủ thời gian để đánh giá người dùng và viết luận văn**.

**Một việc tôi khuyên làm ngay trước khi code:** thiết kế **wireframe + state machine của toàn bộ AR experience** trước. Sau đó mới chia thành component React/Three.js/MindAR. Đây sẽ là bước giúp bạn tránh việc code AR rồi mới phát hiện UX bị rối.

[1]: https://caniuse.com/wf-webxr-ar?utm_source=chatgpt.com "Augmented reality | Can I use... Support tables for HTML5, CSS3, etc"
