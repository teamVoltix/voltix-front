


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
<<<<<<< HEAD
=======

>>>>>>> origin/develop
    "./node_modules/flowbite/**/*.js", // Esto es necesario para que Flowbite funcione con Tailwind.
  ],
  theme: {
    colors: {
      primary: "#0158a3",
      "primary-hover": "#064b86",
      "primary-focus": "#0b3f6f",
      secondary: "#00d8ab",
      white: "#fff",
      black: "#000b14",
      "dark-text": "#25272c",
      error: '#fc0606',
      success: '#3db500',
      "input-border": "#c7cbd1",
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


