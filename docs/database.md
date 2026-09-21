# Database

ORM: SQLAlchemy 2.0 (typed). Mặc định `sqlite:///./hatxoan.db`, production/staging dùng `DATABASE_URL` trỏ tới PostgreSQL hoặc Supabase.

## Schema

### `songs`
| Field | Type | Note |
|---|---|---|
| id | TEXT PK | ví dụ `xoan_001` |
| slug | TEXT UNIQUE | `bai-xoan-1` |
| title | TEXT | |
| short_description | TEXT | dùng cho card |
| description | TEXT | markdown-ish plain text |
| lyrics | TEXT | lời ca (placeholder nếu chưa có nguồn) |
| cultural_info | TEXT | thông tin văn hoá |
| performance_info | TEXT | thông tin biểu diễn |
| category | TEXT | nhóm/chặng (placeholder) |
| thumbnail_url | TEXT | |
| video_url | TEXT | |
| status | TEXT | `draft` \| `published` |
| created_at / updated_at | TIMESTAMP | |

### `assets`
| Field | Type | Note |
|---|---|---|
| id | TEXT PK | |
| song_id | TEXT FK → songs.id, nullable | null = asset chung |
| asset_type | TEXT | `image`\|`video`\|`audio`\|`document`\|`ar_poster`\|`ar_video` |
| url | TEXT | |
| source | TEXT | nguồn gốc (bắt buộc điền hoặc `PLACEHOLDER`) |
| author | TEXT | |
| license | TEXT | |
| description | TEXT | |
| created_at | TIMESTAMP | |

### `conversations`
| id (TEXT PK) | session_id (TEXT) | created_at | updated_at |

### `messages`
| id (TEXT PK) | conversation_id (FK) | role (`user`\|`assistant`) | content (TEXT) | created_at |

Memory được bật/tắt bằng `ENABLE_CHAT_MEMORY`. Khi tắt, `chat_service` vẫn nhận `conversation_id` từ client (client-side state) → sau này bật persistent memory không phải đổi API contract.

## Quan hệ

```text
songs 1 ──── N assets
conversations 1 ──── N messages
```

## Seed

`data/seed/songs.json` + `data/seed/assets.json` → nạp bằng:

```bash
cd backend && python -m scripts.seed
```

Script là **idempotent** (upsert theo id). 3 bài Xoan mẫu: `xoan_001`, `xoan_002`, `xoan_003`.

## Migration

Prototype dùng `Base.metadata.create_all()` khi startup. Khi lên production → thêm Alembic (future work).
