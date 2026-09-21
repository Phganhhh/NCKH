import type { Metadata } from 'next';

import { PlaceholderNote } from '@/components/common/states';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata: Metadata = {
  title: 'Về Hát Xoan',
  description: 'Lịch sử, giá trị văn hóa, nghệ thuật biểu diễn và không gian diễn xướng của Hát Xoan Phú Thọ.',
};

interface Section {
  id: string;
  title: string;
  body: string[];
  placeholder?: boolean;
}

const SECTIONS: Section[] = [
  {
    id: 'hat-xoan-la-gi',
    title: 'Hát Xoan là gì',
    body: [
      'Hát Xoan là một loại hình nghệ thuật trình diễn dân gian của tỉnh Phú Thọ, Việt Nam, gắn liền với tín ngưỡng thờ cúng Hùng Vương. Hát Xoan còn được gọi là hát cửa đình, thường được trình diễn tại đình, miếu trong dịp lễ hội đầu xuân.',
      'Hát Xoan đã được UNESCO ghi danh là di sản văn hóa phi vật thể. Các mốc thời gian, tên gọi danh mục và nội dung hồ sơ cụ thể cần được đối chiếu với hồ sơ chính thức của UNESCO trước khi công bố.',
    ],
  },
  {
    id: 'lich-su',
    title: 'Lịch sử và nguồn gốc',
    body: [
      'Phần lịch sử, truyền thuyết về nguồn gốc, quá trình truyền dạy qua các thế hệ và giai đoạn phục hồi chưa được đưa vào hệ thống vì cần trích dẫn từ nguồn sử liệu đã kiểm chứng.',
    ],
    placeholder: true,
  },
  {
    id: 'gia-tri-van-hoa',
    title: 'Giá trị văn hóa',
    body: [
      'Hát Xoan mang giá trị nghi lễ và giá trị cộng đồng: gắn với thực hành tín ngưỡng tại đình làng và được trao truyền trong cộng đồng phường Xoan.',
      'Các đánh giá chi tiết về giá trị nghệ thuật, giá trị lịch sử và vai trò đương đại cần được dẫn theo công trình nghiên cứu đã công bố.',
    ],
    placeholder: true,
  },
  {
    id: 'nghe-thuat-bieu-dien',
    title: 'Nghệ thuật biểu diễn',
    body: [
      'Hát Xoan là diễn xướng tổng hợp, kết hợp hát, múa và nhạc đệm, do một nhóm nghệ nhân trình diễn tập thể theo trình tự chặng.',
      'Mô tả chi tiết các chặng, đặc trưng âm nhạc (thang âm, nhịp điệu, lối hát) cần được lấy từ tài liệu nghiên cứu.',
    ],
    placeholder: true,
  },
  {
    id: 'khong-gian-dien-xuong',
    title: 'Không gian diễn xướng',
    body: [
      'Hát Xoan gắn với không gian đình, miếu của làng — nơi diễn ra nghi lễ thờ cúng, thường vào mùa lễ hội đầu xuân.',
      'Danh sách cụ thể các đình, miếu, phường Xoan gốc và lịch lễ hội cần xác minh với cơ quan quản lý văn hóa địa phương.',
    ],
    placeholder: true,
  },
  {
    id: 'nghe-nhan',
    title: 'Nghệ nhân và truyền dạy',
    body: [
      'Thông tin về nghệ nhân, cơ chế truyền dạy trong phường Xoan và các lớp truyền dạy cho thế hệ trẻ cần nguồn chính thức. Không đưa tên nghệ nhân cụ thể khi chưa có sự đồng ý.',
    ],
    placeholder: true,
  },
  {
    id: 'trang-phuc-nhac-cu',
    title: 'Trang phục và nhạc cụ',
    body: [
      'Mô tả trang phục của đào Xoan, kép Xoan và các nhạc cụ đệm cần dựa trên tư liệu điền dã hoặc tài liệu nghiên cứu, kèm hình ảnh có bản quyền rõ ràng.',
    ],
    placeholder: true,
  },
  {
    id: 'cac-bai-xoan',
    title: 'Các bài Xoan',
    body: [
      'Prototype hiện có ba bản ghi mẫu để minh hoạ cấu trúc dữ liệu của một bài Xoan: giới thiệu, lời ca, thông tin biểu diễn và video. Tên và nội dung thật sẽ thay thế khi có tư liệu được xác minh.',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="container-content py-16 sm:py-20">
      <SectionHeading
        eyebrow="Về di sản"
        title="Hát Xoan Phú Thọ"
        description="Tổng quan về di sản: lịch sử, giá trị văn hóa, nghệ thuật biểu diễn, không gian diễn xướng, nghệ nhân, trang phục và nhạc cụ."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16">
        <nav aria-label="Mục lục" className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-son">Nội dung</p>
          <ul className="space-y-2.5 text-sm">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-muc-soft transition-colors hover:text-son">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-serif text-xl font-semibold text-muc sm:text-2xl">{section.title}</h2>
              <span className="mt-3 block h-px w-12 bg-vang" aria-hidden="true" />
              <div className="prose-heritage mt-5">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
              {section.placeholder ? <PlaceholderNote className="mt-5" /> : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
