# HÁT XOAN DIGITAL EXPERIENCE

## Implementation Plan — Web + Backend + Database + Global RAG Chatbot + WebAR Integration

> **Mục tiêu:** Xây dựng một POC trải nghiệm số về Hát Xoan gồm nền tảng Web cung cấp thông tin và Chatbot hỏi đáp dựa trên một Knowledge Base chung, đồng thời tích hợp một module WebAR độc lập được xây dựng bằng Zapworks.

---

# 1. Project Scope

## 1.1. Phạm vi hệ thống

Hệ thống gồm 2 trải nghiệm chính:

### A. Web Information Platform

Website cung cấp:

* Thông tin tổng quan về Hát Xoan.
* Lịch sử và giá trị văn hóa.
* Danh sách các bài hát.
* Trang thông tin chi tiết từng bài hát.
* Hình ảnh, video và các tài nguyên liên quan.
* Chatbot hỏi đáp về **toàn bộ kiến thức Hát Xoan**.

### B. WebAR Experience

Module WebAR do thành viên khác phụ trách bằng **Zapworks**:

```text
Physical Poster
      ↓
Image Tracking
      ↓
AR Experience
      ↓
3 Virtual Song Posters
      ↓
User selects a poster
      ↓
Video appears and plays inside AR world
```

AR không chuyển người dùng sang Web để phát video.

---

# 2. Core Architecture

```text
                           USER
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
        ┌──────────────┐          ┌──────────────┐
        │     WEB      │          │     WEBAR    │
        │              │          │   Zapworks   │
        │ Information  │          │              │
        │ Song Pages   │          │ Image Track  │
        │ Video        │          │ AR Posters   │
        │ Chatbot      │          │ AR Video     │
        └──────┬───────┘          └──────────────┘
               │
               ▼
        ┌──────────────┐
        │   BACKEND    │
        │    FastAPI   │
        └──────┬───────┘
               │
        ┌──────┴──────────┐
        │                 │
        ▼                 ▼
 ┌──────────────┐  ┌────────────────┐
 │ PostgreSQL   │  │ Knowledge Base │
 │ / Supabase   │  │      RAG       │
 └──────────────┘  └───────┬────────┘
                            │
                            ▼
                           LLM
```

## 2.1. Architectural Principle

> **WebAR là một module độc lập, không phải core backend của hệ thống.**

Web và WebAR chỉ cần dùng chung:

* Song ID
* Asset ID
* Asset metadata
* Content source

Trong MVP, WebAR **không bắt buộc phải gọi Backend API**.

---

# 3. Technology Stack

| Layer           | Technology                       | Responsibility                          |
| --------------- | -------------------------------- | --------------------------------------- |
| WebAR           | Zapworks                         | AR tracking + AR interaction + AR video |
| Frontend        | Next.js / React                  | Website                                 |
| Backend         | FastAPI                          | REST API + Chat API                     |
| Database        | PostgreSQL / Supabase            | Structured data                         |
| Storage         | Supabase Storage / Cloud Storage | Images/videos/assets                    |
| RAG             | Dify / custom RAG                | Knowledge retrieval                     |
| Vector DB       | Dify managed / Qdrant / pgvector | Vector search                           |
| Embedding       | Multilingual embedding model     | Document embedding                      |
| Reranker        | Multilingual reranker            | Retrieval refinement                    |
| LLM             | Gemini / OpenAI / suitable LLM   | Answer generation                       |
| Hosting         | Vercel + backend hosting         | Deployment                              |
| Version Control | Git + GitHub                     | Source code                             |

> Không sử dụng n8n trong MVP nếu chưa có workflow automation thực sự cần thiết.

---

# 4. Repository Structure

Đề xuất cấu trúc:

```text
hat-xoan-digital/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── songs/
│   │   ├── songs/[slug]/
│   │   ├── ar/
│   │   └── sources/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── song/
│   │   ├── chatbot/
│   │   ├── video/
│   │   └── common/
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   └── types.ts
│   │
│   └── public/
│       └── assets/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── songs.py
│   │   │   ├── content.py
│   │   │   └── chat.py
│   │   │
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   │   ├── song_service.py
│   │   │   └── chat_service.py
│   │   │
│   │   └── core/
│   │       └── config.py
│   │
│   └── requirements.txt
│
├── data/
│   ├── raw/
│   ├── cleaned/
│   ├── knowledge/
│   ├── assets/
│   └── sources/
│
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── api.md
│   ├── chatbot.md
│   └── ar-integration.md
│
├── tests/
│   ├── backend/
│   ├── chatbot/
│   └── integration/
│
└── README.md
```

---

# 5. Phase 1 — System Requirements & Architecture

## Week 1

### 5.1. Functional Requirements

### Web

```text
FR-WEB-01: View homepage
FR-WEB-02: View general Hát Xoan information
FR-WEB-03: View list of songs
FR-WEB-04: View song details
FR-WEB-05: View song media
FR-WEB-06: Use chatbot
FR-WEB-07: Access AR experience
```

### Chatbot

```text
FR-CHAT-01: Answer general Hát Xoan questions
FR-CHAT-02: Answer song-related questions
FR-CHAT-03: Answer cultural/historical questions
FR-CHAT-04: Support multi-turn conversation
FR-CHAT-05: Use knowledge-grounded answers
FR-CHAT-06: Handle out-of-scope questions
```

### AR

```text
FR-AR-01: Detect physical poster
FR-AR-02: Display virtual posters
FR-AR-03: Select virtual poster
FR-AR-04: Display selected performance video
FR-AR-05: Play video inside AR environment
```

---

# 6. Phase 2 — Data Design

## Week 2

The data layer is divided into:

```text
Structured Data
        +
Knowledge Data
        +
Media Assets
        +
Source Metadata
```

---

## 6.1. Song Entity

Table: `songs`

```sql
CREATE TABLE songs (
    id UUID PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    description TEXT,
    lyrics TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    status VARCHAR(30) DEFAULT 'draft',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

Example:

```json
{
  "id": "xoan_001",
  "slug": "bai-xoan-1",
  "title": "Bài Xoan 1",
  "short_description": "...",
  "description": "...",
  "lyrics": "...",
  "thumbnail_url": "...",
  "video_url": "...",
  "status": "published"
}
```

---

# 7. Asset Management

Table: `assets`

```sql
CREATE TABLE assets (
    id UUID PRIMARY KEY,
    song_id UUID,
    asset_type VARCHAR(50),
    url TEXT NOT NULL,
    source TEXT,
    author TEXT,
    license TEXT,
    description TEXT,
    created_at TIMESTAMP
);
```

Supported asset types:

```text
image
video
audio
document
ar_poster
ar_video
```

---

# 8. Source Management

Vì tài nguyên được thu thập từ Internet, cần quản lý provenance.

File:

```text
data/sources/asset_sources.xlsx
```

Fields:

| Field         | Description                      |
| ------------- | -------------------------------- |
| Asset         | Tên tài nguyên                   |
| Type          | Image / Video / Audio / Document |
| Source        | Nguồn                            |
| Author        | Tác giả                          |
| License       | Điều kiện sử dụng                |
| URL           | Link                             |
| Date Accessed | Ngày truy cập                    |
| Purpose       | Mục đích sử dụng                 |

---

# 9. Knowledge Base Design

## 9.1. Global Knowledge Base

Chatbot sử dụng:

```text
ONE KNOWLEDGE BASE
```

Không xây:

```text
Song Chatbot
History Chatbot
Culture Chatbot
```

mà:

```text
              HÁT XOAN KNOWLEDGE BASE
                       │
       ┌───────────────┼────────────────┐
       │               │                │
    History          Songs           Culture
       │               │                │
   Performance      Lyrics          Costumes
       │               │                │
       └───────────────┴────────────────┘
                       │
                       ▼
                    Chatbot
```

---

## 9.2. Knowledge Metadata

Mặc dù chỉ có một Knowledge Base, document vẫn cần metadata.

Ví dụ:

```json
{
  "content": "...",
  "metadata": {
    "topic": "song",
    "song_id": "xoan_001",
    "source": "source_001"
  }
}
```

Metadata phục vụ:

* Filtering
* Debugging
* Citation
* Retrieval analysis
* Evaluation

---

# 10. Knowledge Processing Pipeline

```text
Raw Documents
      ↓
Cleaning
      ↓
Normalization
      ↓
Chunking
      ↓
Metadata Assignment
      ↓
Embedding
      ↓
Vector Database
      ↓
RAG Retrieval
```

## Chunking

Ưu tiên semantic/structure-aware chunking.

Ví dụ:

```text
Document
 ├── Section
 │    ├── Subsection
 │    └── Paragraph
 └── Section
```

Không chia document thành các chunk có kích thước cố định một cách máy móc nếu làm mất ngữ nghĩa.

---

# 11. RAG Architecture

```text
USER
 │
 ▼
Chat UI
 │
 ▼
POST /api/chat
 │
 ▼
Query Processing
 │
 ├───────────────┐
 ▼               ▼
Vector Search    BM25
 │               │
 └───────┬───────┘
         ▼
      Reranker
         │
         ▼
    Top-K Context
         │
         ▼
     Prompt Builder
         │
         ▼
        LLM
         │
         ▼
      Response
```

---

# 12. Chat API

Endpoint:

```http
POST /api/chat
```

Request:

```json
{
  "message": "Hát Xoan có nguồn gốc từ đâu?",
  "conversation_id": "abc123"
}
```

Response:

```json
{
  "answer": "...",
  "conversation_id": "abc123",
  "sources": [
    {
      "title": "...",
      "source": "..."
    }
  ]
}
```

---

# 13. Conversation Memory

Memory chỉ lưu context hội thoại.

```text
Knowledge Base
    ≠
Conversation Memory
```

Architecture:

```text
User
 ↓
Chat API
 ↓
Conversation Memory
 ↓
Retriever
 ↓
Knowledge Base
 ↓
LLM
 ↓
Answer
```

Memory có thể triển khai ở mức:

```text
conversation_id
+
recent messages
```

Trong POC, không cần xây hệ thống memory quá phức tạp.

---

# 14. Backend Architecture

## 14.1. Layered Architecture

```text
                 FastAPI
                    │
              API / Router
                    │
                Service
                    │
             Repository / DB
                    │
             PostgreSQL
```

Chi tiết:

```text
backend/app/
│
├── api/
│   ├── songs.py
│   ├── content.py
│   └── chat.py
│
├── services/
│   ├── song_service.py
│   └── chat_service.py
│
├── repositories/
│   └── song_repository.py
│
├── models/
│   └── song.py
│
└── schemas/
    ├── song.py
    └── chat.py
```

---

# 15. Backend API Specification

## Songs

```http
GET /api/songs
```

Return:

```json
[
  {
    "id": "xoan_001",
    "title": "Bài Xoan 1",
    "thumbnail_url": "...",
    "short_description": "..."
  }
]
```

---

### Song Detail

```http
GET /api/songs/{id}
```

---

### Assets

```http
GET /api/songs/{id}/assets
```

---

### Chat

```http
POST /api/chat
```

---

### Health

```http
GET /health
```

---

# 16. Frontend Architecture

## 16.1. Pages

```text
/
├── Home
│
├── /about
│   └── General Hát Xoan information
│
├── /songs
│   └── Song Explorer
│
├── /songs/[slug]
│   └── Song Detail
│
├── /ar
│   └── AR Entry
│
└── /sources
    └── Source information
```

---

# 17. Frontend Components

```text
components/
│
├── layout/
│   ├── Header
│   ├── Footer
│   └── Navigation
│
├── song/
│   ├── SongCard
│   ├── SongGrid
│   ├── SongHeader
│   └── SongInfo
│
├── video/
│   └── VideoPlayer
│
├── chatbot/
│   ├── ChatButton
│   ├── ChatWindow
│   ├── MessageList
│   └── ChatInput
│
└── common/
    ├── Loading
    ├── Error
    └── Button
```

---

# 18. Web User Flow

```text
Homepage
   │
   ├── Explore Hát Xoan
   │       ↓
   │    Information
   │
   ├── Explore Songs
   │       ↓
   │    Song List
   │       ↓
   │    Song Detail
   │       ↓
   │    Video
   │
   ├── Chatbot
   │       ↓
   │    Global Hát Xoan QA
   │
   └── AR
           ↓
       Zapworks
```

---

# 19. Chatbot Frontend

Chatbot xuất hiện trên toàn website.

```text
┌───────────────────────────────────┐
│              WEBSITE              │
│                                   │
│                                   │
│                                   │
│                            ┌────┐ │
│                            │ 💬 │ │
│                            └────┘ │
└───────────────────────────────────┘
```

Khi click:

```text
┌──────────────────────────────┐
│ Chatbot Hát Xoan             │
├──────────────────────────────┤
│ User: Hát Xoan là gì?       │
│                              │
│ Bot: ...                     │
│                              │
├──────────────────────────────┤
│ Nhập câu hỏi...         [→]  │
└──────────────────────────────┘
```

---

# 20. WebAR Integration

## 20.1. Principle

Web không xử lý AR logic.

Web chỉ cung cấp:

```text
[Trải nghiệm AR]
```

→ mở WebAR experience.

---

## 20.2. MVP Integration

```text
Website
   │
   │ Click
   ▼
Zapworks WebAR URL
   │
   ▼
AR Experience
   │
   ├── Physical Image Tracking
   │
   ├── Virtual Poster 1
   │       ↓
   │     Video 1
   │
   ├── Virtual Poster 2
   │       ↓
   │     Video 2
   │
   └── Virtual Poster 3
           ↓
         Video 3
```

---

# 21. AR Asset Contract

Hai team thống nhất một ID chung:

| Song ID    | Song   | AR Poster       | AR Video       |
| ---------- | ------ | --------------- | -------------- |
| `xoan_001` | Song 1 | `AR_POSTER_001` | `AR_VIDEO_001` |
| `xoan_002` | Song 2 | `AR_POSTER_002` | `AR_VIDEO_002` |
| `xoan_003` | Song 3 | `AR_POSTER_003` | `AR_VIDEO_003` |

Trong MVP:

> AR có thể lưu video trực tiếp trong Zapworks, không cần gọi API.

---

# 22. AR Integration Deliverables

AR team cần bàn giao:

```text
1. Published WebAR URL
2. AR project
3. Song → Poster mapping
4. Song → Video mapping
5. Required assets
6. Browser/device requirements
7. Known limitations
8. Deployment instructions
```

---

# 23. WebAR Fallback

Nếu AR không hoạt động:

```text
AR unavailable
      ↓
Explore Songs
      ↓
Song Detail
      ↓
Web Video
```

AR failure không được làm Website failure.

---

# 24. Week-by-Week Implementation Plan

## WEEK 1 — Requirements & Architecture

### Tasks

* [ ] Define functional requirements
* [ ] Define non-functional requirements
* [ ] Design system architecture
* [ ] Design database
* [ ] Define API
* [ ] Define RAG architecture
* [ ] Define AR integration contract
* [ ] Setup Git repository

### Deliverables

```text
System Architecture
ERD
API Specification
AR Integration Specification
Repository
```

### Definition of Done

```text
Architecture approved
Database schema approved
API contract approved
AR team understands integration boundary
```

---

# WEEK 2 — Data & Knowledge Base

### Tasks

* [ ] Collect Hát Xoan documents
* [ ] Collect song information
* [ ] Collect images/videos
* [ ] Record source/license
* [ ] Clean documents
* [ ] Normalize content
* [ ] Chunk documents
* [ ] Assign metadata
* [ ] Build first Knowledge Base

### Deliverables

```text
data/
├── raw/
├── cleaned/
├── knowledge/
├── assets/
└── sources/
```

### Definition of Done

* [ ] Knowledge Base contains all MVP knowledge
* [ ] Metadata exists
* [ ] Sources are recorded
* [ ] Retrieval returns relevant documents

---

# WEEK 3 — Backend & Database

### Tasks

* [ ] Create Supabase project
* [ ] Create PostgreSQL schema
* [ ] Implement Song CRUD
* [ ] Implement asset management
* [ ] Implement API schemas
* [ ] Implement service layer
* [ ] Implement REST API
* [ ] Add error handling
* [ ] Add CORS
* [ ] Add `/health`

### Deliverables

```text
Backend API v1
Database v1
Swagger/OpenAPI
```

### Definition of Done

```text
GET /api/songs
GET /api/songs/{id}
GET /api/songs/{id}/assets
GET /health
```

all work correctly.

---

# WEEK 4 — Frontend

### Tasks

* [ ] Setup Next.js/React
* [ ] Implement layout
* [ ] Implement homepage
* [ ] Implement About page
* [ ] Implement Song Explorer
* [ ] Implement Song Detail
* [ ] Implement video player
* [ ] Connect frontend to API
* [ ] Responsive mobile UI

### Deliverables

```text
Web MVP
```

### Definition of Done

User can:

```text
Open website
 ↓
View information
 ↓
Browse songs
 ↓
Open song
 ↓
View song information
 ↓
Watch video
```

---

# WEEK 5 — RAG Chatbot

### Tasks

* [ ] Complete Knowledge Base
* [ ] Configure embeddings
* [ ] Configure retrieval
* [ ] Configure reranking if required
* [ ] Configure LLM
* [ ] Design system prompt
* [ ] Implement Chat API
* [ ] Implement conversation memory
* [ ] Connect chatbot UI
* [ ] Test factual grounding
* [ ] Test out-of-scope questions

### Test Categories

```text
General
Historical
Cultural
Song
Performance
Lyrics
Multi-turn
Out-of-scope
```

### Definition of Done

```text
User
 ↓
Chatbot
 ↓
RAG
 ↓
Knowledge Base
 ↓
LLM
 ↓
Grounded Answer
```

works reliably.

---

# WEEK 6 — AR Integration

### Your responsibility

* [ ] Add AR entry point to website
* [ ] Verify Zapworks URL
* [ ] Verify mobile browser compatibility
* [ ] Verify QR flow
* [ ] Verify Song ID mapping
* [ ] Verify AR assets
* [ ] Verify fallback

### AR Team

* [ ] Image tracking
* [ ] Virtual posters
* [ ] Poster interaction
* [ ] AR video
* [ ] Video playback
* [ ] AR scene transitions

### Definition of Done

```text
QR
 ↓
Website
 ↓
AR Entry
 ↓
Zapworks
 ↓
Image Tracking
 ↓
Virtual Posters
 ↓
Select Poster
 ↓
Video plays inside AR
```

---

# WEEK 7 — Testing

## 7.1. Backend Testing

* [ ] API status
* [ ] Invalid ID
* [ ] Empty result
* [ ] Database connection
* [ ] API response time

## 7.2. Frontend Testing

* [ ] Desktop
* [ ] Android
* [ ] iPhone
* [ ] Chrome
* [ ] Safari
* [ ] Responsive layout

## 7.3. Chatbot Testing

* [ ] Answer accuracy
* [ ] Retrieval quality
* [ ] Hallucination
* [ ] Out-of-scope refusal
* [ ] Multi-turn conversation
* [ ] Response time

## 7.4. AR Testing

* [ ] Image tracking
* [ ] Poster recognition
* [ ] Interaction
* [ ] Video playback
* [ ] Lighting conditions
* [ ] Mobile compatibility

## 7.5. Integration Testing

```text
Web
 ↓
AR
```

and:

```text
Web
 ↓
Chatbot
 ↓
RAG
```

must work independently.

---

# WEEK 8 — Evaluation & Documentation

## Technical Evaluation

Collect:

```text
Page Load Time
API Latency
Chatbot Response Time
Retrieval Quality
Answer Accuracy
Video Loading Time
AR Success Rate
```

## User Evaluation

Target:

```text
20–30 participants
```

Tasks:

```text
1. Open website
2. Explore Hát Xoan information
3. Find a song
4. Watch video
5. Ask chatbot
6. Experience AR
7. Select virtual poster
8. Watch AR video
```

Likert 1–5:

```text
Usability
Visual attractiveness
Ease of interaction
Information usefulness
AR engagement
Chatbot usefulness
Satisfaction
Interest in learning more
```

---

# 25. Final System Flow

## Web

```text
                  USER
                    │
                    ▼
                 WEBSITE
                    │
       ┌────────────┼────────────┐
       │            │            │
       ▼            ▼            ▼
   General       Songs        Chatbot
   Content         │             │
                   ▼             ▼
              Song Detail       RAG
                   │             │
                   ▼             ▼
                 Video          LLM
```

## AR

```text
             PHYSICAL POSTER
                    │
                    ▼
              IMAGE TRACKING
                    │
                    ▼
             VIRTUAL POSTERS
              /      |      \
             /       |       \
            ▼        ▼        ▼
         Song 1    Song 2    Song 3
            │        │        │
            ▼        ▼        ▼
        AR Video  AR Video  AR Video
```

---

# 26. Definition of Done — Final POC

Dự án được xem là hoàn thành khi:

### Web

* [ ] Website responsive
* [ ] Homepage hoạt động
* [ ] Hát Xoan information hoạt động
* [ ] Song Explorer hoạt động
* [ ] Song Detail hoạt động
* [ ] Video hoạt động
* [ ] Chatbot hoạt động

### Backend

* [ ] Database hoạt động
* [ ] REST API hoạt động
* [ ] API documentation hoàn chỉnh
* [ ] Error handling
* [ ] Health check

### RAG

* [ ] Global Knowledge Base
* [ ] Retrieval hoạt động
* [ ] LLM trả lời dựa trên Knowledge Base
* [ ] Conversation memory
* [ ] Out-of-scope handling
* [ ] Source/citation support nếu triển khai

### AR

* [ ] Zapworks WebAR published
* [ ] Image tracking
* [ ] 3 virtual posters
* [ ] Poster interaction
* [ ] Video appears inside AR
* [ ] Video playback works
* [ ] Mobile testing completed

### Integration

* [ ] QR → Web
* [ ] Web → AR
* [ ] Web fallback khi AR unavailable
* [ ] Song ID mapping thống nhất
* [ ] Asset mapping thống nhất

### Documentation

* [ ] Architecture
* [ ] Database
* [ ] API
* [ ] RAG
* [ ] AR Integration
* [ ] Testing
* [ ] Evaluation
* [ ] Asset sources

---

# 27. Priority Matrix

## P0 — MUST HAVE

```text
Website
Database
Song information
Video
Global chatbot
Knowledge Base
RAG
AR entry
Zapworks AR
Virtual posters
AR video
```

## P1 — SHOULD HAVE

```text
Conversation memory
Source citations
Search
Analytics
Admin content management
Advanced retrieval
```

## P2 — FUTURE WORK

```text
3D character
Plane detection
Advanced spatial interaction
Voice chatbot
Personalization
Recommendation system
Real-time analytics
Mobile application
Full CMS
```

---

# 28. Development Principle

> **Build the core system first. Integrate AR last.**

Thứ tự:

```text
Architecture
      ↓
Data
      ↓
Database
      ↓
Backend
      ↓
Frontend
      ↓
Knowledge Base
      ↓
RAG
      ↓
Chatbot
      ↓
AR Integration
      ↓
Testing
      ↓
Evaluation
```

Không nên:

```text
AR
 ↓
Web
 ↓
Backend
 ↓
Chatbot
```

vì điều đó khiến tiến độ của bạn phụ thuộc vào AR team.

---

# 29. Final Architecture Principle

Hệ thống cuối cùng phải tuân thủ nguyên tắc:

```text
                    HÁT XOAN
               DIGITAL EXPERIENCE
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
       WEB APP                  WEBAR APP
          │                      Zapworks
          │                         │
    ┌─────┼─────┐             ┌─────┴─────┐
    │     │     │             │           │
 Content Video Chatbot      Posters      Video
    │           │
    │           ▼
    │          RAG
    │           │
    │           ▼
    │          LLM
    │
    └───────────┬─────────────────────┐
                │                     │
                ▼                     ▼
           PostgreSQL             Knowledge Base
```

### Nguyên tắc cốt lõi

1. **Web là nền tảng thông tin chính.**
2. **Chatbot là AI layer của Web.**
3. **Chatbot sử dụng một Knowledge Base chung cho toàn bộ Hát Xoan.**
4. **AR là một module độc lập.**
5. **AR tự xử lý video trong không gian AR.**
6. **Web không chịu trách nhiệm render AR.**
7. **AR không phụ thuộc runtime vào Web Backend trong MVP.**
8. **Database là nguồn dữ liệu có cấu trúc chính.**
9. **Knowledge Base là nguồn kiến thức cho RAG.**
10. **Song ID/Asset ID phải được chuẩn hóa giữa Web, Database và AR.**
11. **Nếu AR hỏng, Web vẫn phải hoạt động bình thường.**
12. **MVP ưu tiên tính hoàn chỉnh và khả năng demo hơn việc xây hệ thống quá phức tạp.**
