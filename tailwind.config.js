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
          },
          'light-grey': {
          50: '#FAFDFD',
          100: '#F6FAFC',
          200: '#E8F3F7',
          300: '#DBEBF2',
          400: '#BFDDE9',
          500: '#A4CEDF',
          600: '#94B9C9',
          700: '#627C86',
          800: '#4A5D64',
          900: '#313E43',
          },
          'dark-grey': {
          50: '#F6F6F6',
          100: '#ECECEC',
          200: '#D1D1D1',
          300: '#B5B5B5',
          400: '#7D7D7D',
          500: '#454545',
          600: '#3E3E3E',
          700: '#292929',
          800: '#1F1F1F',
          900: '#151515',
          },
          'gradient': {
          50: '#FDFDFD',
          100: '#FCFCFC',
          200: '#F7F7F7',
          300: '#F1F1F1',
          400: '#E7E7E7',
          500: '#DDDDDD',
          600: '#C7C7C7',
          700: '#858585',
          800: '#636363',
          900: '#424242',
          },
          'a': {
          50: '#F5F5F5',
          100: '#ECECEC',
          200: '#CECECE',
          300: '#B1B1B1',
          400: '#777777',
          500: '#3C3C3C',
          600: '#363636',
          700: '#242424',
          800: '#1B1B1B',
          900: '#121212',
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
