import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "blue-love": "#0052FF",
        "dark-love": "#8794FE",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        main: "url('/background.png')",
        "main-v2": "url('/v2/home-bg.png')",
        button: "url('/bg-button.png')",
        separator: "url('/separator.svg')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
