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
    plugins: [],
};
