import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-son">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold leading-snug text-muc sm:text-3xl">{title}</h2>
      <span
        className={cn('mt-4 block h-px w-16 bg-vang', align === 'center' && 'mx-auto')}
        aria-hidden="true"
      />
      {description ? <p className="mt-5 leading-7 text-muc-soft">{description}</p> : null}
    </div>
  );
}
