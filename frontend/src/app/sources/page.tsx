import type { Metadata } from 'next';

import { EmptyState, ErrorState } from '@/components/common/states';
import { SectionHeading } from '@/components/ui/section-heading';
import { getSources } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Nguồn dữ liệu',
  description: 'Danh mục nguồn của toàn bộ nội dung và media sử dụng trong prototype.',
};

export default async function SourcesPage() {
  const sources = await getSources();

  return (
    <div className="container-content py-16 sm:py-20">
      <SectionHeading
        eyebrow="Minh bạch dữ liệu"
        title="Nguồn dữ liệu và tư liệu"
        description="Mọi nội dung, hình ảnh, video trong hệ thống đều phải truy được nguồn. Các dòng ghi PLACEHOLDER là nội dung tạm, chưa dùng tư liệu thật."
      />

      <div className="mt-12">
        {sources === null ? (
          <ErrorState />
        ) : sources.length === 0 ? (
          <EmptyState title="Chưa có dữ liệu nguồn" description="Kiểm tra file data/sources/asset_sources.csv." />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-vang/50 bg-white/60">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <caption className="sr-only">Danh mục nguồn tư liệu</caption>
              <thead className="border-b border-vang/50 bg-vang/10 text-xs uppercase tracking-wider text-reu">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Tư liệu</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Loại</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Nguồn</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Giấy phép</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Mục đích</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vang/40">
                {sources.map((row) => (
                  <tr key={`${row.asset}-${row.type}`} className="align-top">
                    <td className="px-5 py-4 font-medium text-muc">{row.asset}</td>
                    <td className="px-5 py-4 text-muc-soft">{row.type}</td>
                    <td className="px-5 py-4 text-muc-soft">{row.source}</td>
                    <td className="px-5 py-4 text-muc-soft">{row.license}</td>
                    <td className="px-5 py-4 text-muc-soft">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
