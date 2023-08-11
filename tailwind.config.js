/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dyte-blue': '#2160fd',
      },
    },
  },
  plugins: [],
};
