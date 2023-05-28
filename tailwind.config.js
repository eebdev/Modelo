module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "modelo-blue": "#053674",
        "modelo-red": "#E43941",
        "modelo-yellow": "#ECAE12",
        "modelo-brown": "#73491D",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}