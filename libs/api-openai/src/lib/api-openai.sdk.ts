import { ApiOpenaiConfig } from './api-openai.interface';
import { TestApiOpenai } from './test/test.api-openai';
import { ChatApiOpenai } from './chat/chat.api-openai';
import { ImageApiOpenai } from './image/image.api-openai';
import { AssistantApiOpenai } from './assistant/assistant.api-openai';

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

  get ASSISTANT() {
    return new AssistantApiOpenai(this.options);
  }
  get test() {
    return new TestApiOpenai(this.options);
  }
}
