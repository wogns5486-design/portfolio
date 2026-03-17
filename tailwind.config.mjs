/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0B1120', deep: '#070D1A' },
        surface: { DEFAULT: '#111827', light: '#1E293B' },
        border: { DEFAULT: 'rgba(148,163,184,0.08)', light: 'rgba(148,163,184,0.12)' },
        primary: { DEFAULT: '#818CF8', deep: '#6366F1' },
        accent: { DEFAULT: '#6366F1', hover: '#818CF8' },
        live: { DEFAULT: '#34D399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)' },
        gold: { glow: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)' },
        'text-main': '#F1F5F9',
        'text-sub': '#94A3B8',
        'text-muted': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      maxWidth: {
        content: '1080px',
      },
    },
  },
  plugins: [],
};
