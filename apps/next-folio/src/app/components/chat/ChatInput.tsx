import { useGlobalContext } from '@/global.context';
import { PlaceholdersAndVanishInput } from '@ui/placeholders-and-vanish-input';
import { Run } from 'openai/resources/beta/threads/runs/runs';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useCannedResponses } from './canned-responses.hook';
import { ChatContext } from './chat.context';
import { CreateMessageParams } from './messages.interface';
import { useChatRun } from './runner.hook';


type Props = {
  onSubmit?: (val: string, e: React.FormEvent<HTMLFormElement>) => void;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  val?: string;
};
const ChatInput = ({ running, setRunning, val }: Props) => {
  const globalState = useGlobalContext();
  const chatContext = useContext(ChatContext);
  const assistantId = globalState.profile.chatAssistantId;
  const runner = useChatRun();
  const [value, setVal] = React.useState(val||'');
  const cannedResponses = useCannedResponses();
  const [threadId, setThreadId] = useState<string | null>(null);
  useEffect(() => {
    setThreadId(chatContext?.thread?.thread?.id || null);
  }, [chatContext]);

  useEffect(() => {
    setVal(val || '');
  }, [val])

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
    onSubmit(value, e);
  };

  const onSubmit = async (val: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!threadId) {
      return cannedResponses.setRunError(null, { 
        code: 'No threadId', 
        message: 'There is no active thread. Please try refreshing. Contact me if the problem persists.' 
      });
    }
    setRunning(true);
    const payload: CreateMessageParams = {
      threadId: threadId as string,
      body: {
        content: val,
        role: 'user' as 'user' | 'assistant',
      },
    };

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
      {threadId && <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={valAndSubmit}
        running={running}
        val={value}
      />}
    </div>
  );
};

export default ChatInput
