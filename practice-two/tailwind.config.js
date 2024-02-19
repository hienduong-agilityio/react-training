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
        'gray-300': '#dcdcdc',
        fire: '#ff6464',
        bug: '#c9ff84',
        water: '#9ff3ff',
        flying: '#2299EE',
        poison: '#d89cfd',
        normal: '#cbcbcb',
        rock: '#cfc06f',
        ground: '#ffbf72',
        fighting: '#ff699f',
        ghost: '#b592ff',
        psychic: '#ff5e60',
        ice: '#aefff4',
        dragon: '#87c5ff',
        dark: '#8f8f8f',
        fairy: '#ffa2e3',
        electric: '#fffa86',
        steel: '#a4ffe9',
        grass: '#80e177'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
};
