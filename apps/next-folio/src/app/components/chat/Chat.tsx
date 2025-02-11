import { useGlobalContext } from '@/global.context';
import {
  Modal,
  ModalBodyPortal,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from '@ui/modal';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../button/Button';
import { ProfileService } from '../profile/profile.service';
import { ChatConvo } from './ChatConvo';
import { ChatContext, ChatProvider } from './chat.context';
import { useChatRun } from './runner.hook';
import ChatInput from './ChatInput';
import './chat.scss';
import Link from 'next/link';

type Props = {
  children: ReactNode; // wrap you button or trigger
  className?: string;
}

export function ChatModal({ children, className }: Props) {
  const chatContext = useContext(ChatContext);
  const globalState = useGlobalContext();
  const [running, setRunning] = useState(false);
  const [profileService, setProfileService] = useState<ProfileService | null>(null);
  const [prompt, setPrompt] = useState('');
  
  useEffect(() => {
    if (!globalState.uid) return;
    const service = ProfileService.init( globalState.uid, () => {}, '<ChatModal/>' );
    setProfileService(service);
  }, [globalState.uid]);

  const runner = useChatRun();
  if (!globalState.uid) {
    return (
      <>
        <div className="max-w-screen w-[600px]">
          <Link
            href={'/auth/login'}
            className="relative z-20 text-center level mb-0 bg-darkBlue/90 p-4 rounded-md border-[1px] border-blue/70 cursor-pointer hover:border-blue"
          >
            <div className="level-left max-w-[80%]">
              <p className="text-white text-left">
                To ensure a secure and personalized experience, this bot has
                been trained with sensitive data. Please sign in to access the
                "Interview Me" feature.
              </p>
            </div>
            <div className="level-right">
              <Button className="inline-block">Sign In</Button>
            </div>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <ChatProvider profileService={profileService}>
        <div
          className={twMerge(
            'CHAT flex items-center justify-center z-30',
            className
          )}
        >
          <Modal>
            <ModalTrigger>{children}</ModalTrigger>
            <ModalBodyPortal className={`md:max-w-[50%] mt-[1rem]`}>
              <div className="columns is-gapless">
                {/* <div className="column is-4 bg-dark/85">
                  <ChatSidebar />
                </div> */}
                <div className="column relative bg-darker/95 ">
                  <ModalContent className="flex-col-reverse ">
                    <ChatConvo setPrompt={setPrompt} />
                  </ModalContent>
                  <ModalFooter className={`gap-4 ${running && 'disabled'}`}>
                    <ChatInput val={prompt} running={running} setRunning={setRunning} />
                  </ModalFooter>
                </div>
              </div>
            </ModalBodyPortal>
          </Modal>
        </div>
      </ChatProvider>
    </>
  );
}
