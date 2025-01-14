'use client';
import { Message } from "openai/resources/beta/threads/messages";
import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { ProfileService } from "../profile/profile.service";
import { useMessages } from "./messages.hook";
import { AssistantHookResp, useAssistant } from './assistant.hook';
import { ThreadHookResp, useChatThread } from "./thread.hook";
import { MessagesResp } from "./messages.interface";


// ===== || interface || ===== >
export type IChatContext = {
  navOpen: boolean;
  setNavState: (value: SetStateAction<boolean>) => void;
  assistant: AssistantHookResp;
  thread: ThreadHookResp;
  messageClient: MessagesResp;
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
  const messageClient = useMessages({
    profileService,
    threadId: profileService?.profile?.chatThreadId,
    includeSummary: false,
  });

  // final data
  const data: IChatContext = {
    navOpen,
    setNavState,
    assistant,
    thread,
    messageClient,
  };

  // DEV ONLY
  useEffect(() => {
    console.log(`🚀 => B4ChatConvo => messages:`, messageClient.messages);
  }, [messageClient.messages]);

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