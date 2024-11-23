/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg: "#DFF756",
        cartBtn:"#4339F2"
      },
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        blueCashews: ['BlueCashews', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
