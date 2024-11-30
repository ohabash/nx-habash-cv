// import { MetAccount } from '@nx-habash/interfaces';

import { ChatCompletionAssistantMessageParam, ChatCompletionUserMessageParam } from "openai/resources";

export interface ApiOpenaiConfig {
  // account: MetAccount;
  sendStatus: (status: string) => any;
  sendError: (err: string) => any;
  devMode: boolean;
  // conversations: OpenAiConversations;
  [k: string]: any; // replace this with expected api config
}

// export interface OpenAiConversation {
//   role: 'user' | 'assistant';
//   content: string;
// }[];
export type OpenAiConversation = 
  (ChatCompletionAssistantMessageParam
  | ChatCompletionUserMessageParam)[];

export type OpenAiConversations = { [k: string]: OpenAiConversation };

export interface PromptParams {
  prompt: string;
  convoId?: string;
  model?: string;
}

