import { ArrowRight, ScanLine } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { SITE } from '@/lib/config';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-vang/40">
      {/* Ảnh nền placeholder (SVG tự tạo trong repo) — thay bằng ảnh/video có nguồn khi có tư liệu */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/placeholders/hero.svg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nga/80 via-nga/70 to-nga" />
      </div>

      <div className="container-content relative flex min-h-[78vh] flex-col justify-center py-20 sm:min-h-[86vh]">
        <div className="max-w-2xl animate-fade-up">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-son">
            Di sản văn hóa phi vật thể · Phú Thọ
          </p>
          <h1 className="font-serif text-4xl font-bold leading-[1.15] text-muc sm:text-6xl">
            HÁT XOAN<br />PHÚ THỌ
          </h1>
          <span className="mt-6 block h-px w-24 bg-son" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-base leading-8 text-muc-soft sm:text-lg">{SITE.tagline}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/songs" size="lg">
              Khám phá Hát Xoan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/ar" variant="secondary" size="lg">
              <ScanLine className="h-4 w-4" aria-hidden="true" />
              Trải nghiệm AR
            </ButtonLink>
          </div>

          <p className="mt-10 text-xs text-muc-soft/80">
            Hình nền hiện tại là ảnh placeholder do nhóm tự tạo — không sử dụng tư liệu chưa có nguồn.
          </p>
        </div>
      </div>
    </section>
  );
}
