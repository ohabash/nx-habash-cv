import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { PlaceholdersAndVanishInput } from '@ui/placeholders-and-vanish-input';
import { threadId } from 'worker_threads';
import { CreateMessageParams } from './messages.interface';
import { useGlobalContext } from '@/global.context';
import { ChatContext } from './chat.context';

type Props = {
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (val: string, e: React.FormEvent<HTMLFormElement>) => void;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};
const ChatInput = ({ running, setRunning }: Props) => {
  const globalState = useGlobalContext();
  const chatContext = useContext(ChatContext);
  const threadId = globalState.profile.chatThreadId;
  const [val, setVal] = React.useState('');

  const placeholders = [
    'Where did you go to school?',
    'Do you know how to use React?',
    'What’s your experience with front-end development?',
    'What’s your experience with back-end development?',
    'How do you handle tight deadlines?',
    'Write a Javascript method to reverse a string',
    'Tell me about yourself?',
    'What’s your experience with REST APIs?',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setVal(newVal);
  };

  const valAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(val, e);
  };

  const onSubmit = async (val: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRunning(true);
    const payload: CreateMessageParams = {
      threadId: threadId as string,
      body: {
        content: val,
        role: 'user' as 'user' | 'assistant',
      },
    };

    const { createMessage, updateMessages, setMessagesFn, messages } =
      chatContext?.messageData!;

    // optimistic update
    setMessagesFn(
      [
        {
          role: 'user',
          loading: true,
          status: 'sending',
          content: [
            {
              text: {
                value: payload.body.content as string,
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

    // show assistant loading msg (for later)
    setMessagesFn(
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
    // const resp = await createMessage(payload);

    // // update ui
    // await setMessagesFn(messages, false);

    // // run (request a response)
    // let runResp = await runner.run({
    //   threadId: threadId as string,
    //   params: {
    //     assistant_id: assistantId as string,
    //     stream: false,
    //   },
    // });

    // // display loading msg
    // displayLoadingMsg();
    // console.log(`🚀 => onSubmit => runResp:`, runResp);

    // // keep checking until run is completed
    // while (runResp.status !== 'completed') {
    //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    //   runResp = await runner.retrieveRun(threadId as string, runResp.id);
    //   await timeout(500);
    //   console.log(`🚀 => polling onSubmit => runResp:`, runResp);
    // }

    // // update messages
    // await updateMessages(threadId as string, 'onSubmit', setMessagesFn);

    // allow next chat
    setRunning(false);
  };
  return (
    <div className="relative">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={valAndSubmit}
        running={running}
      />
    </div>
  );
};

export default ChatInput
