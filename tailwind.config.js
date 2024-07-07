/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      scrollBehavior: ['scroll-smooth'],
      colors:{
        badan: '#000F1F',
        bidang: '#265973',
        oreng: '#FF550D'
      }
    },
  },
  variants: {
    extend: {
      scrollBehavior: ['responsive'],
    },
  },
  plugins: [],
}