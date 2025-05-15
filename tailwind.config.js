/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bddcff',
          300: '#84c0ff',
          400: '#449eff',
          500: '#1a7fff',
          600: '#0062e6',
          700: '#004ebd',
          800: '#00429b',
          900: '#003380',
        },
        gray: {
          50: '#DACBB4',    // Beige principal
          100: '#d3c2a8',   // Beige légèrement plus foncé
          200: '#cbb8a0',   // Beige moyen
          300: '#c2ae96',   // Beige foncé
          400: '#b8a38c',   // Beige plus foncé
          500: '#ae9882',   // Beige grisé
          600: '#1a1a1a',   // Noir très foncé
          700: '#141414',   // Noir profond
          800: '#0a0a0a',   // Noir plus profond
          900: '#000000',   // Noir pur
        },
      },
    },
  },
  plugins: [],
};