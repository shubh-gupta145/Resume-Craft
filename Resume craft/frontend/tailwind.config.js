/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: true,
  },
  future: {
    // 🚫 Disable OKLCH color output (forces hex/rgb fallback)
    disableColorFunction: true,
  },
};

