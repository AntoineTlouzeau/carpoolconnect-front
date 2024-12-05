/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        cobalt:'#1565C0',
        emeraude:'#4CAF50',
        azur:'#82B9FF',
        jade:'#A5D7A7',
        mimosa:'#FFD54F',

        primary: {
          light: "#4da6ff",
          DEFAULT: "#0B84FF",
          dark: "#0066cc",
        },
        secondary: {
          light: "#f39e58",
          DEFAULT: "#ed7410",
          dark: "#bf5d0d",
        },
      },
      backgroundImage: {
        'background': "url('/src/app/assets/images/illu_background.png')"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
