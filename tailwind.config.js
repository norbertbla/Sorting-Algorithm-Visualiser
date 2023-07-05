/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui:{
    themes: ["dark"]
  },
  theme: {
    extend: {
      screens: {
        sm: "640px", // (min-width: 640px)
        md: "768px", // (min-width: 768px)
        lg: "1024px", // (min-width: 1024px)
        xl: "1280px", // (min-width: 1280px)
        "2xl": "1536px", // (min-width: 1536px)
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [require("daisyui")],
};
