import { use, useContext, useEffect } from "react";
import { ChatContext } from "./chat.context";
import { useChatThread } from "./thread.hook";
import Moment from "react-moment";
import { useMessages } from "./messages.hook";

interface Props {
  threadId: string;
}

export const ThreadThumb = ({threadId}: Props) => {
  const chatContext = useContext(ChatContext);
  
  // get / set thread
  const threadService = useChatThread({
    aid: chatContext?.assistant.assistant?.id as string,
    profileService: null,
    providedThreadId: threadId,
  });

  // get / set thread messages
  const messagesService = useMessages({
    profileService: null,
    threadId,
    includeSummary: true
  });

  // useEffect(() => {
  //   console.log(`🚀 => ThreadThumb => messagesService: summ`, messagesService);
  // }, [messagesService]);

  // console.log(`🚀 => ThreadThumb => threadService:`, threadId, threadService);
  
  return (
    <div 
      className="p-4 border-y-2 border-darker last:border-b-0 first:border-t-0"
    >
      <p className="italic leading-6">{messagesService.summary}</p>
      <Moment format="MMM D, h:mm" className="text-xs text-gray-500">
        {new Date((threadService.thread?.created_at as any) * 1000)}
      </Moment>
    </div>
  );
}

