/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // UI colors
        primary: "#2F80ED",
        secondary: "#F2994A",
        info: "#2F80ED",
        success: "#27AE60",
        warning: "#E2B93B",
        error: "#EB5757",
        // Custom colors
        //vnbg: "#F9FAFB",
        vnbg: "#FFFFFF",
        vnblack1: "#000000",
        vnblack2: "#1D1D1D",
        vnblack3: "#282828",
        vnwhite: "#FFFFFF",
        vngrey1: "#333333",
        vngrey2: "#4F4F4F",
        vngrey3: "#828282",
        vngrey4: "#BDBDBD",
        vngrey5: "#E0E0E0",
        
        accent: "#FBBF24",
        neutral: "#374151",
        "base-100": "#FFFFFF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
});
