module.exports = {
  theme: {
    extend: {
      color: {
        primary: '#004f9f'
        danger:  {
          '50' : '#e4032e',
        }
        success: {
          '50' : '#00983a',
        }
        hellerGrauton {
          '50' : '#a4cedf',
        }
        dunklerGrauton {
          '50' : '#454545',
       }
       
    body: #000000;
    H: #000000;
    a: #3c3c3c;
    background-image: radial-gradient(white, #dddddd);

      }
    }
  }
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
