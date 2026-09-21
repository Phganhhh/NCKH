import type { Metadata } from 'next';
import { ScanLine, Smartphone, Video } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { AR_URL, isArConfigured } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Trải nghiệm AR',
  description: 'Quét poster Hát Xoan bằng điện thoại để khám phá các bài biểu diễn dưới dạng WebAR.',
};

const STEPS = [
  { icon: Smartphone, title: 'Mở bằng điện thoại', body: 'Dùng Chrome (Android) hoặc Safari (iOS) và cho phép truy cập camera.' },
  { icon: ScanLine, title: 'Quét poster Hát Xoan', body: 'Hướng camera vào poster vật lý. Khi nhận diện, ba virtual poster sẽ hiện lên.' },
  { icon: Video, title: 'Chọn poster để xem', body: 'Chạm vào một virtual poster, video biểu diễn tương ứng sẽ phát ngay trong không gian AR.' },
];

/**
 * Trang này KHÔNG render AR. Nó chỉ là entry point tới trải nghiệm Zapworks WebAR.
 * URL lấy từ NEXT_PUBLIC_AR_URL — chưa cấu hình thì hiển thị thông báo, không crash.
 */
export default function ArPage() {
  const configured = isArConfigured();

  return (
    <div className="container-content py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-son/30 bg-son/5 text-son">
          <ScanLine className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="font-serif text-3xl font-bold text-muc sm:text-4xl">Trải nghiệm Hát Xoan AR</h1>
        <p className="mt-5 leading-8 text-muc-soft">
          Quét poster Hát Xoan bằng điện thoại để khám phá các bài biểu diễn dưới dạng WebAR.
        </p>

        <div className="mt-10">
          {configured ? (
            <a
              href={AR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-son px-8 py-3.5 text-base font-medium text-nga shadow-sm transition-colors hover:bg-son-dark"
            >
              <ScanLine className="h-5 w-5" aria-hidden="true" />
              Bắt đầu trải nghiệm AR
            </a>
          ) : (
            <div className="rounded-2xl border border-vang/60 bg-vang/10 px-6 py-7 text-left" role="status">
              <p className="font-medium text-muc">AR experience is not configured yet.</p>
              <p className="mt-2 text-sm leading-6 text-muc-soft">
                Trải nghiệm AR chưa được cấu hình. Đặt biến môi trường{' '}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs text-son">NEXT_PUBLIC_AR_URL</code> bằng
                URL dự án Zapworks đã publish, sau đó khởi động lại frontend.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-vang/50 bg-vang/40 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.title} className="bg-nga p-7">
            <step.icon className="mb-4 h-5 w-5 text-son" aria-hidden="true" />
            <h2 className="font-serif text-base font-semibold text-muc">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muc-soft">{step.body}</p>
          </div>
        ))}
      </div>

      {/* Fallback bắt buộc: AR hỏng thì website vẫn dùng được */}
      <div className="mt-12 rounded-2xl border border-dashed border-vang/70 bg-white/50 px-7 py-9 text-center">
        <p className="font-medium text-muc">Không thể khởi chạy AR?</p>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muc-soft">
          Trải nghiệm AR cần thiết bị di động có camera, kết nối HTTPS và poster vật lý. Bạn vẫn có thể khám
          phá các bài Xoan trên website.
        </p>
        <ButtonLink href="/songs" variant="secondary" className="mt-6">
          Khám phá các bài Xoan
        </ButtonLink>
      </div>

      <p className="mt-10 text-center text-xs text-muc-soft/80">
        Trải nghiệm AR do module Zapworks WebAR đảm nhiệm. Website chỉ cung cấp điểm vào và không phát video AR.
      </p>
    </div>
  );
}
