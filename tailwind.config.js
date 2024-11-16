/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // Esto es necesario para que Flowbite funcione con Tailwind.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
