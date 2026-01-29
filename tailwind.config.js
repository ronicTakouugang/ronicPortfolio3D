/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: "#ffffff",   // permet bg-white et text-white
          50: "#d9ecff",        // ta custom white-50
        },
        black: {
          DEFAULT: "#000000",   // permet bg-black et text-black
          50: "#1c1c21",
          100: "#0e0e10",
          200: "#282732",
        },
        blue: {
          50: "#839cb5",
          100: "#2d2d38",
        },
      },
      fontFamily: {
        sans: ["Mona Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
