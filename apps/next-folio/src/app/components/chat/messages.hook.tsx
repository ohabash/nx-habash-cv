import { useQuery } from '@tanstack/react-query';
import { Message } from 'openai/resources/beta/threads/messages';
import { useState } from 'react';
import { ProfileService } from '../profile/profile.service';
import { ChatMessage } from './chat.interface';
import * as actions from './message.actions';
import { MessagesResp, SetMessagesFn } from './messages.interface';


interface Props {
  profileService: ProfileService | null;
  threadId?: string | null;
  // aid: string;
  includeSummary?: boolean;
}

export const useMessages = ({ profileService, threadId, includeSummary: includeSummary = false }: Props) => {
  const [messages, setMessagesLocal] = useState([] as Message[]);
  // const [msgSummary, setSummary] = useState(null as string | null);

  const setMessagesFn = (
    data: ChatMessage[],
    append: boolean,
    reverse = true
  ): Message[] => {
    if (!data) data = [];
    // handle errors
    if ((data as any).error) {
      console.error('🚨setMessagesFn => Error in data', data);
      return [];
    }
    // add status "delivered" if is empty
    data.map((m) => {
      m.status = m.status || ('Delivered' as any);
      m.displayName = m.role === 'user' ? 'You' : 'Omar Habash (Bot)';
      return m;
    });

    // msgs
    const msgs = reverse ? data.reverse() : data;

    // final messages
    const final = append ? [...messages, ...msgs] : msgs;             

    // update ui
    setMessagesLocal((cur) => (append ? [...cur, ...msgs] : msgs));

    return final;
  };

  // query messages
  const { data: MessagesResp, isLoading: msgsLoading } = useQuery({
    queryFn: async () => {
      console.log(`🚀 => queryFn: => threadId:`, threadId)
      const debug = 'useMessages=>useQuery=>retrieveMessages';
      const resp = await actions.retrieveMessages(threadId as string, debug);
      return setMessagesFn(resp || [], false)
    },
    queryKey: ['messages', threadId],
    enabled: !!threadId,
  });

  // generate summary
  const { data: msgSummary, isLoading: summaryLoading } = useQuery({
    queryFn: () => {
      return actions.summarizeMessages(messages!).then(async (d) => {
        return (await d)?.choices?.[0]?.text || 'No summary available';
      });
    },
    
    queryKey: ['summary', threadId],
    enabled: !!messages.length && includeSummary,
  });
  
  return {
    messages,
    summary: msgSummary,
    setMessagesFn,
    createMessage: actions.createMessage,
    updateMessages,
  } as MessagesResp;
};

export const updateMessages = async (
  threadId: string,
  debug: string,
  setMessages?: SetMessagesFn
): Promise<Message[]> => {
  return actions.retrieveMessages(threadId, debug).then((data) => {
    if (setMessages) setMessages(data, false);
    return data;
  });
};