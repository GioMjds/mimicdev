/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-dark': "#0B2447",
        'navy-bland': "#19376D",
        'purple-bland': "#576CBC",
        'pastel-lightblue': "#A5D7E8",
      },
      backgroundImage: {
        'sea-blue': 'linear-gradient(135deg, #576CBC, #4e4376)'
      }
    },
  },
  plugins: [],
}