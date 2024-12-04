'use client';
import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";


// ===== || interface || ===== >
export type IChatContext = {
  navOpen: boolean;
  setNavState: (value: SetStateAction<boolean>) => void
};

export const serverSideChatContext = {
  navOpen: true,
  setNavState: (value: SetStateAction<boolean>) => {}
}



// ===== || create context || ===== >
export const ChatContext = createContext<IChatContext | undefined>(
  serverSideChatContext
);



// ===== || Provider component || ===== >
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  // stuff
  const [navOpen, setNavState] = useState(true);

  // final data
  const data: IChatContext = { navOpen, setNavState };

  // return wrapper markup
  return (
      <ChatContext.Provider value={data}>
        {children}
      </ChatContext.Provider>
    );
};

// ===== || consumer usecontext || ===== >
export const useChatContext = () => {
  const chat =  useContext(ChatContext);
  if (!chat) {
    throw new Error('useChatContext() must be used within a <ChatProvider>');
  }
  return chat;
};