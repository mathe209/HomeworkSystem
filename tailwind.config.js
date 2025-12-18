module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./backend/staticFiles/**/*.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blackandwhite': "url('/images/blackandwhite.jpg')",
        'home-bg': "url('/images/home-bg.jpg')"
      }
    }
  },
  plugins: [],
}