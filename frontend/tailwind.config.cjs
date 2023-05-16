/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#353935',
      },
      backgroundImage: {
        'widescreen': "url('http://localhost:4000/uploads/garagebackground.jpg')",
        'mobile': "url('http://localhost:4000/uploads/darkbackgroundmobile.jpg')",
      }
    },
  },
  plugins: [],
}
