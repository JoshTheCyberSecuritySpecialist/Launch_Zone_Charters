/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'space-black': '#0a0a0a',
        'rocket-red': '#FF0000',
        'steel-gray': '#2d2d2d',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'space': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 0, 0, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 30px rgba(255, 0, 0, 0.6)' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/23764/pexels-photo.jpg')",
        'bio-pattern': "url('https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg')",
      },
    },
  },
  plugins: [],
};