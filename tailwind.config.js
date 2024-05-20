/** @type {import('tailwindcss').Config} */

const colors = require('./src/presentation/style/palette/colors.json');
const plugin = require('tailwindcss/plugin');

export default {
  content: ['./index.html', './src/**/*.tsx'],
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('scrollbar', '&::-webkit-scrollbar');
    }),
    plugin(({ addBase }) => {
      addBase({
        '*': {
          scrollbarColor: '#444444 transparent',
          scrollbarWidth: 'thin'
        },
        '*::-webkit-scrollbar': {
          height: '6px',
          width: '6px'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#444444',
          borderRadius: '10px'
        },
        '*::-webkit-scrollbar-track-piece': {
          backgroundColor: 'transparent',
          borderRadius: '10px'
        }
      });
    })
  ],
  theme: {
    colors,
    extend: {
      boxShadow: {
        base: '0px 0px 7px 2px rgba(0,0,0,0.2)'
      }
    },
    screens: {
      desktop: '1281px',
      laptop: '1024px',
      tablet: '768px'
    }
  }
};
