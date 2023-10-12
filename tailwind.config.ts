import type { Config } from "tailwindcss";
import { tailwindColors } from "./styles";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: tailwindColors,
      fontFamily: {
        garamond: "var(--garamond)",
        bodoni: "var(--bodoni)",
        poppins: "var(--poppins)",
        montserrat: "var(--montserrat)",
      },
    },
  },
  plugins: [],
};
export default config;
