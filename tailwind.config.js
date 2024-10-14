/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,html}",
  ],
  theme: {
    colors: {
      'nom': '#000000',

    },
    fontFamily: {
      'sans': ['nom', 'sans-serif'],
      'heading': ['nom', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

