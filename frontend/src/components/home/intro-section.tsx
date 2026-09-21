import { SectionHeading } from '@/components/ui/section-heading';
import { ButtonLink } from '@/components/ui/button';
import { PlaceholderNote } from '@/components/common/states';

const ITEMS = [
  {
    title: 'Hát Xoan là gì',
    body: 'Loại hình nghệ thuật trình diễn dân gian của tỉnh Phú Thọ, gắn với tín ngưỡng thờ cúng Hùng Vương, thường được trình diễn tại đình, miếu trong lễ hội đầu xuân.',
  },
  {
    title: 'Nguồn gốc',
    body: 'Truyền thuyết và niên đại hình thành đang chờ bổ sung từ nguồn sử liệu được xác minh.',
    placeholder: true,
  },
  {
    title: 'Đặc điểm',
    body: 'Diễn xướng tổng hợp gồm hát, múa và nhạc đệm, do phường Xoan trình diễn tập thể theo chặng trong không gian đình làng.',
  },
  {
    title: 'Giá trị văn hóa',
    body: 'Hát Xoan đã được UNESCO ghi danh là di sản văn hóa phi vật thể; các mốc và nội dung hồ sơ cần đối chiếu bản chính thức.',
  },
];

export function IntroSection() {
  return (
    <section className="container-content py-20 sm:py-24">
      <SectionHeading
        eyebrow="Giới thiệu"
        title="Một di sản sống của vùng đất Tổ"
        description="Những nét khái quát nhất về Hát Xoan — phần nội dung chi tiết được trình bày tại trang Về Hát Xoan."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-vang/50 bg-vang/40 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <article key={item.title} className="bg-nga p-7">
            <h3 className="font-serif text-lg font-semibold text-muc">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muc-soft">{item.body}</p>
            {item.placeholder ? <PlaceholderNote className="mt-4" /> : null}
          </article>
        ))}
      </div>

      <div className="mt-10">
        <ButtonLink href="/about" variant="secondary">
          Tìm hiểu chi tiết
        </ButtonLink>
      </div>
    </section>
  );
}
