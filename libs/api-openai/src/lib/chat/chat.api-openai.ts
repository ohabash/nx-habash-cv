import axios from 'axios';
import { ApiOpenaiBaseModule } from '../api-openai.base';
import { ApiOpenaiConfig, OpenAiConversation, PromptParams } from '../api-openai.interface';
import { pretty } from '@nx-habash/utils';
import columnify = require('columnify');

const sig = '[ chat.api-openai.ts ]'.gray;

export class ChatApiOpenai extends ApiOpenaiBaseModule {
  constructor(public config: ApiOpenaiConfig) {
    super(config);
  }

  async prompt(params: PromptParams, prime_callback?: () => string) {
    const model = params.model || 'gpt-4o-mini';
    try {
      // make req body
      let messages: OpenAiConversation = [
        { role: 'user', content: params.prompt },
      ];

      // track convo from session memory if convoid
      const isConvo = params.convoId?.length;
      if (isConvo) {
        // exits
        const exists: boolean = global.conversations[params.convoId]?.length > 0;
        // init if doesnt exist
        global.conversations[params.convoId] ??= [];
        // prime if not exists
        if (!exists && prime_callback) {
          messages.unshift({ role: 'user', content: prime_callback() });
        }
        // add new message
        global.conversations[params.convoId].push(...messages);
        // reassign
        messages = global.conversations[params.convoId];
      }

      // request
      const payload = { messages, model };
      const response = await this.openai.chat.completions.create(payload);

      // add response to messages
      const msg = response.choices[0].message;
      if (isConvo) global.conversations[params.convoId].push(msg);

      // log messages
      logMsgs(messages);

      // return
      return response;
    } catch (error) {
      this.handleError(error, 'chat');
    }
  }
}

function logMsgs(messages: OpenAiConversation) {
  console.log('\n');
  console.log(
    columnify(messages, {
      truncate: true,
      // preserveNewLines: true,
      columnSplitter: ' :: ',
      showHeaders: false,
      config: {
        content: {
          maxWidth: 100,
        },
      },
    })
  );
  console.log('\n');
}