'use client';
import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";
import { useAssistant } from './useChatAssistant';
import { useChatThread } from "./useChatThread";
import { ProfileService } from "../profile/profile.service";


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
export const ChatProvider = ({
  children,
  profileService,
}: {
  children: ReactNode;
  profileService: ProfileService | null;
}) => {
  // stuff
  const [navOpen, setNavState] = useState(true);

  // get / set assistant
  const assistant = useAssistant({ 
    profileService,
    aid: 'asst_Cae6sgwNIYjDDqj2GPnah7QH' 
  });

  // get / set thread
  const thread = useChatThread({ 
    aid: 'asst_Cae6sgwNIYjDDqj2GPnah7QH',
    profileService,
    threadId: profileService?.profile?.threadId
  });

  // final data
  const data: IChatContext = { navOpen, setNavState };

  // return wrapper markup
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
};

// ===== || consumer usecontext || ===== >
export const useChatContext = () => {
  const chat =  useContext(ChatContext);
  if (!chat) {
    throw new Error('useChatContext() must be used within a <ChatProvider>');
  }
  return chat;
};