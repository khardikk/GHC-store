/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg: "#DFF756",
        cartBtn:"#4339F2", 
        buttonOrange:"#EF9400",
        footerBtn:"#2D4EE0"
      },
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        blueCashews: ['BlueCashews', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};