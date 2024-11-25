


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // Esto es necesario para que Flowbite funcione con Tailwind.
  ],
  theme: {
    colors: {
      primary: "#0158a3",
      "primary-hover": "#064b86",
      "primary-focus": "#0b3f6f",
      "primary-bg": "#f0f7ff",
      secondary: "#00d8ab",
      white: "#fff",
      black: "#000b14",
      "dark-text": "#25272c",
      error: '#fc0606',
      success: '#3db500',
      "input-border": "#c7cbd1",
    },
    extend: {
      colors: {
        neutral: {
          50: '#eeeff2',
          100: '#e8e9ed',
          200: '#c7cbd1',
          300: '#b6bac3',
          400: '#8e95a2',
          500: '#6b7280',
          600: '#5b616e',
          700: '#4a4e5a',
          800: '#40444c',
          900: '#383a42',
          950: '#25272c',
        },
        success: {
          50: '#f2ffe4',
          100: '#e0ffc5',
          200: '#c2ff92',
          300: '#9aff53',
          400: '#74fb20',
          500: '#4bcc00',
          600: '#3db500',
          700: '#2f8902',
          800: '#286c08',
          900: '#245b0c',
          950: '#0e3300',
        },
        error: {
          50: '#fff0f0',
          100: '#ffdddd',
          200: '#ffc1c1',
          300: '#ff9595',
          400: '#ff5959',
          500: '#ff2626',
          600: '#fc0606',
          700: '#cc0000',
          800: '#af0505',
          900: '#900c0c',
          950: '#500000',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


