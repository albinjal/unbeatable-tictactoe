module.exports = {
  purge: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'public/**/*.html'],
  theme: {
    extend: {
      colors: {
        // https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557
        'imperial-red': '#E63946',
        honeydew: '#F1FAEE',
        'powder-blue': '#A8DADC',
        'celadon-blue': '#457B9D',
        'prussian-blue': '#1D3557',
        'dark-blue': '#21252b',
        'soft-white': '#c2c3c2',
      },
      width: {
        bvw0: '95vw',
        bvw1: '85vh',
      },
      height: {
        bvw0: '95vw',
        bvw1: '85vh',
      },
      maxHeight: {
        lg: '32rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
