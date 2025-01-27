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

const createRun = async (data: RunCreateParams, who: {name: string; company: string;}): Promise<Run> => {
  // add response type
  data.params.response_format = 'auto';
  let ins1 = 'Generate strictly Markdown. Only return MD for easy parsing.';
  if (who.company) ins1 += `\n\nCompany: ${who.company}`;
  if (who.name) ins1 += `\n\nName: ${who.name} (refer to me by this name)`;
  if (who.name) ins1 += `\n\n I am ${who.name} from ${who.company}.`;
  data.params.additional_instructions = ins1;
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




