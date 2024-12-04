import axios from 'axios';
import { ApiOpenaiBaseModule } from '../api-openai.base';
import { ApiOpenaiConfig } from '../api-openai.interface';
import { MessageCreateParams } from 'openai/resources/beta/threads/messages';
import { RequestOptions } from 'openai/core';

const sig = '[ messages.api-openai.ts ]'.gray;

type CreateMessageParams = {
    threadId: string,
    body: MessageCreateParams,
    options?: RequestOptions,
  }

export class MessagesApiOpenai extends ApiOpenaiBaseModule {
  constructor(config: ApiOpenaiConfig) {
    super(config);
  }

  /**
   * @description Create a thread message
   */
  async create({threadId, body, options}: CreateMessageParams) {
    try {
      const response = await this.openai.beta.threads.messages
        .create(threadId, body, options)
        .then((res) => res);
      return response;
    } catch (error) {
      this.handleError(error, 'createMessage');
    }
  }
}
