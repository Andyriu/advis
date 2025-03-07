/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'unique': {
          100: '#EEEEEE',
          150: '#EBD3F8',
          200: '#DBC4F0',
          300: '#CDC1FF',
          400: '#A594F9',
          500: '#9B7EBD',
          600: '#AF47D2',
          700: '#884C90',
          750: '#682384',
          800: '#501259',
          850: '#35023C',
          950: '#24053C',
          900: '#1A1A1D',
        },
      },
    },
    fontFamily : {
      sans: ['Fira Code',"sans-serif"],
    }
  },
  plugins: [],
};
