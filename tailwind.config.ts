import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This makes Sarabun the default font when you use 'font-sans'
        sans: ["var(--font-sarabun)", "sans-serif"],
      },
      colors: {
        'dpim-green': '#0b5232',
        'dpim-gold': '#ffc107',
        // Bootstrap-like colors
        'warning': '#ffc107',
      },
      spacing: {
        // Bootstrap-like margin classes
        '3': '1rem',
      }
    },
  },
  plugins: [],
};

export default config;