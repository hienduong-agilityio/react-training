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
        grass: '#80e177',
        'fire-400': '#EB6C6C',
        'bug-400': '#91AC22',
        'water-400': '#009ACB',
        'flying-400': '#2299EE',
        'poison-400': '#7E00CB',
        'normal-400': '#B6B6B6',
        'rock-400': '#857D57',
        'ground-400': '#A77437',
        'fighting-400': '#BA114E',
        'ghost-400': '#6B2BF1',
        'psychic-400': '#C4484A',
        'ice-400': '#3A9D90',
        'dragon-400': '#1268B8',
        'dark-400': '#373737',
        'fairy-400': '#C01A8D',
        'electric-400': '#B7B117',
        'steel-400': '#448F85',
        'grass-400': '#1EBA11'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
};
