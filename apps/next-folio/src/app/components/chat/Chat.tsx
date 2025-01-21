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
import { ProfileService } from '../profile/profile.service';
import { ChatConvo } from './ChatConvo';
import ChatInput from './ChatInput';
import { ChatSidebar } from './ChatSidebar';
import { ChatContext, ChatProvider } from './chat.context';
import './chat.scss';
import { useMessages } from './messages.hook';
import { CreateMessageParams } from './messages.interface';
import { useChatRun } from './runner.hook';

type Props = {
  children: ReactNode; // wrap you button or trigger
  className?: string;
}

export function ChatModal({ children, className }: Props) {
  const chatContext = useContext(ChatContext);
  const globalState = useGlobalContext();
  const [running, setRunning] = useState(false);
  const [profileService, setProfileService] = useState<ProfileService | null>(null);
  
  useEffect(() => {
    console.log(`🚀 => useEffect => global.uid (changed):`, globalState)
    const service = ProfileService.init( globalState.uid, () => {}, '<ChatModal/>' );
    setProfileService(service);
  }, [globalState.uid]);

  const runner = useChatRun();

  return (
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
                  <ChatConvo />
                </ModalContent>
                <ModalFooter className={`gap-4 ${running && 'disabled'}`}>
                  {running}
                  <ChatInput running={running} setRunning={setRunning} />
                </ModalFooter>
              </div>
            </div>
          </ModalBodyPortal>
        </Modal>
      </div>
    </ChatProvider>
  );
}
