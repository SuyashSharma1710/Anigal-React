/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'text-md': '1px 1px 2px rgba(0, 0, 0, 0.3)',
        'text-lg': '2px 2px 4px rgba(0, 0, 0, 0.3)',
        'text-xl': '0px 0px 6px rgba(0, 0, 0, 0.8), inset 0px 0px 6px rgba(0, 0, 0, 0.8) ',
      },
    },
  },
  plugins: [],
}