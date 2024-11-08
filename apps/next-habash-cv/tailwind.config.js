const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { Theme } = require('./theme-vars');
var colors = require('colors');

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
      colors: {
        ...ExtendedColors,
      }
    },
  },
  plugins: [],
};
