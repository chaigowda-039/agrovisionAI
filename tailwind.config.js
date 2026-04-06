/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-variant": "#dfe3e0",
        "surface-container-high": "#e5e9e5",
        "on-secondary-fixed-variant": "#005313",
        "on-tertiary": "#ffffff",
        "surface-container": "#ebefeb",
        "on-secondary": "#ffffff",
        "surface-container-highest": "#dfe3e0",
        "secondary": "#006e1c",
        "on-tertiary-container": "#c7ffc5",
        "tertiary-container": "#387b41",
        "inverse-surface": "#2d312f",
        "on-error": "#ffffff",
        "on-primary-container": "#cbffc2",
        "tertiary-fixed-dim": "#90d792",
        "background": "#f6faf6",
        "surface-tint": "#1b6d24",
        "surface-container-low": "#f1f5f1",
        "on-secondary-container": "#00731e",
        "on-tertiary-fixed": "#002107",
        "on-primary-fixed-variant": "#005312",
        "surface": "#f6faf6",
        "on-tertiary-fixed-variant": "#07521d",
        "inverse-on-surface": "#eef2ee",
        "outline": "#707a6c",
        "surface-bright": "#f6faf6",
        "primary-fixed-dim": "#88d982",
        "error": "#ba1a1a",
        "primary-container": "#2e7d32",
        "on-surface": "#181d1a",
        "on-secondary-fixed": "#002204",
        "inverse-primary": "#88d982",
        "error-container": "#ffdad6",
        "tertiary-fixed": "#abf4ac",
        "outline-variant": "#bfcaba",
        "surface-container-lowest": "#ffffff",
        "secondary-container": "#91f78e",
        "tertiary": "#1d622b",
        "primary-fixed": "#a3f69c",
        "surface-dim": "#d7dbd7",
        "on-background": "#181d1a",
        "secondary-fixed": "#94f990",
        "secondary-fixed-dim": "#78dc77",
        "primary": "#0d631b",
        "on-surface-variant": "#40493d",
        "on-primary": "#ffffff",
        "on-error-container": "#93000a",
        "on-primary-fixed": "#002204"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
      boxShadow: {
         'ambient': '0 20px 40px rgba(24, 29, 26, 0.06)',
      },
      backdropBlur: {
        '24': '24px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
