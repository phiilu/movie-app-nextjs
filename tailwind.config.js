module.exports = {
    purge: [
        './pages/**/*.tsx',
        './components/**/*.tsx',
        './pages/**/*.js',
        './components/**/*.js',
    ],
    theme: {
        extend: {
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            }
        }
    },
    variants: {},
    plugins: [],
}
