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
            animation: {
                'loading-spin': 'loading-spin 2000ms cubic-bezier(0.45, 0, 0.55, 1) infinite',
            },
            keyframes: {
                'loading-spin': {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '50%': { transform: 'rotate(720deg)' },
                },
            },
        },
    },
    plugins: [
        plugin(({ matchUtilities }) => {
            matchUtilities({
                'grid-col-auto-max': (value) => ({
                    gridTemplateColumns: `repeat(auto-fit, minmax(min(${value}rem, 100%), 1fr))`,
                }),
            });
        }),
    ],
    darkMode: 'class',
};
