import axios from 'axios';
import { ApiOpenaiBaseModule } from '../api-openai.base';
import { ApiOpenaiConfig } from '../api-openai.interface';
import { RequestOptions } from 'openai/core';
import { ThreadCreateParams } from 'openai/resources/beta/threads/threads';

const sig = '[ threads.api-openai.ts ]'.gray;

type CreateThreadParams = {
  body?: ThreadCreateParams;
  options?: RequestOptions;
};

const fakeCreateThreadParams: CreateThreadParams = { // DEV ONLY
  body: {
    // tool_resources: ['gpt-4o-2024-11-20'],
    messages: [
      {
        role: 'user',
        content: 'Welcome to the thread!',
      },
    ],
  },
}

export class ThreadsApiOpenai extends ApiOpenaiBaseModule {
  constructor(config: ApiOpenaiConfig) {
    super(config);
  }

  /**
   * @description delete a thread
   * @documentation https://platform.openai.com/docs/api-reference/threads/deleteThread
   */
  async delete({ threadId }: { threadId: string }) {
    try {
      const response = await this.openai.beta.threads
        .del(threadId)
        .then((res) => res);
      return response;
    } catch (error) {
      this.handleError(error, 'deleteThread');
    }
  }

  /**
   * @description Create a thread
   */
  async create(params: CreateThreadParams) {
    try {
      if (!params.body) params.body = fakeCreateThreadParams.body; // DEV ONLY
      if (!params.options) params.options = fakeCreateThreadParams.options; // DEV ONLY
      const response = await this.openai.beta.threads
        .create(params.body, params.options)
        .then((res) => res);
      return response;
    } catch (error) {
      this.handleError(error, 'createThread');
    }
  }
}
