/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          dark: '#E05252',
        },
        secondary: {
          DEFAULT: '#4D96FF',
          dark: '#3A7AD9',
        },
        accent: {
          DEFAULT: '#FFD166',
          dark: '#E6B84F',
        },
        background: {
          DEFAULT: '#F7F7F7',
          dark: '#1A1A1A',
        },
        text: {
          DEFAULT: '#333333',
          dark: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};
