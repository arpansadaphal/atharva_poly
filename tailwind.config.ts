import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
      },

      maxWidth: {
        container: '1280px',
      },

      spacing: {
        '18': '72px',
        '30': '120px',
      },

      keyframes: {
        'ping-slow': {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
      },

      animation: {
        'ping-slow':
          'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },

  plugins: [],
} satisfies Config

export default config