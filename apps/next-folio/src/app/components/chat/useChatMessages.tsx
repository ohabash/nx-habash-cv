import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { ProfileService } from '../profile/profile.service';
import { Message } from 'openai/resources/beta/threads/messages';

export interface MessagesResp {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

interface Props {
  profileService: ProfileService | null;
  threadId?: string | null;
  // aid: string;
}

export const useMessages = ({ profileService, threadId }: Props): MessagesResp => {
  const [messages, setMessages] = useState([] as Message[]);

  useEffect(() => {
    if (!threadId) return;
    retrieveMessages(threadId).then((data) => {
      setMessages(data);
      console.log(`🚀 => retrieveMessages => data:`, data);
    });
  }, [threadId]);

  return {
    messages,
    setMessages,
  };
};

const retrieveMessages = async (id: string) => {
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



 