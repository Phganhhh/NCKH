import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Bảng màu di sản: đỏ son, vàng nhạt, trắng ngà, xanh cổ
        son: { DEFAULT: '#9E2B25', dark: '#7A1F1B', light: '#C2453C' },
        vang: { DEFAULT: '#D9A441', light: '#EBD3A0', pale: '#F6EBD2' },
        nga: { DEFAULT: '#FAF6EF', dark: '#F0E9DC' },
        reu: { DEFAULT: '#2F4B3F', light: '#4A6B5C' },
        muc: { DEFAULT: '#1F1B18', soft: '#4A423C' },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Noto Serif"', 'Georgia', 'Times New Roman', 'serif'],
      },
      maxWidth: { content: '72rem' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'none' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .5s ease-out both', 'slide-up': 'slide-up .25s ease-out both' },
    },
  },
  plugins: [],
};

export default config;
