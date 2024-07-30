/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#BEBCED',
          400: '#9E9BF5',
          500: '#5E5ADB',
          600: '#4945C4'
        },
        success: {
          0: '#E1FCEF',
          100: '#A9EBCA',
          400: '#38A06C',
          500: '#14804A',
          800: '#004322'
        },
        warning: {
          0: '#FCF2E6',
          400: '#C97A20',
          500: '#AA5B00'
        },
        danger: {
          0: '#FFEDEF',
          400: '#EF5466',
          500: '#D1293D'
        },
        inactive: {
          50: '#E9EDF5',
          500: '#687182',
          600: '#5A6376'
        },
        light: '#F7F9FC'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
