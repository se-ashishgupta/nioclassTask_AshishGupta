/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        vectorAnimation: {
          to: {
            transform: `translateY(-10px)`,
          },
        },
      },

      animation: {
        vectorAnimation: `vectorAnimation 1s infinite ease-in-out alternate`,
      },
    },
  },
  plugins: [],
};
