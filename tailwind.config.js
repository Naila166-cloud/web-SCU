/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // pastikan semua file React tercover
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0072BC",       // Biru utama SCU
        "accent-green": "#8DC63F", // Hijau aksen
        "accent-red": "#ED1C24",   // Merah aksen
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
