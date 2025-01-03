'use client';
import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";
import { AssistantHookResp, useAssistant } from './useChatAssistant';
import { ThreadHookResp, useChatThread } from "./useChatThread";
import { ProfileService } from "../profile/profile.service";
import { MessagesResp, useMessages } from "./useChatMessages";


// ===== || interface || ===== >
export type IChatContext = {
  navOpen: boolean;
  setNavState: (value: SetStateAction<boolean>) => void;
  assistant: AssistantHookResp;
  thread: ThreadHookResp;
  messages: MessagesResp;
};

export const serverSideChatContext = {
  navOpen: true,
  setNavState: (value: SetStateAction<boolean>) => {}
}



// ===== || create context || ===== >
export const ChatContext = createContext<IChatContext | undefined>(
  serverSideChatContext as any
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

  // hard code assistant id (for now)
  const aid = 'asst_Cae6sgwNIYjDDqj2GPnah7QH';

  // get / set assistant
  const assistant = useAssistant({
    profileService,
    aid,
  });

  // get / set thread
  const thread = useChatThread({
    aid,
    profileService,
    threadId: profileService?.profile?.chatThreadId,
  });

  // get / set thread messages
  const messages = useMessages({
    profileService,
    threadId: profileService?.profile?.chatThreadId,
  });

  // final data
  const data: IChatContext = {
    navOpen,
    setNavState,
    assistant,
    thread,
    messages,
  };

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