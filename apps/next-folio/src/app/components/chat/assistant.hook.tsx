import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { ProfileService } from '../profile/profile.service';
import { Assistant } from 'openai/resources/beta/assistants';
import { useQuery } from '@tanstack/react-query';

export interface AssistantHookResp {
  assistant: Assistant | null;
  // setAssistant: Dispatch<SetStateAction<Assistant | null>>;
  deleteAssistant: (id: string) => Promise<any>;
}

interface Props {
  aid: string;
  profileService: ProfileService | null;
}

export const useAssistant = ({aid, profileService}: Props): AssistantHookResp => {
  // const [assistant, setAssistant] = useState(null as Assistant | null);
  const {data: assistant, isLoading, } = useQuery({
    queryFn: () => fetchAssistant(aid),
    queryKey: ['assistant', aid],
  })
  // useMemo(() => {
    // fetchAssistant(aid).then((d) => setAssistant(d));
  // }, [aid]);

  useEffect(() => {
    console.log(`🚀 => useAssistant => assistant:`, assistant);
  }, [assistant]);

  return {
    assistant,
    // setAssistant,
    deleteAssistant,
  };
}

const fetchAssistant = async (id: string) => {
  console.log(`🚀 [ACTION] => fetchAssistant => id:`, id);
  const url = new URL('/api/assistant/get', window?.location.origin || process.env.HOST);
  url.searchParams.append('assistantId', id);

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  console.log(`🚀 => fetchAssistant => res.json():`, data);
  return data;
};

const deleteAssistant = async (id: string) => {
  const url = new URL('/api/assistant/delete', window.location.origin);
  url.searchParams.append('assistantId', id);

  const res = await fetch(url.toString(), {
    method: 'GET', // Preferably use DELETE or POST for this
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  console.log(`🚀 => deleteAssistant => res.json():`, data);
  return data;
};


 