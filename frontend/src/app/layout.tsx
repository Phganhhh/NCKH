import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import { ChatWidget } from '@/components/chat/chat-widget';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: { default: `${SITE.name} · Trải nghiệm số`, template: `%s · ${SITE.name}` },
  description: SITE.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-son focus:px-4 focus:py-2 focus:text-nga"
        >
          Bỏ qua điều hướng
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* Chatbot xuất hiện ở mọi page */}
        <ChatWidget />
      </body>
    </html>
  );
}
