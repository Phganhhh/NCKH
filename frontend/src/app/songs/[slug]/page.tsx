import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ScanLine } from 'lucide-react';

import { PlaceholderNote } from '@/components/common/states';
import { VideoPlayer } from '@/components/songs/video-player';
import { Badge } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import { getSong, getSongs } from '@/lib/api';
import { isPlaceholder, stripPlaceholderMark } from '@/lib/utils';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const song = await getSong(params.slug);
  return song ? { title: song.title, description: song.short_description ?? undefined } : { title: 'Bài Xoan' };
}

function Block({ title, content }: { title: string; content: string | null }) {
  if (!content) return null;
  const placeholder = isPlaceholder(content);
  const text = placeholder ? stripPlaceholderMark(content) : content;

  return (
    <section className="scroll-mt-24">
      <h2 className="font-serif text-xl font-semibold text-muc">{title}</h2>
      <span className="mt-3 block h-px w-12 bg-vang" aria-hidden="true" />
      <div className="prose-heritage mt-5 whitespace-pre-line">{text || '—'}</div>
      {placeholder ? <PlaceholderNote className="mt-5" /> : null}
    </section>
  );
}

export default async function SongDetailPage({ params }: PageProps) {
  const song = await getSong(params.slug);
  if (!song) notFound();

  const related = (await getSongs())?.filter((item) => item.id !== song.id).slice(0, 2) ?? [];

  return (
    <article className="container-content py-12 sm:py-16">
      <Link href="/songs" className="inline-flex items-center gap-2 text-sm text-muc-soft hover:text-son">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Tất cả bài Xoan
      </Link>

      <header className="mt-8">
        {song.category ? <Badge>{song.category}</Badge> : null}
        <h1 className="mt-4 font-serif text-3xl font-bold text-muc sm:text-4xl">{song.title}</h1>
        {song.short_description ? (
          <p className="mt-4 max-w-2xl leading-8 text-muc-soft">
            {stripPlaceholderMark(song.short_description)}
          </p>
        ) : null}
      </header>

      {song.thumbnail_url ? (
        <div className="mt-10 aspect-[21/9] overflow-hidden rounded-2xl border border-vang/50 bg-vang-pale">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={song.thumbnail_url}
            alt={`Hình minh hoạ cho ${song.title} (ảnh placeholder)`}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_minmax(0,18rem)] lg:gap-16">
        <div className="space-y-14">
          <Block title="Giới thiệu" content={song.description} />
          <Block title="Lời ca" content={song.lyrics} />
          <Block title="Thông tin văn hóa" content={song.cultural_info} />
          <Block title="Thông tin biểu diễn" content={song.performance_info} />

          <section>
            <h2 className="font-serif text-xl font-semibold text-muc">Video biểu diễn</h2>
            <span className="mt-3 block h-px w-12 bg-vang" aria-hidden="true" />
            <div className="mt-5">
              <VideoPlayer url={song.video_url} title={song.title} />
            </div>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-son/20 bg-son/[0.04] p-6 text-center">
            <ScanLine className="mx-auto mb-3 h-6 w-6 text-son" aria-hidden="true" />
            <p className="text-sm leading-6 text-muc-soft">
              Quét poster Hát Xoan để xem bài biểu diễn này trong không gian AR.
            </p>
            <ButtonLink href="/ar" size="sm" className="mt-5">
              Trải nghiệm AR
            </ButtonLink>
          </div>

          {song.assets.length > 0 ? (
            <div className="rounded-2xl border border-vang/50 bg-white/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-son">Tư liệu liên quan</p>
              <ul className="mt-4 space-y-3 text-sm text-muc-soft">
                {song.assets.map((asset) => (
                  <li key={asset.id}>
                    <span className="font-medium text-muc">{asset.asset_type}</span>
                    {asset.description ? <span> — {asset.description}</span> : null}
                    <span className="block text-xs text-muc-soft/80">Nguồn: {asset.source ?? 'chưa có'}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="rounded-2xl border border-vang/50 bg-white/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-son">Bài Xoan khác</p>
              <ul className="mt-4 space-y-3 text-sm">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link href={`/songs/${item.slug}`} className="text-muc-soft hover:text-son">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
