import { twMerge } from "tailwind-merge";
import { ChatConvoProps, ChatMessage } from "./chat.interface";
import Moment from 'react-moment';
import { RateResponse } from "./RateResponse";
import { ReactNode, useContext, useEffect, useState } from "react";
import { ChatContext } from "./chat.context";
import ReactMarkdown from "react-markdown";
import { OptionBox } from "../ui/OptionBox";

export const ChatConvo = ({ setPrompt }: ChatConvoProps) => {
  const chatContext = useContext(ChatContext);
  const { messages } = chatContext?.messageClient!;
  const [threadId, setThreadId] = useState<string | null>(null);
  useEffect(() => {
    setThreadId(chatContext?.thread?.thread?.id || null);
  }, [chatContext]);

  if (!threadId) {
    return (
      <div className="flex items-center justify-center">
        <h4 className="text-center text-loading">Loading Thread...</h4>
      </div>
    );
  }
  return (
    <div className="chat-convo">
      {!messages.length && <NewConvoView setPrompt={setPrompt} />}
      {messages &&
        messages.map((msg, i) => (
          <div className="msg-wrapper" key={`${i}_${msg.id}`}>
            <MsgBubble msg={msg} />
          </div>
        ))}
    </div>
  );
};




/*
 
                                                                                           
                                                                                           
  /$$$$$$$   /$$$$$$  /$$  /$$  /$$        /$$$$$$$  /$$$$$$  /$$$$$$$  /$$    /$$ /$$$$$$ 
 | $$__  $$ /$$__  $$| $$ | $$ | $$       /$$_____/ /$$__  $$| $$__  $$|  $$  /$$//$$__  $$
 | $$  \ $$| $$$$$$$$| $$ | $$ | $$      | $$      | $$  \ $$| $$  \ $$ \  $$/$$/| $$  \ $$
 | $$  | $$| $$_____/| $$ | $$ | $$      | $$      | $$  | $$| $$  | $$  \  $$$/ | $$  | $$
 | $$  | $$|  $$$$$$$|  $$$$$/$$$$/      |  $$$$$$$|  $$$$$$/| $$  | $$   \  $/  |  $$$$$$/
 |__/  |__/ \_______/ \_____/\___/        \_______/ \______/ |__/  |__/    \_/    \______/ 
                                                                                           
                                                                                           
                                                                                           
 
*/
export const NewConvoView = ({ setPrompt }: { 
  setPrompt: (prompt:string) => void
}) => {
  const sameples = [
    'Tell me about yourself.',
    'Summarize you you professional experience.',
    'Are you open to relocation?',
    'What are your expectations?',
    'What are your long-term career goals?',
  ];
  return (
    <div className="mb-6">
      <h4 className="mb-6">
        Welcome. Get started by asking a question about me.
      </h4>
      {sameples.map((sample, i) => {
        return (
          <OptionBox key={i} onClick={() => setPrompt(sample)}>
            {sample}
          </OptionBox>
        );
      })}
    </div>
  );
};





/*
 
  /$$$$$$$            /$$       /$$       /$$          
 | $$__  $$          | $$      | $$      | $$          
 | $$  \ $$ /$$   /$$| $$$$$$$ | $$$$$$$ | $$  /$$$$$$ 
 | $$$$$$$ | $$  | $$| $$__  $$| $$__  $$| $$ /$$__  $$
 | $$__  $$| $$  | $$| $$  \ $$| $$  \ $$| $$| $$$$$$$$
 | $$  \ $$| $$  | $$| $$  | $$| $$  | $$| $$| $$_____/
 | $$$$$$$/|  $$$$$$/| $$$$$$$/| $$$$$$$/| $$|  $$$$$$$
 |_______/  \______/ |_______/ |_______/ |__/ \_______/
                                                       
                                                       
                                                       
 
*/
export const MsgBubble = ({ msg }: { msg: ChatMessage }) => {
  const botId = 'assistant';
  const render = () => {
  if (msg.content[0].type === 'text') {
      return <div dangerouslySetInnerHTML={{ __html: msg.content[0]?.text?.value }} />;
    } else {
      return '[not text]';
    }
  };
  return (
    <div
      className={twMerge(
        'flex user-bubble mb-5',
        msg.role.includes(botId)
          ? 'justify-start bot-bubble'
          : 'justify-end user-bubble'
      )}
    >
      <div className="flex items-start gap-2.5 group">
        <div className="flex justify-end flex-col gap-1 w-full max-w-[320px]_">
          <div
            className={twMerge(
              'flex space-x-2',
              msg.role.includes(botId) ? 'justify-start' : 'justify-end'
            )}
          >
            <span className="font-semibold text-xs text-gray-900 dark:text-white">
              {msg.displayName || msg.role}
            </span>
          </div>
          <div
            className={twMerge(
              'flex flex-col leading-1.5 p-1 px-4 border-gray-200 bg-gray-100 dark:bg-dark min-w-[4rem] max-w-[40rem] dark:border-gray-600',
              msg.error &&
                'dark:bg-red/25 bg-red/25 border-2 dark:border-red border-red',
              msg.role.includes(botId)
                ? 'rounded-ss-xl rounded-r-xl'
                : 'rounded-s-xl rounded-se-xl bg-blue dark:bg-blue'
            )}
          >
            <div
              className={twMerge(
                'wysiwyg font-normal text-gray-900 dark:text-white',
                msg.loading && 'text-loading'
              )}
            >
              <ReactMarkdown>
                {(msg as any).content[0]?.text?.value}
              </ReactMarkdown>
            </div>
          </div>
          <div className="level">
            <span className="level-left text-xs font-normal text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 ">
              <Moment format="MMM D, h:mm">
                {new Date(msg.created_at * 1000)}
              </Moment>
            </span>
            {!msg.role.includes(botId) && (
              <span className="level-right font-normal text-xs text-gray-500 dark:text-gray-400">
                {msg.status}
              </span>
            )}
          </div>
        </div>

        {/* rate response */}
        {msg.role.includes(botId) && <RateResponse />}
      </div>
    </div>
  );
};


    