/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    '!./node_modules/daisyui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px', // (min-width: 1536px)
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    themes: ['dark'],
  },
  plugins: [require('daisyui')],
};