'use server';

import { ThreadCreateParams } from "openai/resources/beta/threads/threads";

export const retrieveThread = async (id: string) => {
  const url = new URL('/api/thread/get', process.env.HOST);
  console.log(`🚀 [ACTION] => retrieveThread => id:`, id, url)
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

export const deleteThread = async (id: string) => {
  console.log(`🚀 [ACTION] => deleteThread => id:`, id);
  const url = new URL('/api/thread/delete', process.env.HOST || '');
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

export const createThread = async (data: ThreadCreateParams) => {
  console.log(`🚀 [ACTION] => createThread => data:`, data);
  const host = process.env.HOST || '';
  const res = await fetch(host+'/api/thread/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const thread = await res.json();
  return thread;
};
