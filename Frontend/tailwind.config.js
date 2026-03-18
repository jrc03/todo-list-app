/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      brand: {
        900: "var(--color-brand-900)",
        700: "var(--color-brand-700)",
        500: "var(--color-brand-500)",
        200: "var(--color-brand-200)",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
}