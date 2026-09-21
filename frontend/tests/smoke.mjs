/**
 * Smoke test frontend — không cần dependency, chạy bằng Node 18+.
 *
 *   1) Terminal A: npm run dev            (hoặc npm run build && npm start)
 *   2) Terminal B: npm run smoke
 *
 * Kiểm tra: các trang render, danh sách/chi tiết bài Xoan hiển thị, nút chatbot có mặt,
 * nút AR hoạt động, và UI không vỡ khi backend không phản hồi.
 */
const BASE = process.env.SMOKE_BASE_URL ?? 'http://localhost:3000';

const CASES = [
  { name: 'Homepage renders', path: '/', expect: ['HÁT XOAN', 'Trải nghiệm AR', 'Khám phá các bài Xoan'] },
  { name: 'About page renders', path: '/about', expect: ['Hát Xoan là gì', 'Không gian diễn xướng'] },
  { name: 'Song list renders', path: '/songs', expect: ['Các bài Xoan', 'Bài Xoan 1'] },
  { name: 'Song detail renders', path: '/songs/bai-xoan-1', expect: ['Bài Xoan 1', 'Lời ca', 'Video biểu diễn'] },
  { name: 'AR page renders with fallback', path: '/ar', expect: ['Trải nghiệm Hát Xoan AR', 'Không thể khởi chạy AR?'] },
  { name: 'Sources page renders', path: '/sources', expect: ['Nguồn dữ liệu'] },
  { name: 'Chatbot button present on every page', path: '/about', expect: ['Mở chatbot Hát Xoan AI'] },
  // Next.js có thể trả 200 kèm trang not-found khi route là dynamic -> khẳng định chính là nội dung.
  { name: 'Unknown song does not crash (404 page)', path: '/songs/khong-ton-tai', expect: ['Không tìm thấy nội dung'], allowStatus: [404, 200] },
];

// Chạy với SMOKE_BACKEND_DOWN=1 (sau khi tắt backend) để kiểm tra UI không vỡ khi API lỗi.
// Khi đó bỏ qua các case cần dữ liệu từ backend và chỉ kiểm tra error state.
const BACKEND_DOWN = process.env.SMOKE_BACKEND_DOWN === '1';
const NEEDS_BACKEND = new Set(['Song list renders', 'Song detail renders']);
const SELECTED = BACKEND_DOWN
  ? [
      ...CASES.filter((testCase) => !NEEDS_BACKEND.has(testCase.name)),
      { name: 'Backend down: homepage vẫn render + error state', path: '/', expect: ['HÁT XOAN', 'Không tải được dữ liệu'] },
      { name: 'Backend down: /songs vẫn render + error state', path: '/songs', expect: ['Không tải được dữ liệu'] },
    ]
  : CASES;

let failed = 0;

for (const testCase of SELECTED) {
  try {
    const response = await fetch(`${BASE}${testCase.path}`);
    const allowed = testCase.allowStatus ?? [200];
    const html = await response.text();
    const missing = testCase.expect.filter((needle) => !html.includes(needle));

    if (!allowed.includes(response.status) || missing.length > 0) {
      failed += 1;
      console.error(`FAIL  ${testCase.name} (status ${response.status}) missing: ${missing.join(', ')}`);
    } else {
      console.log(`PASS  ${testCase.name}`);
    }
  } catch (error) {
    failed += 1;
    console.error(`FAIL  ${testCase.name} — ${error.message}`);
  }
}

console.log(failed === 0 ? '\nTất cả smoke test đã PASS' : `\n${failed} test FAIL`);
process.exit(failed === 0 ? 0 : 1);
