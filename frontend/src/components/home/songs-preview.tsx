import { SectionHeading } from '@/components/ui/section-heading';
import { ButtonLink } from '@/components/ui/button';
import { SongCard } from '@/components/songs/song-card';
import { EmptyState, ErrorState } from '@/components/common/states';
import type { SongSummary } from '@/lib/types';

export function SongsPreview({ songs }: { songs: SongSummary[] | null }) {
  return (
    <section className="border-y border-vang/40 bg-white/40 py-20 sm:py-24">
      <div className="container-content">
        <SectionHeading
          eyebrow="Bộ sưu tập"
          title="Khám phá các bài Xoan"
          description="Mỗi bài Xoan gồm phần giới thiệu, lời ca, thông tin biểu diễn và video minh hoạ."
        />

        <div className="mt-12">
          {songs === null ? (
            <ErrorState />
          ) : songs.length === 0 ? (
            <EmptyState title="Chưa có bài Xoan nào" description="Hãy chạy lệnh seed dữ liệu cho backend." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {songs.slice(0, 3).map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <ButtonLink href="/songs" variant="secondary">
            Xem tất cả bài Xoan
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
