import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch", // limit line length
            p: { marginTop: "0.5em", marginBottom: "0.5em" },
            li: { marginTop: "0.25em", marginBottom: "0.25em" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
