/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        soundwave: 'soundwave 1s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'slide-right': 'slideRight 1s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};