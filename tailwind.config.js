/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0095f6',
                'primary-hover': '#1877f2',
                line: '#8e8e8e',
                facebook: '#385185',
                'grey-border': '#dbdbdb',
                'grey-border-focus': '#a8a8a8',
                'input-background': '#FAFAFA',
                'body-dark': '#000000',
                'side-dark': '#000000',
                'nav-hover': '#121212',
                'border-nav': '#262626',
                'text-error': '#ed4956',
            },
            backgroundImage: {
                loginImg: "url('/images/login.png')",
                logoImg: "url('/images/logo.png')",
                chPlay: "url('/images/chPlay.png')",
                microsoft: "url('/images/microsoft.png')",
            },
        },
    },
    plugins: [],
};
