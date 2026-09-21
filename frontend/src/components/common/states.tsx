import { AlertTriangle, FileQuestion, Info, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function LoadingState({ label = 'Đang tải…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-14 text-muc-soft" role="status" aria-live="polite">
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-vang/70 bg-white/50 px-6 py-12 text-center">
      <FileQuestion className="mx-auto mb-3 h-6 w-6 text-vang" aria-hidden="true" />
      <p className="font-medium text-muc">{title}</p>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm text-muc-soft">{description}</p> : null}
    </div>
  );
}

export function ErrorState({
  title = 'Không tải được dữ liệu',
  description = 'Không kết nối được tới máy chủ. Hãy kiểm tra backend đang chạy tại NEXT_PUBLIC_API_URL rồi tải lại trang.',
  children,
}: {
  title?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border border-son/25 bg-son/5 px-6 py-10 text-center"
      role="alert"
    >
      <AlertTriangle className="mx-auto mb-3 h-6 w-6 text-son" aria-hidden="true" />
      <p className="font-medium text-son-dark">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muc-soft">{description}</p>
      {children}
    </div>
  );
}

/** Cảnh báo nội dung chưa được xác minh nguồn — yêu cầu bắt buộc của đề tài. */
export function PlaceholderNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'flex items-start gap-2 rounded-xl border border-vang/60 bg-vang/10 px-4 py-3 text-xs leading-5 text-reu',
        className,
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        Nội dung tạm (placeholder) — đang chờ bổ sung từ nguồn được xác minh. Xem trang{' '}
        <a className="underline underline-offset-2" href="/sources">
          Nguồn dữ liệu
        </a>
        .
      </span>
    </p>
  );
}
