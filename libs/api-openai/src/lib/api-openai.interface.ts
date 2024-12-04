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

export interface Assistant {
  id: string;
  object: string;
  created_at: number;
  name: string;
  description: string | null;
  model: string;
  instructions: string;
  tools: { type: string }[];
  metadata: Record<string, any>;
  top_p: number;
  temperature: number;
  response_format: string;
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

