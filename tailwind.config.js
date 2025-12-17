/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      colors: {
        bg: {
          default: "var(--color-bg-default)",
          elevated: "var(--color-bg-elevated)",
          muted: "var(--color-bg-muted)",
          contrast: "var(--color-bg-contrast)",
          chat: {
            user: "var(--color-bg-user-bubble)",
          },
        },
        text: {
          default: "var(--color-text-default)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          contrast: "var(--color-text-contrast)",
        },
        border: {
          default: "var(--color-border-default)",
          secondary: "var(--color-border-secondary)",
        },
      },
    },
  },
  plugins: [],
};
