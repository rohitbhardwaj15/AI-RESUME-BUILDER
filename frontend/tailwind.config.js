/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#091226",
        sky: "#e6f4ff",
        pop: "#0ea5e9"
      },
      boxShadow: {
        glow: "0 10px 30px rgba(14,165,233,0.25)"
      }
    }
  },
  plugins: []
};