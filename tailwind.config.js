/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "primary-dark": '#090c08',
        "primary-light": '#b9c6ae',
        "primary-1": '#474056',
        "primary-2": '#757083',
        "primary-3": '#8a95a5',
      }
    },
  },
  plugins: [],
}

