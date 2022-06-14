/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'open-sans', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f2f5fc',
          100: '#e1e8f8',
          200: '#cad8f3',
          300: '#a5beeb',
          400: '#7a9de0',
          500: '#5b7dd6',
          600: '#4762c9',
          700: '#3d50b9',
          800: '#374396',
          900: '#303b78',
        },
      },
    },
  },
  plugins: [],
};
