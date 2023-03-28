/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          350: 'rgb(183, 188 197)',
        },
      },
      maxWidth: {
        container: '75rem',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  darkMode: 'class',
};
