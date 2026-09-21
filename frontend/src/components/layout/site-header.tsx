'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', label: 'Trang chủ' },
  { href: '/about', label: 'Về Hát Xoan' },
  { href: '/songs', label: 'Các bài Xoan' },
  { href: '/ar', label: 'Trải nghiệm AR' },
  { href: '/sources', label: 'Nguồn dữ liệu' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-vang/40 bg-nga/85 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Hát Xoan Phú Thọ - Trang chủ">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-son/40 font-serif text-sm font-bold text-son">
            X
          </span>
          <span className="font-serif text-base font-semibold tracking-wide text-muc sm:text-lg">
            Hát Xoan Phú Thọ
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {NAV.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-colors',
                  active ? 'bg-son/10 font-medium text-son' : 'text-muc-soft hover:text-son',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full p-2 text-muc-soft md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-vang/40 bg-nga md:hidden" aria-label="Điều hướng di động">
          <ul className="container-content flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-3 text-sm text-muc-soft">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
