/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'phosphor-green': '#00FF41',
        'phosphor-dim': '#00cc33',
        'monitor-black': '#0a0f0a',
        'alert-red': '#FF0000',
        'cat-amber': '#FFA500',
      },
      fontFamily: {
        'terminal': ['VT323', 'Fira Code', 'monospace'],
      },
      animation: {
        'blink': 'blink 0.7s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: 1 },
          '51%, 100%': { opacity: 0 },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 65, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
