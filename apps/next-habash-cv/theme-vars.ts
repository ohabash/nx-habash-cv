import { ITheme } from "./src/app/services/themer.service";

export class Theme implements ITheme {
  colors = {
    red: '#cd5f5a',
    orange: '#f35528',
    dark: '#1b1c1f',
    blue: '#4493f8',
    darker: '#141517',
    subtle: '#3e3e3e',
    yellow: '#efa659',
    green: '#00fff2',
    'glow-blue': '#0070ff70',
  };
  vars = {
    accent1: this.colors.orange,
    accent2: this.colors.blue,
    accent3: this.colors.yellow,
    fg: '#ffffff',
    'darken-1': 'rgba(0,0,0,0.1)',
    'darken-2': 'rgba(0,0,0,0.2)',
    'darken-3': 'rgba(0,0,0,0.3)',
    'darken-4': 'rgba(0,0,0,0.4)',
    'darken-5': 'rgba(0,0,0,0.5)',
    'darken-6': 'rgba(0,0,0,0.6)',
    'darken-7': 'rgba(0,0,0,0.7)',
    'darken-8': 'rgba(0,0,0,0.8)',
    'darken-9': 'rgba(0,0,0,0.9)',
    'lighten-25': 'rgba(255,255,255,0.035)',
    'lighten-1': 'rgba(255,255,255,0.17)',
    'lighten-2': 'rgba(255,255,255,0.2)',
    'lighten-3': 'rgba(255,255,255,0.38)',
    'lighten-4': 'rgba(255,255,255,0.48)',
    'lighten-5': 'rgba(255,255,255,0.58)',
    'lighten-6': 'rgba(255,255,255,0.6)',
    'lighten-7': 'rgba(255,255,255,0.7)',
    'lighten-8': 'rgba(255,255,255,0.8)',
    'lighten-9': 'rgba(255,255,255,0.9)',
  };
  // Define a type that includes keys from both vars and colors
  bg(key: keyof typeof this.vars | keyof typeof this.colors) {
    const vals = { ...this.vars, ...this.colors };
    return `bg-[${vals[key]}]`;
  }
  text(key: keyof typeof this.vars | keyof typeof this.colors) {
    const vals = { ...this.vars, ...this.colors };
    return `bg-[${vals[key]}]`;
  }
  sec = {
    accent1: {
      background: this.vars.accent1,
      color: '#ffffff',
    },
    light: {
      background: '#ffffff',
      color: '#000000',
    },
    dark: {
      background: this.colors.dark,
      color: '#ffffff',
    },
    grey: {
      background: '#f3f4f6',
      color: '#000000',
    },
  };
}