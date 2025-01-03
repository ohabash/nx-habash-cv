import { twMerge } from "tailwind-merge";
import { ChatConvoProps, ChatMessage } from "./chat.interface";
import Moment from 'react-moment';
import { RateResponse } from "./RateResponse";

export const ChatConvo = ({ messages }: ChatConvoProps) => {
  return (
    <div className="chat-convo">
      {messages.map((msg, i) => (
        <div className="msg-wrapper" key={`${i}_${msg.id}`}>
          <MsgBubble msg={msg} />
        </div>
      ))}
    </div>
  );
};

export const MsgBubble = ({ msg }: { msg: ChatMessage }) => {
  const botId = 'Bot';
  return (
    <div
      className={twMerge(
        'flex user-bubble mb-5',
        msg.user.includes(botId)
          ? 'justify-start bot-bubble'
          : 'justify-end user-bubble'
      )}
    >
      <div className="flex items-start gap-2.5 group">
        {/* <div className="inline-flex items-center justify-center w-12 h-12 text-xl text-white bg-indigo-500 rounded-full">
          TW
        </div> */}
        <div className="flex justify-end flex-col gap-1 w-full max-w-[320px]">
          <div
            className={twMerge(
              'flex space-x-2',
              msg.user.includes(botId) ? 'justify-start' : 'justify-end'
            )}
          >
            {!msg.loading && <span className="font-semibold text-xs text-gray-900 dark:text-white">
              {msg.user}
            </span>}
          </div>
          <div
            className={twMerge(
              'flex flex-col leading-1.5 p-1 px-4 border-gray-200 bg-gray-100 dark:bg-dark min-w-[10rem] max-w-[40rem] dark:border-gray-600',
              msg.user.includes(botId)
                ? 'rounded-ss-xl rounded-r-xl'
                : 'rounded-s-xl rounded-se-xl bg-blue dark:bg-blue'
            )}
          >
            <p className={twMerge(
              "font-normal text-gray-900 dark:text-white",
              msg.loading && 'italic dark:text-lighten-5'
            )}>
              {msg.text}
            </p>
          </div>
          <div className="level">
            <span className="level-left text-xs font-normal text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 ">
              <Moment format="MMM D, h:mm">{msg.timestamp}</Moment>
            </span>
            {!msg.user.includes(botId) && (
              <span className="level-right font-normal text-xs text-gray-500 dark:text-gray-400">
                Delivered
              </span>
            )}
          </div>
        </div>

        {/* rate response */}
        {msg.user.includes(botId) && <RateResponse />}
      </div>
    </div>
  );
};
