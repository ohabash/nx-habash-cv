import { useEffect, useMemo, useState } from 'react'
import { ProfileService } from '../profile/profile.service';

interface Props {
  aid: string;
  profileService: ProfileService | null;
}

export const useAssistant = ({aid, profileService}: Props) => {
  const [assistant, setAssistant] = useState(true);
  useMemo(() => {
    fetch(`/api/assistant/get?assistantId=${aid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`🚀 => fetchAssistant => data:`, aid, data);
        setAssistant(data);
      });
  }, [aid]);

  return {
    assistant,
    setAssistant,
    deleteAssistant,
  };
}

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


 