import { ScanLine } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';

export function ArSection() {
  return (
    <section className="container-content py-20 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-son/20 bg-son/[0.04] pattern-heritage px-7 py-14 text-center sm:px-16">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-son/30 bg-nga text-son">
          <ScanLine className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="font-serif text-2xl font-semibold text-muc sm:text-3xl">
          Quét poster để khám phá Hát Xoan theo cách hoàn toàn mới
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muc-soft sm:text-base">
          Dùng camera điện thoại quét poster Hát Xoan. Ba virtual poster sẽ hiện lên trong không gian AR —
          chọn một poster để xem video biểu diễn ngay tại đó.
        </p>
        <div className="mt-9">
          <ButtonLink href="/ar" size="lg">
            Trải nghiệm AR
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
