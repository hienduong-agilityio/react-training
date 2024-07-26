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
        gray: { 300: '#dcdcdc', 400: '#3333' },
        fire: { 300: '#ff6464', 400: '#EB6C6C' },
        bug: { 300: '#c9ff84', 400: '#91AC22' },
        water: { 300: '#9ff3ff', 400: '#009ACB' },
        flying: { 300: '#2299EE', 400: '#2299EE' },
        poison: { 300: '#d89cfd', 400: '#7E00CB' },
        normal: { 300: '#cbcbcb', 400: '#B6B6B6' },
        rock: { 300: '#cfc06f', 400: '#857D57' },
        ground: { 300: '#ffbf72', 400: '#A77437' },
        fighting: { 300: '#ff699f', 400: '#BA114E' },
        ghost: { 300: '#b592ff', 400: '#6B2BF1' },
        psychic: { 300: '#ff5e60', 400: '#C4484A' },
        ice: { 300: '#aefff4', 400: '#3A9D90' },
        dragon: { 300: '#87c5ff', 400: '#1268B8' },
        dark: { 300: '#8f8f8f', 400: '#373737' },
        fairy: { 300: '#ffa2e3', 400: '#C01A8D' },
        electric: { 300: '#fffa86', 400: '#B7B117' },
        steel: { 300: '#a4ffe9', 400: '#448F85' },
        grass: { 300: '#80e177', 400: '#1EBA11' }
      },
      backgroundImage: {
        'pokemon-card': 'url(https://relaxed-jang-821b42.netlify.app/static/media/watermark-pokeball.8f7e353c.svg)'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
};
