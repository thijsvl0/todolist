/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'open-sans', 'sans-serif'],
      },
      boxShadow: {
        md: '0 2px 4px -1px rgba(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
