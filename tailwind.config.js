const plugin = require('tailwindcss/plugin');

module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        color: '#FFF',
                        a: {
                            color: '#4798C5',
                            '&:hover': {
                                color: '#2c5282',
                            },
                        },
                        h1: {
                            color: '#FFF',
                        },
                        h2: {
                            color: '#FFF',
                        },
                        h3: {
                            color: '#FFF',
                        },
                        h4: { color: '#FFF' },
                        em: { color: '#FFF' },
                        strong: { color: '#FFF' },
                        blockquote: { color: '#FFF' },
                        code: { backgroundColor: '#1A1E22', color: '#FFF' },
                    },
                },
            },
            keyframes: {
                appear: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                'slide-in': {
                    '0%': {
                        transform: 'translateX(300px)',
                        'animation-timing-function':
                            'cubic-bezier(.01,1.75,.65,.81)',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                        'animation-timing-function':
                            'cubic-bezier(.01,1.75,.65,.81)',
                    },
                },
                'slide-out': {
                    '0%': {
                        transform: 'translateX(0)',
                        opacity: 1,
                        'animation-timing-function':
                            'cubic-bezier(1,-0.81,0,.81)',
                    },
                    '100%': {
                        transform: 'translateX(300px)',
                        opacity: 0.5,
                        'animation-timing-function':
                            'cubic-bezier(1,-0.81,0,.81)',
                    },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
            },
            animation: {
                appear: 'appear 0.2s ease-in-out forwards',
                wiggle: 'wiggle 1s ease-in-out infinite',
                'slide-in': 'slide-in 0.3s ease-in forwards',
                'slide-out': 'slide-out 0.3s ease-in forwards',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addBase, theme }) {
            addBase({
                h1: {
                    fontSize: theme('fontSize.3xl'),
                    fontWeight: theme('fontWeight.medium'),
                },
                h2: {
                    fontSize: theme('fontSize.2xl'),
                    fontWeight: theme('fontWeight.medium'),
                },
                h3: {
                    fontSize: theme('fontSize.xl'),
                    fontWeight: theme('fontWeight.medium'),
                },
                h4: {
                    fontSize: theme('fontSize.lg'),
                    fontWeight: theme('fontWeight.medium'),
                },
                h5: {
                    fontSize: theme('fontSize.base'),
                    fontWeight: theme('fontWeight.medium'),
                },
                h6: {
                    fontSize: theme('fontSize.sm'),
                    fontWeight: theme('fontWeight.medium'),
                },
            });
        }),
    ],
};
