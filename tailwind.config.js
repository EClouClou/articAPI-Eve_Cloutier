/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,html}",
  ],
  theme: {
    colors: {
      'red': '#b50938',
      'grey-light': '#f8f8f8',
      'grey': '#767676',
      'grey-dark': '#333',
      'offWhite': '#FDFCFA',
      'black': '#1a1a1a',

    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}