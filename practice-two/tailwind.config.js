/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#416edf',
        secondary: '#ffce31',
        white: '#ffffff',
        light: '#f5f7fb',
        danger: '#dc3545',
        'gray-500': '#3333',
        'gray-300': '#dcdcdc'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
};
