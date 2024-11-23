/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
};
