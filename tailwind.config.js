module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': ["Roboto", "sans-serif"],
      },
    },
    screens: {
      'lg': '960px',
      'md': {'max': '959px'},
      'sm': {'max': '639px'}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
