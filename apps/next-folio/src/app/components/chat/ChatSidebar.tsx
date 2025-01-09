import { useContext } from 'react';
import { ChatContext } from './chat.context';
import { ThreadThumb } from './ThreadThumb';

export const ChatSidebar = () => {
  const chatContext = useContext(ChatContext);
  return (
    <div className=" max-w-[20%]_">
      <h5>Coming Soon</h5>
      {/* <ThreadThumb threadId={chatContext?.thread.thread?.id as string} /> */}
      {/* <ThreadThumb threadId={chatContext?.thread.thread?.id as string} /> */}
    </div>
  );
}

