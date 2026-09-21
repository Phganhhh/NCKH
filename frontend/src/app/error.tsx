'use client';

import { ErrorState } from '@/components/common/states';
import { Button } from '@/components/ui/button';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-content py-24">
      <ErrorState
        title="Đã xảy ra lỗi"
        description="Một phần nội dung không tải được. Bạn có thể thử lại — các trang khác vẫn hoạt động bình thường."
      >
        <Button variant="secondary" className="mt-6" onClick={reset}>
          Thử lại
        </Button>
      </ErrorState>
    </div>
  );
}
