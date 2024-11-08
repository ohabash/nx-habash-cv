'use client';
import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";


// ===== || interface || ===== >
export type IGlobalContext = {
  navOpen: boolean;
  setNavState: (value: SetStateAction<boolean>) => void
};

export const serverSideGlobalContext = {
  navOpen: true,
  setNavState: (value: SetStateAction<boolean>) => {}
}



// ===== || create context || ===== >
export const GlobalContext = createContext<IGlobalContext | undefined>(
  serverSideGlobalContext
);



// ===== || Provider component || ===== >
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // stuff
  const [navOpen, setNavState] = useState(true);

  // final data
  const data: IGlobalContext = { navOpen, setNavState };

  // return wrapper markup
  return (
      <GlobalContext.Provider value={data}>
        {children}
      </GlobalContext.Provider>
    );
};

// ===== || consumer usecontext || ===== >
export const useGlobalContext = () => {
  const global =  useContext(GlobalContext);
  if (!global) {
    throw new Error('useGlobalContext() must be used within a <GlobalProvider>');
  }
  return global;
};