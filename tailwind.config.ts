import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        surface: '#111111',
        line: '#272727',
        signal: '#e11d2e',
        'signal-dark': '#b91424',
        mist: '#a3a3a3',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      screens: { xs: '480px' },
      backgroundImage: {
        'hero-grid': 'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
} satisfies Config
