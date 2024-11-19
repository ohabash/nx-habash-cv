const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { Theme } = require('./theme-vars');
// var colors = require('colors');
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const theme = new Theme();
const vars = {...theme.colors, ...theme.vars};
const entries = Object.entries(vars)
const ExtendedColors = {}
entries.forEach(([key, value]) => ExtendedColors[key] = value);

console.log('')
console.log(`=> Tailwind Theme Values <=`.inverse)
console.table(ExtendedColors)
console.log('')

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  mode: 'jit',
  important: true,
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontSize: {
        ...theme.fontSizes
      },
      colors: {
        ...ExtendedColors,
      },
      backgroundColor: {
        ...theme.backgrounds
      },
      animation: {
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
    keyframes: {
      "carousel-move": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },
    animation: {
      "carousel-move": "carousel-move var(--duration,80s) infinite",
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}