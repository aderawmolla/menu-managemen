/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        menu: {
          add: '#253BFF',
          expand: '#1D2939',
          arcticBlue: '#253BFF',
          blueGray:{
           300:"##D0D5DD",
           400:"#98A2B3",
           900:"#101828",
           600:"#475467",
           800:"#1D2939"

          },
          white:"#FFFFFF",
          lineGrean: '#9FF443',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
      }
    },
  },
  plugins: [],
}

