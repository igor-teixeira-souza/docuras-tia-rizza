/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Inclui todos os arquivos React
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFE6F0", // rosa suave de fundo
        dark: "#333333", // cor escura para textos e botões
      },
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
