'use client';

import { Loader2, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { SourceList } from '@/components/chat/source-list';
import { sendChatMessage } from '@/lib/api';
import type { ChatSource } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: ChatSource[];
  error?: boolean;
}

const GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: 'Xin chào! Bạn muốn tìm hiểu điều gì về Hát Xoan?',
};

const SUGGESTIONS = ['Hát Xoan là gì?', 'Hát Xoan có những đặc điểm gì?', 'Bài Xoan 1 là gì?'];

/**
 * Chatbot RAG — hiển thị ở mọi trang (mount trong app/layout.tsx).
 * Hội thoại giữ ở client state (conversation_id vẫn gửi lên API để sau này
 * bật persistent memory mà không đổi contract).
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const conversationId = useRef<string | undefined>(undefined);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', content: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(trimmed, conversationId.current);
      conversationId.current = response.conversation_id;
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: response.answer, sources: response.sources },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          error: true,
          content:
            'Không kết nối được tới máy chủ chatbot. Bạn hãy kiểm tra backend rồi thử lại — phần còn lại của website vẫn dùng bình thường.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Mở chatbot Hát Xoan AI"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-son text-nga shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </button>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-label="Hát Xoan AI"
          className="fixed inset-0 z-50 flex flex-col bg-nga shadow-2xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(34rem,80vh)] sm:w-[23rem] sm:rounded-2xl sm:border sm:border-vang/50 animate-slide-up"
        >
          <header className="flex items-center justify-between border-b border-vang/50 bg-son px-4 py-3 text-nga sm:rounded-t-2xl">
            <div>
              <p className="font-serif text-sm font-semibold">Hát Xoan AI</p>
              <p className="text-[11px] text-nga/70">Trả lời dựa trên Knowledge Base</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Đóng chatbot" className="rounded-full p-1.5 hover:bg-white/10">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 whitespace-pre-wrap',
                    message.role === 'user'
                      ? 'bg-son text-nga'
                      : message.error
                        ? 'border border-son/30 bg-son/5 text-muc'
                        : 'border border-vang/50 bg-white text-muc',
                  )}
                >
                  {message.content}
                  {message.sources ? <SourceList sources={message.sources} /> : null}
                </div>
              </div>
            ))}

            {messages.length === 1 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => ask(suggestion)}
                    className="rounded-full border border-vang/60 bg-white px-3 py-1.5 text-xs text-muc-soft hover:border-son/40 hover:text-son"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}

            {loading ? (
              <div className="flex items-center gap-2 text-xs text-muc-soft" role="status" aria-live="polite">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Đang tra cứu Knowledge Base…
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-vang/50 p-3">
            <div className="flex items-end gap-2">
              <label htmlFor="chat-input" className="sr-only">
                Nhập câu hỏi về Hát Xoan
              </label>
              <textarea
                id="chat-input"
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void ask(input);
                  }
                }}
                placeholder="Nhập câu hỏi…"
                className="max-h-28 flex-1 resize-none rounded-xl border border-vang/60 bg-white px-3 py-2.5 text-sm text-muc placeholder:text-muc-soft/60"
              />
              <button
                type="button"
                onClick={() => void ask(input)}
                disabled={loading || input.trim().length === 0}
                aria-label="Gửi câu hỏi"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-son text-nga disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
