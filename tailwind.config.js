/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        figma: '0px 4px 25px rgba(0, 0, 0, 0.161)',
      },
      screens: {
        '4k': '2560px',
        'xs': '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        'ipad-pro': { min: '1024px', max: '1366px' },
      },
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};