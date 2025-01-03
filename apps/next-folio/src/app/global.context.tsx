'use client';
import { createContext, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { ProfileService } from "./components/profile/profile.service";
import { useSession } from "next-auth/react";
import { NXProfile } from "./components/profile/ProfileForm";
import { slugify2 } from "@nx-habash/utils";


// ===== || interface || ===== >
export type IGlobalContext = {
  navOpen: boolean;
  uid: string;
  setNavState: (value: SetStateAction<boolean>) => void,
  profile: NXProfile,
  setProfile: (value: SetStateAction<NXProfile>) => void
};

export const serverSideGlobalContext = {
  navOpen: true,
  uid: 'xxx',
  setNavState: (value: SetStateAction<boolean>) => {},
  profile: {} as NXProfile,
  setProfile: (value: SetStateAction<NXProfile>) => {}
}



// ===== || create context || ===== >
export const GlobalContext = createContext<IGlobalContext | undefined>(
  serverSideGlobalContext
);



// ===== || Provider component || ===== >
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // nav
  const [navOpen, setNavState] = useState(true);

  // profile
  const auth = useSession();
  const [profile, setProfile] = useState({} as NXProfile);
  const [uid, setUID] = useState('xxx' as string);
  useEffect(() => {
    if (auth.data?.user) {
      const uid = slugify2(auth.data.user.email as string);
      setUID(uid);
      ProfileService.init(uid, setProfile, '<GlobalProvider/>');
    }
  }, [auth]);

  // final data
  const data: IGlobalContext = { navOpen, setNavState, profile, setProfile, uid };

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