import { BookMarked } from 'lucide-react';

import type { ChatSource } from '@/lib/types';

export function SourceList({ sources }: { sources: ChatSource[] }) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-3 border-t border-vang/50 pt-2">
      <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-reu">
        <BookMarked className="h-3 w-3" aria-hidden="true" />
        Nguồn tham chiếu
      </p>
      <ul className="space-y-1">
        {sources.map((source) => (
          <li key={`${source.title}-${source.source ?? ''}`} className="text-[11px] leading-4 text-muc-soft">
            <span className="font-medium text-muc">{source.title}</span>
            {source.source ? <span> · {source.source}</span> : null}
            {source.song_id ? <span> · {source.song_id}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
