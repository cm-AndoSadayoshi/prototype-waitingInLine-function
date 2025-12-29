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
        // UI Color
        primary: {
          DEFAULT: "#00170C",
          touch: "#001189",
        },
        secondary: {
          touch: "#020050C",
        },
        error: {
          DEFAULT: "#C62928",
          touch: "#A12020",
          "secondary-touch": "#F2C1C1",
        },
        // UI Color/Black
        ui: {
          dark: "#080B08",
          default: "#414143",
          soft: "#757578",
          light: "#B4B4B7",
          pale: "#D8D8D8",
          "very-pale": "#F1F1F4",
          "extremely-pale": "#F8F8FB",
        },
        // Link Color
        link: "#00118F",
      },
      spacing: {
        // 8の倍数スペーシング
        "4": "4px",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "20": "20px",
        "24": "24px",
        "32": "32px",
        "40": "40px",
        "48": "48px",
      },
    },
  },
  plugins: [],
};

export default config;
