/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        personal: "#FD99AF", 
        freelance: "#3FD4F4",
        work: "#FAC609",
      },
    },
  },
  plugins: [],
}

