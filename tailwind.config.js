module.exports = {
  content: ["./**/*.html", "./**/*.njk"],
  theme: {
    fontFamily: {
      'serif': ["Petrona", "Georgia", 'serif'],
      'sans': ["Open Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        'base': 'rgb(51, 50, 64)',
        'primary': '#B50E1A',
        'navy': '#002C59',
        'yellow': '#f2b039',
        'blue-500': '#005ea2',
        'gray-300': '#272727',
        'gray-900': '#d9d9d9',
        'salmon': '#fe6659',
        'orange': '#fe6659'
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
