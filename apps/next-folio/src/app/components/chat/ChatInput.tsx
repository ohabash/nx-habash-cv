import { useGlobalContext } from '@/global.context';
import { PlaceholdersAndVanishInput } from '@ui/placeholders-and-vanish-input';
import { Run } from 'openai/resources/beta/threads/runs/runs';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import { useCannedResponses } from './canned-responses.hook';
import { ChatContext } from './chat.context';
import { CreateMessageParams } from './messages.interface';
import { useChatRun } from './runner.hook';
import { timeout } from '@nx-habash/utils';

type Props = {
  onSubmit?: (val: string, e: React.FormEvent<HTMLFormElement>) => void;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};
const ChatInput = ({ running, setRunning }: Props) => {
  const globalState = useGlobalContext();
  const chatContext = useContext(ChatContext);
  const assistantId = globalState.profile.chatAssistantId;
  const runner = useChatRun();
  const threadId = globalState.profile.chatThreadId;
  const [val, setVal] = React.useState('');
  const cannedResponses = useCannedResponses();

  const placeholders = [
    'Where did you go to school?',
    'Do you know how to use React?',
    'What’s your experience with front-end deve`lopment?',
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
    console.log(`🚀 => onSubmit => payload:`, payload)

    const { createMessage, updateMessages, setMessagesFn, messages } =
      chatContext?.messageClient!;

    // optimistic update
    cannedResponses.optimisticUpdate(payload.body.content as string);

    // create msg and display
    const resp = await createMessage(payload);

    // show assistant loading msg (for later)
    cannedResponses.assistantLoading();


    // // keep checking until run is completed
    const completedRun: Run = await cannedResponses.runPollUpdate({
      threadId: threadId as string,
      params: {
        assistant_id: assistantId as string,
        stream: false,
      },
    });

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
