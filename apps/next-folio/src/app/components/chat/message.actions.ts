"use server";

import { APIPromise } from "openai/core";
import { Completion } from "openai/resources";
import { Message } from "openai/resources/beta/threads/messages";
import { CreateMessageParams, SetMessagesFn } from "./messages.interface";

// export const updateMessages = async (
//   threadId: string,
//   debug: string,
//   setMessages?: SetMessagesFn
// ): Promise<Message[]> => {
//   return retrieveMessages(threadId, debug).then((data) => {
//     if (setMessages) setMessages(data, false);
//     return data;
//   });
// };

export const retrieveMessages = async (
  id: string,
  debug: string
): Promise<Message[]> => {
  const url = new URL(
    '/api/message/list',
    window?.location.origin || process.env.HOST || ''
  );
  console.log(`🚀 [ACTION] => retrieveMessages => id:`, debug, id, url);
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

export const summarizeMessages = async (
  messages: Message[]
): Promise<APIPromise<Completion>> => {
  console.log(`🚀 [ACTION] => summarizeMessages => messages:`, messages.length);
  const url = new URL('/api/message/summary', process.env.HOST);
  url.searchParams.append('messages', JSON.stringify(messages));

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = (await res.json());
  return data;
};

export const createMessage = async (
  params: CreateMessageParams,
): Promise<Message[]> => {
  // dev 
  console.log(`🚀 [ACTION] => createMessage => params:`, params);

  // create message
  const url = new URL('/api/message/create', process.env.HOST);
  const newMsg = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());

  // get messages
  const messages = await retrieveMessages(params.threadId, 'sdas');

  // return messages
  return messages;
};



 