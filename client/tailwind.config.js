/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // adds tailwind to css file
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#9fc4a3',
        mint: '#91b394'
      },
      aspectRatio: {
        'rect': '5 / 4',
      },
    },
    fontFamily: {
      rowdies: ['Rowdies', 'sans-serif'],
      merienda: ['Merienda', 'coursive'],
    },
  },
  plugins: [],
}

