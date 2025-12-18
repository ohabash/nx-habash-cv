'use client';

import { createContext, ReactNode, use } from "react";
import { ITheme, ThemerService } from "../services/themer.service";
import { Theme } from "apps/next-habash-cv/theme-vars";

// export class Theme implements ITheme {
//   colors = {
//     red: '#cd5f5a',
//     green: '#18db93',
//     dark: '#1b1c1f',
//     darker: '#141517'
//   };
//   vars = {
//     accent1: this.colors.red,
//     omar: this.colors.red,
//   };
//   // Define a type that includes keys from both vars and colors
//   bg(key: keyof typeof this.vars | keyof typeof this.colors) {
//     const vals = { ...this.vars, ...this.colors };
//     return `bg-[${vals[key]}]`;
//   }
//   text(key: keyof typeof this.vars | keyof typeof this.colors) {
//     const vals = { ...this.vars, ...this.colors };
//     return `bg-[${vals[key]}]`;
//   }
//   sec = {
//     accent1: {
//       background: this.vars.accent1,
//       color: '#ffffff',
//     },
//     light: {
//       background: '#ffffff',
//       color: '#000000',
//     },
//     dark: {
//       background: this.vars.dark,
//       color: '#ffffff',
//     },
//     grey: {
//       background: '#f3f4f6',
//       color: '#000000',
//     },
//   };
// }

interface Props {
  children: ReactNode;
}

export interface IThemeContext {
  theme: ITheme;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: new Theme(),
});

export const ThemeWrapper = ({children}: Props) => {
    
    // skip theme on server
    const isServer = typeof window === 'undefined';
    // console.log(`🚀 => Theme => isServer:`, isServer)
  
    // theme instance
    const theme = new Theme();
  
    // set theme variables
    // create themer service instance
    const themerService: ThemerService = new ThemerService();

    // skip theme on server
    if (!isServer) {
      // choose element to bind theme
      const element = document.body;
      // bind theme
      themerService.bindThemeToTemplate(element, theme);
    }
  
    return (
      <ThemeContext.Provider value={{theme}}>
        {children}
      </ThemeContext.Provider>
    );
};

