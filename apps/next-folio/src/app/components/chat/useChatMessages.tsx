import { CreateMessageParams } from '@/api/message/create/route';
import { APIPromise } from 'openai/core';
import { Message } from 'openai/resources/beta/threads/messages';
import { Completion } from 'openai/resources/completions';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ProfileService } from '../profile/profile.service';
import { ChatMessage } from './chat.interface';
import { useQuery } from '@tanstack/react-query';

export interface MessagesResp {
  messages: Message[];
  summary: string | null;
  setMessagesFn: (
    data: ChatMessage[],
    update: boolean,
    reverse?: boolean
  ) => Promise<Message[]>;
  createMessage: (
    params: CreateMessageParams,
    setMessages: SetMessagesFn
  ) => Promise<Message[]>;
  updateMessages: (
    threadId: string,
    debug: string,
    setMessages?: SetMessagesFn,
  ) => Promise<Message[]>;
}

interface Props {
  profileService: ProfileService | null;
  threadId?: string | null;
  // aid: string;
  summary?: boolean;
}

type SetMessagesFn = (data: Message[] | ChatMessage[], update:boolean, reverse?: boolean) => void;

export const useMessages = ({ profileService, threadId, summary = false }: Props) => {
  summary == true; // TRYING THIS OUT
  const [messages, setMessagesLocal] = useState([] as Message[]);
  // const [msgSummary, setSummary] = useState(null as string | null);

  const setMessagesFn = async (
    data: ChatMessage[],
    update: boolean,
    reverse = true
  ): Promise<Message[]> => {
    // add status "delivered" if is empty
    data.map((m) => {
      m.status = m.status || ('Delivered' as any);
      m.displayName = m.role === 'user' ? 'You' : 'Omar Habash (Bot)';
      return m;
    });

    // msgs
    const msgs = reverse ? data.reverse() : data;

    // final messages
    const final = update ? [...messages, ...msgs] : msgs;             

    // update ui
    setMessagesLocal((cur) => {
      return update ? [...cur, ...msgs] : msgs;
    });

    return final;
  };

  const already = useRef(false);
  useEffect(() => {
    if (already.current || !threadId) return;
    console.log(`🚀 => useEffect =>message threadId:`,already.current, threadId);
    already.current = true;
    // updateMessages(threadId, 'useEffect 1111', setMessagesFn);
  }, [threadId]);

  const fetchSummary = async (): Promise<string> => {
    try {
      if (!threadId) return 'No thread id';
      const payload: Message[] = await updateMessages(
        threadId,
        'useEffect 1111'
      );
      const [mutatedMsgs, summaryResp] = await Promise.all([
        setMessagesFn(payload, false),
        summarizeMessages(payload),
      ]);
      console.log(
        `🚀 => fetchSummary => messages: summarizeMessages => messages:`,
        {
          payload,
          summary,
          msgSummary,
        }
      );
      const final = summaryResp?.choices?.[0]?.text || 'No summary available';
      console.log(`🚀 => useMessages => final:`, final);
      return final;
    } catch (error) {
      throw error;
    }
  };
  const { data: msgSummary, isLoading } = useQuery({
    queryFn: () => fetchSummary(),
    queryKey: ['summary', threadId],
  });

  return {
    messages,
    summary: msgSummary,
    setMessagesFn,
    createMessage,
    updateMessages,
  } as MessagesResp;
};

const updateMessages = (
  threadId: string,
  debug: string,
  setMessages?: SetMessagesFn
): Promise<Message[]> => {
  return retrieveMessages(threadId, debug).then((data) => {
    if (setMessages) setMessages(data, false);
    return data;
  });
};

const retrieveMessages = async (id: string, debug: string):Promise<Message[]> => {
  console.log(`🚀 [ACTION] => retrieveMessages => id:`,debug, id);
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

const summarizeMessages = async (messages: Message[]): Promise<APIPromise<Completion>> => {
  console.log(`🚀 [ACTION] => summarizeMessages => messages:`, messages);
  const url = new URL('/api/message/summary', window.location.origin);
  url.searchParams.append('messages', JSON.stringify(messages));

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
  const messages = await retrieveMessages(params.threadId, 'sdas');

  // update messages
  // await timeout(5000); // dev only
  await setMessages(messages, false);

  return messages;
};



 