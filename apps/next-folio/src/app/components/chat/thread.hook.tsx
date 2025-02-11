import { Thread } from 'openai/resources/beta/threads/threads';
import { useEffect, useState } from 'react';
import { ProfileService } from '../profile/profile.service';
import { createThread, deleteThread, retrieveThread } from './thread.actions';
import { useQuery } from '@tanstack/react-query';

export interface ThreadHookResp {
  thread: Thread | null;
  threadId: string | null;
  threadSetter: (thread: Thread) => void;
  deleteThread: (id: string) => Promise<any>;
}

interface Props {
  profileService: ProfileService | null;
  providedThreadId?: string | null;
  aid: string;
}

export const useChatThread = ({ providedThreadId, profileService, aid }: Props): ThreadHookResp => {
  const [thread, setThread] = useState<Thread | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const threadSetter = async (thread: Thread, isNewThread = false) => {
    // set
    setThread(thread);

    // update thread id
    setThreadId(thread.id);

    // update profile with thread id
    updateProfile(thread, profileService, aid);
  };

  // fetch current thread id
  const { isLoading: isFetching } = useQuery({
    queryFn: async () => {
      const debug = 'useChatThread=>useQuery=>retrieveMessages';
      console.log(`🚀 => queryFn: => FETCH THREAD:`, threadId)
      const thread = await retrieveThread(threadId as string);
      threadSetter(thread);
      return thread;
    },
    queryKey: ['thread', threadId],
    enabled: !!threadId,
  });

  useEffect(() => {
    // so we dont create a thread for no reason
    if (!profileService?.profile) return;

    // if no thread id, create a new thread
    if (!providedThreadId) {
      createThread({}).then((data) => threadSetter(data, true));
    } else {
      setThreadId(providedThreadId);
    }
  }, [providedThreadId, profileService?.profile]);

  return {
    thread,
    threadSetter,
    deleteThread,
    threadId: threadId as any,
  };
};

// should be the only way to change thread
const updateProfile = async (thread: Thread, profileService: ProfileService|null, aid: string) => {
  if (profileService) {
    return await profileService.saveProfile({
      chatThreadId: thread.id,
      chatAssistantId: aid,
    });
  }
};