/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      spacing: {
        navWidth: '93%',
        bestWidth: '90%',
        cardWidth: '85%',
        over: '1200px'
      },
      colors: {
        bestBg: '#DFE2E0',
        btnBg: '#4B5548',
        rate: '#FFA501',
        bodybg: '#F5F5F4'
      }
    },
  },
  plugins: [],
}
