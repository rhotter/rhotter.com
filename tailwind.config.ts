/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: false,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
