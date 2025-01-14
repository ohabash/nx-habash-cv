import { timeout } from "@nx-habash/utils";
import { Run } from "openai/resources/beta/threads/runs/runs";

export const pollRunCompletion = async (threadId: string, run: Run): Promise<Run> => {
  while (run.status !== 'completed') {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    run = await retrieveRun(threadId, run.id);
    await timeout(500);
    console.log(`🚀 => waitForRunCompletion => run:`, run);
  }
  return run;
};

export const retrieveRun = async (threadId: string, runId: string): Promise<Run> => {
  console.log(`🚀 [ACTION] => retrieveRun => threadId:`, threadId);

  const url = new URL('/api/run/retrieve', window.location.origin);
  url.searchParams.append('threadId', threadId);
  url.searchParams.append('runId', runId);

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await res.json()) as Run;
};