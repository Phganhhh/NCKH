import type { Metadata } from 'next';

import { ErrorState } from '@/components/common/states';
import { SongExplorer } from '@/components/songs/song-explorer';
import { SectionHeading } from '@/components/ui/section-heading';
import { getSongs } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Các bài Xoan',
  description: 'Danh sách các bài Xoan trong bộ sưu tập số hóa.',
};

export default async function SongsPage() {
  const songs = await getSongs();

  return (
    <div className="container-content py-16 sm:py-20">
      <SectionHeading
        eyebrow="Bộ sưu tập"
        title="Các bài Xoan"
        description="Chọn một bài Xoan để xem giới thiệu, lời ca, thông tin biểu diễn và video."
      />
      <div className="mt-12">
        {songs === null ? <ErrorState /> : <SongExplorer songs={songs} />}
      </div>
    </div>
  );
}
