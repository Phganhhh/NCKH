'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { SongCard } from '@/components/songs/song-card';
import { EmptyState } from '@/components/common/states';
import type { SongSummary } from '@/lib/types';
import { cn } from '@/lib/utils';

export function SongExplorer({ songs }: { songs: SongSummary[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(songs.map((song) => song.category).filter(Boolean) as string[]))],
    [songs],
  );

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return songs.filter((song) => {
      const matchesCategory = category === 'all' || song.category === category;
      const matchesQuery =
        keyword.length === 0 ||
        song.title.toLowerCase().includes(keyword) ||
        (song.short_description ?? '').toLowerCase().includes(keyword);
      return matchesCategory && matchesQuery;
    });
  }, [songs, query, category]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muc-soft" aria-hidden="true" />
          <label htmlFor="song-search" className="sr-only">Tìm bài Xoan</label>
          <input
            id="song-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm bài Xoan…"
            className="h-11 w-full rounded-full border border-vang/60 bg-white pl-10 pr-4 text-sm text-muc placeholder:text-muc-soft/60"
          />
        </div>

        {categories.length > 1 ? (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo nhóm">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={cn(
                  'rounded-full border px-4 py-2 text-xs transition-colors',
                  category === item
                    ? 'border-son bg-son text-nga'
                    : 'border-vang/60 bg-white text-muc-soft hover:border-son/40',
                )}
              >
                {item === 'all' ? 'Tất cả' : item}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Không tìm thấy bài Xoan phù hợp" description="Thử từ khoá khác hoặc bỏ bộ lọc." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}
