import axios from 'axios';
import { ApiOpenaiBaseModule } from '../api-openai.base';
import { ApiOpenaiConfig } from '../api-openai.interface';
import { AssistantCreateParams } from 'openai/resources/beta/assistants';

const sig = '[ assistant.api-openai.ts ]'.gray;

export class AssistantsApiOpenai extends ApiOpenaiBaseModule {
  constructor(config: ApiOpenaiConfig) {
    super(config);
  }

  /**
   * @description Returns a list of assistants.
   * @url https://platform.openai.com/docs/api-reference/assistants/listAssistants
   */
  async list() {
    try {
      const response = await this.openai.beta.assistants
        .list()
        .then((res) => res.data);
      return response;
    } catch (error) {
      this.handleError(error, 'listAssistants');
    }
  }

  /**
   * @description Create a new assistant.
   * @url https://platform.openai.com/docs/api-reference/assistants/listAssistants
   */
  async create(params: AssistantCreateParams) {
    console.log(`🚀 => AssistantsApiOpenai => create => params:`, params);
    try {
      const response = await this.openai.beta.assistants
        .create(params)
        .then((res) => res);
      return response;
    } catch (error) {
      this.handleError(error, 'createAssistant');
    }
  }

  /**
   * @description delete an assistant.
   * @url https://platform.openai.com/docs/api-reference/assistants/deleteAssistant
   */
  async delete({ assistantId }: { assistantId: string }) {
    try {
      const response = await this.openai.beta.assistants
        .del(assistantId)
        .then((res) => res);
      return response;
    } catch (error) {
      this.handleError(error, 'deleteAssistant');
    }
  }

  /**
   * @description Retrieves an assistant..
   * @url https://platform.openai.com/docs/api-reference/assistants/getAssistant
   */
  async get({ assistantId }: { assistantId: string }) {
    try {
      const response = await this.openai.beta.assistants
        .retrieve(assistantId)
        .then((res) => res);
      return response;
    } catch (error) {
      this.handleError(error, 'getAssistant');
    }
  }


  /**
   * @description Modify an assistant.
   * @url https://platform.openai.com/docs/api-reference/assistants/modifyAssistant
   */
  async modify({
    assistantId,
    params,
  }: {
    assistantId: string;
    params: AssistantCreateParams;
  }) {
    console.log(`🚀 => AssistantsApiOpenai => modify => params:`, params);
    console.log(
      `🚀 => AssistantsApiOpenai => modify => assistantId:`,
      assistantId
    );
    try {
      const response = await this.openai.beta.assistants
        .update(assistantId, params)
        .then((res) => res);
      return response;
    } catch (error) {
      this.handleError(error, 'modifyAssistant');
    }
  }
}
