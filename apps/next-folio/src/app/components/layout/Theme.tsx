'use client';
// import { ITheme, ThemerService } from '@nx-habash/services/react-lib';
import { createContext, ReactNode, useState } from 'react';
import { Theme } from '../../../../theme/theme-vars';
import { ITheme, ThemerService } from '@nx-habash/react-lib';

interface Props {
  children: ReactNode;
}

export interface IThemeContext {
  theme: ITheme;
}

export const ThemeContext = createContext({
  theme: new Theme(),
});

export const ThemeWrapper = ({ children }: Props) => {
  // skip theme on server
  const [isServer, setIsServer] = useState(true);
  // const isServer = typeof window === 'undefined';
  // console.log(`🚀 => Theme => isServer:`, isServer);

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
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};


