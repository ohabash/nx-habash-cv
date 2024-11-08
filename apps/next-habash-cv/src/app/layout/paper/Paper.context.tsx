'use client';
import React, { createContext, useState, ReactNode, useContext, use } from 'react';

// interface PaperContextType {
//   isFocused: boolean;
//   setIsFocused: (isFocused: boolean) => void;
// }

interface Props {
  children: ReactNode;
}

export interface IPaperContext {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaperContext = createContext<IPaperContext>({
  isFocused: false,
  setIsFocused: ((isFocused: boolean) => {} ) as any,
});

export const PaperProvider= ({ children }:Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <PaperContext.Provider value={{ isFocused, setIsFocused }}>
      {children}
    </PaperContext.Provider>
  );
};

export function usePaperContext() {
  return React.useContext(PaperContext);
}
