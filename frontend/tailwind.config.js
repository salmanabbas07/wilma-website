/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0B70A6',
          yellow: '#F3B209',
        },
        brand: {
          blue: '#0B70A6',
          yellow: '#F3B209',
          lightBlue: '#7BB6D0',
          golden: '#F3C75B',
          paleYellow: '#FCE4A9',
          green: '#166534',
          greenBadge: '#15803d',
          darkNavy: '#081738',
          darkNavyFooter: '#07122e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
