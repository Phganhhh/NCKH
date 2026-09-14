export const TARGET_SRC = "/targets/poster-page-1.mind";

// Đọc kích thước ảnh target từ header .mind (msgpack) để overlay luôn đúng
// tỉ lệ poster, kể cả khi thay ảnh test mà không sửa code.
export async function loadTargetSize() {
  const response = await fetch(TARGET_SRC);
  const buffer = new Uint8Array(await response.arrayBuffer());
  return {
    width: readUintAfterKey(buffer, "width"),
    height: readUintAfterKey(buffer, "height")
  };
}

function readUintAfterKey(buffer, key) {
  const pattern = [0xa0 | key.length, ...[...key].map((char) => char.charCodeAt(0))];
  const at = indexOfBytes(buffer, pattern);
  if (at === -1) throw new Error(`Không tìm thấy khóa ${key} trong file .mind`);
  return readMsgpackUint(buffer, at + pattern.length);
}

function indexOfBytes(buffer, pattern) {
  outer: for (let i = 0; i <= buffer.length - pattern.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (buffer[i + j] !== pattern[j]) continue outer;
    }
    return i;
  }
  return -1;
}

function readMsgpackUint(buffer, at) {
  const tag = buffer[at];
  if (tag < 0x80) return tag;
  if (tag === 0xcc) return buffer[at + 1];
  if (tag === 0xcd) return (buffer[at + 1] << 8) | buffer[at + 2];
  if (tag === 0xce) {
    return buffer[at + 1] * 2 ** 24 + ((buffer[at + 2] << 16) | (buffer[at + 3] << 8) | buffer[at + 4]);
  }
  throw new Error("Kiểu số msgpack không hỗ trợ");
}
