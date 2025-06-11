/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#eab308",
        secondaryDarkColor: "#0d0d0d",
      },
    },
  },
  plugins: [heroui()],
}

