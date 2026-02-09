/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
    },
    extend: {
      colors: {
        primary: "#0ea5e9",   // Sky Blue (Travel theme)
        secondary: "#6366f1", // Indigo
        accent: "#22c55e",    // Green CTA
        dark: "#0f172a",
        light: "#f8fafc",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        handwritten: ['"Patrick Hand"', "cursive"],
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        xl: "1rem",
      },
      animation: {
        fade: "fadeIn 0.6s ease-in-out",
        slide: "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
  animation: {
  gradient: "gradient 15s ease infinite",
  floatSlow: "floatSlow 6s ease-in-out infinite",
},
keyframes: {
  gradient: {
    "0%,100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
  floatSlow: {
    "0%,100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-18px)" },
  },
},

};
