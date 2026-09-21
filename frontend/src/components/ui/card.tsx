import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-vang/40 bg-white/70 shadow-[0_1px_2px_rgba(31,27,24,.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(31,27,24,.08)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-vang/60 bg-vang/10 px-3 py-1 text-xs font-medium text-reu">
      {children}
    </span>
  );
}
