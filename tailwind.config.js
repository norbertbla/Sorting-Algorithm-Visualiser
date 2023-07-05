/** @type {import('tailwindcss').Config} */

export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
  "./node_modules/daisyui/**/*.{js,ts,jsx,tsx}",
];

export const theme = {
  extend: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px", // (min-width: 1536px)
    },
    transitionProperty: {
      width: "width",
    },
  },
};

export const darkMode = ["class", '[data-theme="dark"]'];

export const daisyui = {
  themes: ["dark"]
};

export const plugins = [require("daisyui")];
