import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orangecolor: "#F98149",
        page:'#FFFF',
        links:"#8A948C",
        secondcolor:"#003F7D",
        form:'#B1B1B1'
      },
      width:{
        btns:'150px'
      }
    },
  },
  plugins: [],
};
export default config;
