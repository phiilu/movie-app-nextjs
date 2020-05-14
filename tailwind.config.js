module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.hbs',
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
