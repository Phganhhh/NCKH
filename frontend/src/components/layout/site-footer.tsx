import Link from 'next/link';

import { SITE } from '@/lib/config';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-vang/40 bg-white/40">
      <div className="container-content grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold text-muc">{SITE.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muc-soft">{SITE.description}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-son">Khám phá</p>
          <ul className="mt-4 space-y-2 text-sm text-muc-soft">
            <li><Link href="/about" className="hover:text-son">Về Hát Xoan</Link></li>
            <li><Link href="/songs" className="hover:text-son">Các bài Xoan</Link></li>
            <li><Link href="/ar" className="hover:text-son">Trải nghiệm AR</Link></li>
            <li><Link href="/sources" className="hover:text-son">Nguồn dữ liệu</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-son">Ghi chú</p>
          <p className="mt-4 text-sm leading-6 text-muc-soft">
            Đây là prototype phục vụ nghiên cứu. Nội dung chưa xác minh được đánh dấu là placeholder và
            sẽ được thay bằng tư liệu có nguồn.
          </p>
        </div>
      </div>
      <div className="border-t border-vang/40 py-5 text-center text-xs text-muc-soft">
        Prototype nghiên cứu · Hát Xoan Digital Experience
      </div>
    </footer>
  );
}
