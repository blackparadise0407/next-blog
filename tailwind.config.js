module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            keyframes: {
                appear: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
            },
            animation: {
                appear: 'appear 0.2s ease-in-out forwards',
                wiggle: 'wiggle 1s ease-in-out infinite',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
