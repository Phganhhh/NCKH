import { PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  url: string | null;
  title: string;
}

/** Hỗ trợ file video trực tiếp; link YouTube/Vimeo được nhúng qua iframe. */
export function VideoPlayer({ url, title }: VideoPlayerProps) {
  if (!url) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-vang/70 bg-white/50 text-center">
        <PlayCircle className="h-8 w-8 text-vang" aria-hidden="true" />
        <p className="px-6 text-sm text-muc-soft">
          Chưa có video biểu diễn cho bài Xoan này. Video sẽ được bổ sung khi có tư liệu với nguồn và
          bản quyền rõ ràng.
        </p>
      </div>
    );
  }

  const embed = toEmbedUrl(url);
  if (embed) {
    return (
      <div className="aspect-video overflow-hidden rounded-2xl border border-vang/50 bg-black">
        <iframe
          src={embed}
          title={`Video biểu diễn: ${title}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video
      controls
      preload="metadata"
      className="aspect-video w-full rounded-2xl border border-vang/50 bg-black"
      aria-label={`Video biểu diễn: ${title}`}
    >
      <source src={url} />
      Trình duyệt của bạn không hỗ trợ phát video.
    </video>
  );
}

function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname === 'youtu.be') return `https://www.youtube.com/embed${parsed.pathname}`;
    if (parsed.hostname.includes('vimeo.com')) return `https://player.vimeo.com/video${parsed.pathname}`;
    return null;
  } catch {
    return null;
  }
}
