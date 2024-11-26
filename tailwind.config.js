/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)']
      },
      backgroundImage: {
        "hero-image": "url('/assets/images/IMG_5368-2-Recovered-5.jpg')",
      },
        keyframes:{
          smallFont:{
            "0%": {fontSize: "8rem"},         
            "100%": {fontSize: "3rem"},         
          },
          bigFont:{
            "0%": {fontSize: "3rem"},         
            "100%": {fontSize: "8rem"},         
          },
        },
        animation:{
          smallFont: "smallFont 400ms cubic-bezier(.23,.78,.63,.99) forwards",
          bigFont: "bigFont 400ms cubic-bezier(.23,.78,.63,.99) forwards",
        },
        gridTemplateColumns: {
          "clothes-section": "1fr 0.5fr"
        }
    },
  },
  plugins: [],
};
