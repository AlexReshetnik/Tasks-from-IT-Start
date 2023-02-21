/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: false,
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        icon_Bg: 'rgba(115, 103, 240, 0.08)',
        primary: '#4078BC',
        secondary: '#6f6b7d',
        lightBlue: '#e8eff7',
        statText: '#5d596c',
        color1:"#895BF1",
        color2:"#F3654A",
        color3:"#0A94FF",
        color4:"#DC60EF",
        color5:"#99B2C6",
      },
     
    }
  },
  plugins: [],
};
