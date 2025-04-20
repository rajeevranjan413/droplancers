/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#1e2641',
        secondary: '#1e517e',
        accent: '#ffc107',
        background: '#f1f2fc',
        text: '#333333',
        border: '#3a456a',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}