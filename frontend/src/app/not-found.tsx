import { ButtonLink } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-5xl font-bold text-son">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-muc">Không tìm thấy nội dung</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-muc-soft">
        Trang hoặc bài Xoan bạn tìm không tồn tại. Có thể nội dung chưa được bổ sung vào hệ thống.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Về trang chủ</ButtonLink>
        <ButtonLink href="/songs" variant="secondary">Các bài Xoan</ButtonLink>
      </div>
    </div>
  );
}
