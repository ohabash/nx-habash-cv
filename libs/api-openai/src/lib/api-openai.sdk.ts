import { ApiOpenaiConfig } from './api-openai.interface';
import { TestApiOpenai } from './test/test.api-openai';
import { ChatApiOpenai } from './chat/chat.api-openai';
import { ImageApiOpenai } from './image/image.api-openai';
import { AssistantsApiOpenai } from './assistants/assistants.api-openai';
import { ThreadsApiOpenai } from './threads/threads.api-openai';
import { MessagesApiOpenai } from './messages/messages.api-openai';

const sig = '[ api-openai.sdk.ts ]'.gray;

export class ApiOpenaiSdk {
  options: ApiOpenaiConfig;

  constructor(options: ApiOpenaiConfig) {
    this.options = options;
  }

  get CHAT() {
    return new ChatApiOpenai(this.options);
  }
  get IMAGE() {
    return new ImageApiOpenai(this.options);
  }
  get ASSISTANTS() {
    return new AssistantsApiOpenai(this.options);
  }
  get THREADS() {
    return new ThreadsApiOpenai(this.options);
  }
  get MESSAGES() {
    return new MessagesApiOpenai(this.options);
  }
  get test() {
    return new TestApiOpenai(this.options);
  }
}

undefined;
