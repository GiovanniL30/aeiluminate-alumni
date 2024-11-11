/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_blue: "#4880FF",
        light_blue: "#EFF4FA",
        text_color: "#0A0A0A",
        light_text: "#757575",
        drop_blue: "#8F9BB3",
      },
    },
  },
  plugins: [],
};
