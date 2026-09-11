import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        foreground: '#F5F5F5',
        muted: '#71717A',
        accent: {
          blue: '#0EA5E9',
          cyan: '#06B6D4',
          violet: '#8B5CF6',
          silver: '#CBD5E1',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url('/noise-texture.png')",
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'mask-reveal': {
          '0%': { maskPosition: 'left' },
          '100%': { maskPosition: 'right' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateZ(0)' },
          '100%': { transform: 'rotate(360deg) translateZ(0)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'mask-reveal': 'mask-reveal 2s ease-out forwards',
        'orbit': 'orbit 20s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config;