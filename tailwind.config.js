module.exports = {
  theme: {
    extend: {
      colors: {
          'danger': {
          50: '#FEF2F5',
          100: '#FCE6EA',
          200: '#F8C0CB',
          300: '#F49AAB',
          400: '#EC4F6D',
          500: '#E4032E',
          600: '#CD0329',
          700: '#89021C',
          800: '#670115',
          900: '#44010E',
          },
          'primary': {
          50: '#F2F6FA',
          100: '#E6EDF5',
          200: '#BFD3E7',
          300: '#99B9D9',
          400: '#4D84BC',
          500: '#004F9F',
          600: '#00478F',
          700: '#002F5F',
          800: '#002448',
          900: '#001830',
          },
          'success': {
          50: '#F2FAF5',
          100: '#E6F5EB',
          200: '#BFE5CE',
          300: '#99D6B0',
          400: '#4DB775',
          500: '#00983A',
          600: '#008934',
          700: '#005B23',
          800: '#00441A',
          900: '#002E11',
          }
       }
     }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
    borderColor: ['responsive', 'hover', 'focus'],
    borderWidth: ['responsive', 'hover', 'focus']
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
