import { Run } from "openai/resources/beta/threads/runs/runs";
import { RunCreateParams } from "./chat.interface";

// export interface RunHookResp {
//   run: (data: RunCreateParams) => Promise<Run>;

// }
export const useChatRun = () => {
  return { run: createRun, retrieveRun };
}

const createRun = async (data: RunCreateParams): Promise<Run> => {
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

const retrieveRun = async (threadId: string, runId: string): Promise<Run> => {
  console.log(`🚀 [ACTION] => retrieveRun => threadId:`, threadId);

  const url = new URL('/api/run/retrieve', window.location.origin);
  url.searchParams.append('threadId', threadId);
  url.searchParams.append('runId', runId);

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json() as Run;
}


