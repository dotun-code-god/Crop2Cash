/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      fontFamily: {
        Product_Sans_Regular: ['Product_Sans_Regular', 'Helvetica', 'Arial' ,'serif'],
        Product_Sans_Medium: ['Product_Sans_Medium', 'Helvetica', 'Arial' ,'serif'],
        Lucida_Caligraphy: ['Lucida_Caligraphy'],
      },
      colors: {
        c2c_primary: '#ffc508',
        c2c_grey: '#e7e7e7',
        add_farmer_input: '#c39b18',
      },
      screens: {
        xs: {max: '450px'}
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

