import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
      },
      colors: {
        wt: {
          forest: "#2d5a27",
          trail: "#8b6914",
          sky: "#4a90d9",
          sand: "#d4a574",
          sunset: "#f4a460",
          dark: "#1a1a2e",
          darker: "#0f0f1a",
          bark: "#5c3a1e",
          leaf: "#4caf50",
          water: "#2196f3",
          rock: "#757575",
          snow: "#e8e8e8",
          ember: "#ff6b35",
        },
      },
      animation: {
        "pixel-blink": "pixel-blink 1s steps(2) infinite",
        "pixel-float": "pixel-float 3s steps(4) infinite",
        "campfire": "campfire 0.5s steps(3) infinite",
        "star-twinkle": "star-twinkle 2s steps(3) infinite",
        "tree-sway": "tree-sway 4s steps(5) infinite",
        "xp-pulse": "xp-pulse 0.3s steps(2)",
      },
      keyframes: {
        "pixel-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pixel-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "25%": { transform: "translateY(-4px)" },
          "75%": { transform: "translateY(4px)" },
        },
        campfire: {
          "0%": { content: '"🔥"' },
          "33%": { content: '"🏕️"' },
          "66%": { content: '"🔥"' },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "1" },
          "33%": { opacity: "0.3" },
          "66%": { opacity: "0.7" },
        },
        "tree-sway": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-2deg)" },
          "75%": { transform: "rotate(2deg)" },
        },
        "xp-pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      boxShadow: {
        pixel: "4px 4px 0px #000",
        "pixel-sm": "2px 2px 0px #000",
        "pixel-lg": "6px 6px 0px #000",
        "pixel-inset": "inset 2px 2px 0px rgba(255,255,255,0.1), inset -2px -2px 0px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
