import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "gradient-rainbow" : "linear-gradient(to right, #FF0000 0%, #FF5125 16%, #FFF700 33%, #58EC19 50%, #0EFF76 66%, #10CFFF 83%, #2A5CFF 100%)",
      },
      filterShadow : {
        black : "drop-shadow(2px 0 #000) drop-shadow(-2px 0 #000) drop-shadow(0 2px #000) drop-shadow(0 -2px #000) drop-shadow(1px 1px #000) drop-shadow(-1px -1px #000) drop-shadow(1px -1px #000) drop-shadow(-1px 1px #000)"
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'filter': (value) => ({
          filter: value,
        }),
      },
      { values: theme('filterShadow') }
    )
  }),],
};
export default config;
