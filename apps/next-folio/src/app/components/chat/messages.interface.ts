import { ChatMessage } from "./chat.interface";
import { Message } from "openai/resources/beta/threads/messages";
import { MessageCreateParams } from "openai/resources/beta/threads/messages";

export interface MessagesResp {
  messages: Message[];
  summary: string | null;
  setMessagesFn: (
    data: ChatMessage[],
    update: boolean,
    reverse?: boolean
  ) => Message[];
  createMessage: (
    params: CreateMessageParams
  ) => Promise<Message[]>;
  updateMessages: (
    threadId: string,
    debug: string,
    setMessages?: SetMessagesFn
  ) => Promise<Message[]>;
}


export type SetMessagesFn = (
  data: Message[] | ChatMessage[],
  update: boolean,
  reverse?: boolean
) => void;

export interface CreateMessageParams {
  threadId: string;
  body: MessageCreateParams;
}