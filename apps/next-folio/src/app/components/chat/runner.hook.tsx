import { Run } from "openai/resources/beta/threads/runs/runs";
import { RunCreateParams } from "./chat.interface";
import { pollRunCompletion, retrieveRun } from './runner.actions';

export const useChatRun = () => {

  return {
    run: createRun,
    retrieveRun,
    pollRunCompletion,
  };
};

const createRun = async (data: RunCreateParams, isFirst = false): Promise<Run> => {
  // add response type
  data.params.response_format = 'auto';
  data.params.additional_instructions = 'Generate strictly Markdown. Only return MD for easy parsing.';
  console.log(`🚀 [ACTION] => createRun => data:`, data);
  const res = await fetch('/api/run/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const run: Run = await res.json();
  return run;
};




