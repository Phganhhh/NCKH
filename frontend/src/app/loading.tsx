import { LoadingState } from '@/components/common/states';

export default function Loading() {
  return (
    <div className="container-content py-24">
      <LoadingState label="Đang tải nội dung…" />
    </div>
  );
}
