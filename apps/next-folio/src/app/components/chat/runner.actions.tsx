import { timeout } from "@nx-habash/utils";
import { Run } from "openai/resources/beta/threads/runs/runs";

export const pollRunCompletion = async (threadId: string, run: Run): Promise<Run> => {
  let count = 0;
  const max_retry = 7;
  const timeBetweenPolls = 1400; // lowering this will speed up the response time but will increase the number of requests
  while (
    run.status !== 'completed'
     && count < 5
     && run.status !== 'failed'
     && !(run as any).error
    ) {
    count++;
    run = await retrieveRun(threadId, run.id);
    await timeout(timeBetweenPolls);
    // console.log(`🚀 => [Attempt: ${count}] ::: waitForRunCompletion => run:`, run);
  }
  // if ((run as any).error) {
  //   throw new Error(
  //     'Something went wrong. Max retries reached [5]. Refresh to look for response.'
  //   );
  // }
  if (run.status === 'failed') {
    console.error(`🚨🚨🚨 => run.status === 'failed'`, run);
    return run;
  };
  if (count === max_retry) {
    console.error(`🚨🚨🚨 => waitForRunCompletion => max retries reached`);
    throw new Error('Something went wrong. Max retries reached [5]. Refresh to look for response.');
  }
  return run;
};

export const retrieveRun = async (threadId: string, runId: string): Promise<Run> => {

  const url = new URL('/api/run/retrieve', process.env.HOST);
  url.searchParams.append('threadId', threadId);
  url.searchParams.append('runId', runId);

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await res.json()) as Run;
};