/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cpeBlack: "#0b0b0b",
        cpeRed: "#d90429",
        cpeOrange: "#ff6b00",
        cpeWhite: "#ffffff",
      },
      fontFamily: {
        display: ["Oswald", "Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        "glow-red": "0 8px 40px rgba(217,4,41,0.18)",
        "glow-orange": "0 8px 40px rgba(255,107,0,0.12)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
