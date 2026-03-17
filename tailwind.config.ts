import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Blue 500
          '50': '#EFF6FF',
          '100': '#DBEAFE',
          '200': '#BFDBFE',
          '300': '#93C5FD',
          '400': '#60A5FA',
          '500': '#3B82F6',
          '600': '#2563EB',
          '700': '#1D4ED8',
          '800': '#1E40AF',
          '900': '#1E3A8A',
          '950': '#172554',
        },
        gray: {
          DEFAULT: '#6B7280', // Gray 500
          '50': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'lifted': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 15px 0 rgba(59, 130, 246, 0.5)',
      },
      animation: {
        'pulse': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
       keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
