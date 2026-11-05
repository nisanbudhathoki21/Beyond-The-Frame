import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F0F0E",
        charcoal: "#1A1A18",
        cream: "#FFFBF0",
        ivory: "#FFF8E7",
        warm: "#F5F1E8",
        muted: "#8A8A85",
        gold: "#D6B77A",
        "gold-dark": "#B89A5A",
        "gold-light": "#E8D5A8",
        paper: "#FFFCF5",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
