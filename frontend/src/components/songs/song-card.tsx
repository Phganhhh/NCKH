import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Badge, Card } from '@/components/ui/card';
import type { SongSummary } from '@/lib/types';
import { isPlaceholder, stripPlaceholderMark } from '@/lib/utils';

export function SongCard({ song }: { song: SongSummary }) {
  const description = song.short_description ?? '';
  const placeholder = isPlaceholder(description);
  const text = placeholder ? stripPlaceholderMark(description) : description;

  return (
    <Card className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-vang-pale pattern-heritage">
        {song.thumbnail_url ? (
          // Ảnh placeholder dạng SVG nằm trong /public — dùng <img> để tránh cấu hình loader.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={song.thumbnail_url}
            alt={`Hình minh hoạ cho ${song.title} (ảnh placeholder)`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muc-soft">Chưa có hình ảnh</div>
        )}
        {placeholder ? (
          <span className="absolute left-3 top-3 rounded-full bg-nga/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-son">
            Placeholder
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {song.category ? <Badge>{song.category}</Badge> : null}
        <h3 className="font-serif text-lg font-semibold text-muc">{song.title}</h3>
        <p className="flex-1 text-sm leading-6 text-muc-soft">
          {text || 'Nội dung mô tả đang chờ bổ sung từ nguồn được xác minh.'}
        </p>
        <Link
          href={`/songs/${song.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-son hover:gap-2.5 transition-all"
        >
          Khám phá
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
