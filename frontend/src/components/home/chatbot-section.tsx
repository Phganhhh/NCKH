import { MessageCircle } from 'lucide-react';

import { SectionHeading } from '@/components/ui/section-heading';

const TOPICS = ['Lịch sử', 'Nghệ thuật biểu diễn', 'Các bài Xoan', 'Lời ca', 'Trang phục', 'Giá trị văn hóa'];

export function ChatbotSection() {
  return (
    <section className="border-t border-vang/40 bg-white/40 py-20 sm:py-24">
      <div className="container-content grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Trợ lý AI"
            title="Hỏi đáp cùng Hát Xoan AI"
            description="Bạn có thể hỏi AI về lịch sử, nghệ thuật biểu diễn, bài Xoan, lời ca, trang phục và các giá trị văn hóa của Hát Xoan."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {TOPICS.map((topic) => (
              <span key={topic} className="rounded-full border border-vang/60 bg-nga px-3.5 py-1.5 text-xs text-muc-soft">
                {topic}
              </span>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muc-soft">
            <MessageCircle className="h-4 w-4 text-son" aria-hidden="true" />
            Mở trợ lý bằng nút tròn ở góc dưới bên phải màn hình.
          </p>
        </div>

        {/* Mô phỏng tĩnh khung chat — chatbot thật nằm ở nút floating */}
        <div className="rounded-2xl border border-vang/50 bg-nga p-5 shadow-sm">
          <div className="space-y-3 text-sm">
            <p className="max-w-[85%] rounded-2xl border border-vang/50 bg-white px-4 py-3 leading-6 text-muc">
              Xin chào! Bạn muốn tìm hiểu điều gì về Hát Xoan?
            </p>
            <p className="ml-auto max-w-[70%] rounded-2xl bg-son px-4 py-3 leading-6 text-nga">Hát Xoan là gì?</p>
            <div className="max-w-[90%] rounded-2xl border border-vang/50 bg-white px-4 py-3 leading-6 text-muc">
              <p>Trợ lý trả lời dựa trên Knowledge Base của Hát Xoan…</p>
              <p className="mt-2 border-t border-vang/50 pt-2 text-[11px] uppercase tracking-wider text-reu">
                Nguồn tham chiếu
              </p>
              <p className="text-[11px] text-muc-soft">Hát Xoan là gì · source_001</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
