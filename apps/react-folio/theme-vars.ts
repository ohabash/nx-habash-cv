
export class Theme {
  colors = {
    red: '#cd5f5a',
    orange: '#f35528',
    blue: '#4493f8',
    subtle: '#3e3e3e',
    yellow: '#f1ad5e',
    green: '#00fff2',
    'glow-blue': '#0070ff70',
    // dark: '#111111',
    // darker: '#000000',
    darker: '#0f1019',
    dark: '#2e2e37',
    'dark-text': '1d1d1f',
  };
  vars = {
    accent1: this.colors.yellow,
    accent2: this.colors.orange,
    accent3: this.colors.blue,
    fg1: this.colors['dark-text'],
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

  backgrounds = {
    1: this.colors.darker,
    2: this.colors.dark,
  };

  fontSizes = {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1.0625rem', // 17px
    lg: ['1.1875rem', '1.21'], // 19px
    xl: '1.3125rem', // 21px
    '2xl': '1. 5rem', // 24px
    '3xl': ['4rem', '4.25rem'], // 64px
    '4xl': '5rem', // 80px
    '5xl': ['6rem', '1.05'], // 96px
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