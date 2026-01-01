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
       'dpim-green': '#0b5232', // Deep green header
        'dpim-gold': '#ffc107',  // Icon gold
        'dpim-accent': '#00b0e1', // Cyan login button
        'thaiid-blue': '#1a429b',
        'tangrat-dark': '#0d2551',
        'industry-purple': '#6f42c1',
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