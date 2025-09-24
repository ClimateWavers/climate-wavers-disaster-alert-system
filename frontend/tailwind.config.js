/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(circle, rgba(63,94,251,0.9448967086834734) 0%, rgba(252,70,107,0.2698266806722689) 100%);",
        radial2:
          "radial-gradient(circle, rgba(63,94,251,0.8636642156862745) 17%, rgba(210,70,252,0.4042804621848739) 100%);",
        linear: "linear-gradient(180deg, #008080 0%, #34A853 100%);",
        bgGradient:
          "linear-gradient(175deg, rgba(34,5,81,1) 17%, rgba(15,2,25,1) 100%)",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
    },
  },
  plugins: [],
};
