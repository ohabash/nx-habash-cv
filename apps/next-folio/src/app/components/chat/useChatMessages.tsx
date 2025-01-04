import { Dispatch, SetStateAction, use, useEffect, useMemo, useState } from 'react'
import { ProfileService } from '../profile/profile.service';
import { Message, Messages } from 'openai/resources/beta/threads/messages';
import { CreateMessageParams } from '@/api/message/create/route';
import { timeout } from '@nx-habash/utils';
import { ChatMessage } from './chat.interface';

// export interface MessagesResp {
//   messages: Message[];
//   setMessages: Dispatch<SetStateAction<Message[]>>;
//   updateMessages: (
//     threadId: string, 
//     setMessages?: Dispatch<SetStateAction<Message[]>>
//   ) => Promise<Message[]>;
//   createMessage: (
//     params: CreateMessageParams,
//     setMessages: Dispatch<SetStateAction<Message[]>>
//   ) => Promise<Message>;
// }

interface Props {
  profileService: ProfileService | null;
  threadId?: string | null;
  // aid: string;
}

type SetMessagesFn = (data: Message[] | ChatMessage[], update:boolean, reverse?: boolean) => void;

export const useMessages = ({ profileService, threadId }: Props) => {
  const [messages, setMessagesLocal] = useState([] as Message[]);
  
  const setMessagesFn = (data: (ChatMessage)[], update:boolean, reverse = true) => {
    // add status "delivered" if is empty
    data.map((m) => {
      m.status = m.status || ('Delivered' as any);
      m.displayName = m.role === 'user' ? 'You' : 'Omar Habash (Bot)';
      return m;
    });
    // msgs
    const msgs = reverse ? data.reverse() : data;
    // update ui
    return setMessagesLocal(cur => {
      return update ? [...cur, ...msgs] : msgs;
    });
  };

  useEffect(() => {
    console.log(`🚀 => useEffect =>message threadId:`, threadId)
    if (!threadId) return;
    updateMessages(threadId, setMessagesFn);
  }, [threadId]);

  useEffect(() => {
    console.log(`🚀 => useMessages => messages:`, messages)
  }, [messages]);

  return {
    messages,
    setMessagesFn,
    createMessage,
    updateMessages,
  };
};

const updateMessages = (
  threadId: string,
  setMessages?: SetMessagesFn
): Promise<Message[]> => {
  return retrieveMessages(threadId).then((data) => {
    if (setMessages) setMessages(data, false);
    return data;
  });
};

const retrieveMessages = async (id: string):Promise<Message[]> => {
  console.log(`🚀 [ACTION] => retrieveThread => id:`, id);
  const url = new URL('/api/message/list', window.location.origin);
  url.searchParams.append('threadId', id);

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data;
};

const createMessage = async (
  params: CreateMessageParams,
  setMessages: SetMessagesFn,
  // displayLoadingMsg: () => void
): Promise<Message[]> => {
  console.log(`🚀 [ACTION] => createMessage => params:`, params);

  // optimistic update
  setMessages(
    [
      {
        role: 'user',
        loading: true,
        status: 'sending',
        content: [
          {
            text: {
              value: params.body.content as string,
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
  // await timeout(1500);
  // displayLoadingMsg();

  // create message
  const newMsg = await fetch('/api/message/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());

  // get messages
  const messages = await retrieveMessages(params.threadId);

  // update messages
  // await timeout(5000); // dev only
  await setMessages(messages, false);

  return messages;
};



 