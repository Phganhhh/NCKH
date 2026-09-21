import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const PLACEHOLDER_MARK = '[PLACEHOLDER CONTENT';

/** Nội dung chưa có nguồn xác minh -> UI phải hiển thị cảnh báo thay vì giả vờ là dữ liệu thật. */
export function isPlaceholder(text: string | null | undefined): boolean {
  return Boolean(text && text.includes(PLACEHOLDER_MARK));
}

export function stripPlaceholderMark(text: string): string {
  return text.replaceAll('[PLACEHOLDER CONTENT – REPLACE WITH VERIFIED SOURCE]', '').trim();
}
