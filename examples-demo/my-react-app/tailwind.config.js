/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e83a45',
        secondary: '#2f80ed',
        white: '#ffffff',
        light: '#eaeaea',
        'gray-500': '#3333',
        'gray-300': '#dcdcdc',
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
};