/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080A0C',
        surface: {
          50: '#1a221d',
          100: '#141c17',
          200: '#0f1612',
          300: '#0a100c',
          400: '#060a08',
        },
        brand: {
          primary: '#10B981', // Neon Emerald Green
          accent: '#22C55E',  // Cyber Green
          lime: '#84CC16',    // Neon Lime
          glow: '#4ADE80',    // Green Glow
          hot: '#F43F5E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.45)',
        'glow-neon': '0 0 35px -5px rgba(34, 197, 94, 0.45)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
        'glow-card-hover': '0 20px 40px -15px rgba(16, 185, 129, 0.35), 0 0 2px 1px rgba(74, 222, 128, 0.5)',
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
