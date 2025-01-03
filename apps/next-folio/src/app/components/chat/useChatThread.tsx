import { Thread, ThreadCreateParams } from 'openai/resources/beta/threads/threads';
import { useEffect, useMemo, useState } from 'react';
import { ProfileService } from '../profile/profile.service';

interface Props {
  profileService: ProfileService | null;
  threadId?: string | null;
  aid: string;
}

export const useChatThread = ({ threadId, profileService, aid }: Props) => {
  const [thread, setThread] = useState<Thread | null>(null);
  
  // should be the only way to change thread
  function threadSetter(thread: Thread) {
    console.log(`🚀 => threadSetter => thread:`, thread);
    setThread(thread);
    if (profileService) {
      console.log(`🚀 => threadSetter => SAVING PROFILE:`, thread);
      profileService.saveProfile({ chatThreadId: thread.id, chatAssistantId: aid });
    }
  }

  useEffect(() => {
    console.log(
      `🚀 => useChatThread => profileService?.profile:`,
      profileService?.profile
    );
    if (!profileService?.profile) return;
    if (threadId) {
      retrieveThread(threadId).then((data) => threadSetter(data));
    }
    if (!threadId) {
      createThread({}).then((data) => threadSetter(data));
    }
  }, [threadId, profileService?.profile]);

  return {
    thread,
    threadSetter,
    deleteThread,
  };
};

const retrieveThread = async (id: string) => {
  console.log(`🚀 [ACTION] => retrieveThread => id:`, id)
  const url = new URL('/api/thread/get', window.location.origin);
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

const deleteThread = async (id: string) => {
  console.log(`🚀 [ACTION] => deleteThread => id:`, id);
  const url = new URL('/api/thread/delete', window.location.origin);
  url.searchParams.append('threadId', id);

  const res = await fetch(url.toString(), {
    method: 'GET', // Preferably use DELETE or POST for this
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data;
};

const createThread = async (data: ThreadCreateParams) => {
  console.log(`🚀 [ACTION] => createThread => data:`, data);
  const res = await fetch('/api/thread/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const thread = await res.json();
  return thread;
};
