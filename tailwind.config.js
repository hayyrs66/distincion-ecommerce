/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      backgroundImage: {
        "hero-image": "url('/assets/images/santi.webp')",
        "about-image": "url('/assets/images/santi.jpg')",
      },

      keyframes: {
        smallFont: {
          "0%": {
            fontSize: "8rem",
          },
          "100%": {
            fontSize: "3rem",
          },
        },
        bigFont: {
          "0%": {
            fontSize: "3rem",
          },
          "100%": {
            fontSize: "8rem",
          },
        },
      },
      animation: {
        smallFont: "smallFont 400ms cubic-bezier(.23,.78,.63,.99) forwards",
        bigFont: "bigFont 400ms cubic-bezier(.23,.78,.63,.99) forwards",
      },
      gridTemplateColumns: {
        "clothes-section": "2fr 1fr",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
      fontSize:{
        clamp_hero: "clamp(9rem, 30vw, 25rem)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
