import { useGlobalContext } from '@/global.context';
import {
  Modal,
  ModalBodyPortal,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from '@ui/modal';
import { ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ProfileService } from '../profile/profile.service';
import { ChatConvo } from './ChatConvo';
import ChatInput from './ChatInput';
import { ChatSidebar } from './ChatSidebar';
import { ChatProvider } from './chat.context';
import './chat.scss';
import { useMessages } from './useChatMessages';
import { useChatRun } from './useChatRun';
import { RunCreateParamsBase } from 'openai/resources/beta/threads/runs/runs';
import { timeout } from '@nx-habash/utils';

type Props = {
  children: ReactNode; // wrap you button or trigger
  className?: string;
}

export function ChatModal({ children, className }: Props) {
  const globalState = useGlobalContext();  
  const [running, setRunning] = useState(false);
  const [profileService, setProfileService] = useState<ProfileService | null>(null);
  const threadId = globalState.profile.chatThreadId;
  const assistantId = globalState.profile.chatAssistantId;
  const { createMessage, updateMessages, setMessagesFn, messages } = useMessages({
    profileService,
    threadId,
  });
  
  useEffect(() => {
    console.log(`🚀 => useEffect => global.uid (changed):`, globalState)
    const service = ProfileService.init( globalState.uid, () => {}, '<ChatModal/>' );
    setProfileService(service);
  }, [globalState.uid]);

  const runner = useChatRun();

  const onSubmit = async (val: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRunning(true);
    const payload = {
      threadId: threadId as string,
      body: {
        content: val,
        role: 'user' as 'user' | 'assistant',
      },
    };

    // show assistant loading msg (for later)
    const displayLoadingMsg = () => setMessagesFn(
      [
        {
          role: 'assistant',
          loading: true,
          status: 'sending',
          content: [
            {
              text: {
                value: 'Let me think about that...',
                annotations: [],
              },
              type: 'text',
            },
          ],
          id: 'temp-id',
          created_at: new Date().valueOf(),
        } as any,
      ],
      true,
      false
    );

    // create msg and display
    const resp = await createMessage(payload, setMessagesFn);

    // run (request a response)
    let runResp = await runner.run({
      threadId: threadId as string,
      params: {
        assistant_id: assistantId as string,
        stream: false,
      },
    });

    // display loading msg
    displayLoadingMsg();
    console.log(`🚀 => onSubmit => runResp:`, runResp);

    // keep checking until run is completed
    while (runResp.status !== "completed") {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      runResp = await runner.retrieveRun(threadId as string, runResp.id);
      await timeout(500);
      console.log(`🚀 => polling onSubmit => runResp:`, runResp)
    }

    // update messages
    await updateMessages(threadId as string, 'onSubmit', setMessagesFn);

    // allow next chat
    setRunning(false);
  };

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
          <ModalBodyPortal className={`md:max-w-[75%] mt-[1rem]`}>
            <div className="columns is-gapless">
              <div className="column is-4 bg-dark/85">
                <ChatSidebar />
              </div>
              <div className="column relative bg-darker/95 ">
                <ModalContent className="flex-col-reverse ">
                  <ChatConvo messages={messages} />
                </ModalContent>
                <ModalFooter className={`gap-4 ${running && 'disabled'}`}>
                  {running}
                  <ChatInput running={running} onSubmit={onSubmit} />
                </ModalFooter>
              </div>
            </div>
          </ModalBodyPortal>
        </Modal>
      </div>
    </ChatProvider>
  );
}
