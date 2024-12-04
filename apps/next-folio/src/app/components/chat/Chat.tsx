import {
  Modal,
  ModalBodyPortal,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from '@ui/modal';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ChatInput from './ChatInput';
import './chat.scss';
import { ChatConvo } from './ChatConvo';
import { sampleMessages } from './chat.interface';
import { timeout } from '@nx-habash/react-lib';
import { ChatSidebar } from './ChatSidebar';
import { ChatProvider } from './chat.context';

type Props = {
  children: ReactNode; // wrap you button or trigger
  className?: string;
}

export function ChatModal({ children, className }: Props) {
  const [messages, setMessages] = useState(sampleMessages);
  const [revealed, setReveal] = useState(false);
  const randomId = Math.random().toString(36).substring(7);
  const onSubmit = async (val: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`🚀 => onSubmit => submitted:`, val);
    const userMsg = {
      id: `${randomId}`,
      user: 'Bob',
      text: val,
      timestamp: new Date().toISOString(),
    };
    const BotLoadingMsg = {
      id: `${randomId}`,
      user: `Omar Habash (Bot)`,
      text: `Generating response...`,
      timestamp: new Date().toISOString(),
      loading: true,
    };
    setMessages([...messages, userMsg]);
    await timeout(1000);
    setMessages([...messages, userMsg, BotLoadingMsg]);
  };
  return (
    <ChatProvider> 
      <div
        className={twMerge(
          'CHAT flex items-center justify-center z-30',
          className
        )}
      >
        <Modal>
          <ModalTrigger>{children}</ModalTrigger>
          <ModalBodyPortal className={`md:max-w-[60%] mt-[1rem]`}>
            <div className="columns is-gapless">
              <div className="column-2 bg-dark/85">
                <ChatSidebar/>
              </div>
              <div className="column relative bg-darker/95 ">
                <ModalContent className="flex-col-reverse ">
                  <ChatConvo messages={messages} />
                </ModalContent>
                <ModalFooter className="gap-4">
                  <ChatInput onSubmit={onSubmit} />
                </ModalFooter>
              </div>
            </div>
          </ModalBodyPortal>
        </Modal>
      </div>
    </ChatProvider>
  );
}
