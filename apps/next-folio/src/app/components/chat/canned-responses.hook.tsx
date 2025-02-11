import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./chat.context";
import { useChatRun } from "./runner.hook";
import { RunCreateParams } from "./chat.interface";
import { pollRunCompletion } from "./runner.actions";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { CreateMessageParams, MessagesResp } from "./messages.interface";
import { ProfileService } from "../profile/profile.service";
import { GlobalContext } from "@/global.context";

interface CannedResp {
  assistantLoading: () => void;
  optimisticUpdate: (value: string) => void;
  runPollUpdate: (runParams: RunCreateParams) => Promise<Run>;
  setRunError: (run: Run | null, val?: {code: string, message: string}) => void;
}
interface Props {
  [key: string]: any;
}

export const useCannedResponses = (): CannedResp => {
  const chatContext = useContext(ChatContext);
  const globalContext = useContext(GlobalContext);
  const profile = globalContext?.profile;
  const runner = useChatRun();
  const threadIdRef = useRef(null as string|null);
  const assistantIdRef = useRef(null as string|null);
  const msgClientRef = useRef(null as MessagesResp | null);;

   useEffect(() => {
     threadIdRef.current = chatContext?.thread?.threadId ?? null;
     assistantIdRef.current = chatContext?.assistant?.assistant?.id ?? null;
     msgClientRef.current = chatContext?.messageClient ?? null;
   }, [chatContext]);

  const assistantLoading = (value = 'Let me think about that...') => {
    msgClientRef.current?.setMessagesFn(
      [
        {
          role: 'assistant',
          loading: true,
          status: 'sending',
          content: [
            {
              text: {
                value,
                annotations: [],
              },
              type: 'text',
            },
          ],
          id: 'temp-id',
          created_at: new Date().valueOf(),
        } as any,
      ],
      true,
      false
    );
  };

  const optimisticUpdate = (value: string) => {
    msgClientRef.current?.setMessagesFn(
      [
        {
          role: 'user',
          loading: false,
          status: 'sending',
          content: [
            {
              text: {
                value,
                annotations: [],
              },
              type: 'text',
            },
          ],
          id: 'temp-id',
          created_at: new Date().valueOf(),
        } as any,
      ],
      true,
      false
    );
  }

  const setRunError = (run: Run | null, val?: {code: string, message: string}) => {
    // console.log(`🚀 => setRunError => run:`, run)
    if (!val) val = {code: 'Unknown Error', message: 'I apologize. Please let me know about this error.'};
    if (run?.last_error) {
      const {code, message} = run.last_error;
      if (code) val.code = code;
      if (message) val.message = message;
    }
    msgClientRef.current?.setMessagesFn(
      [
        {
          role: 'assistant',
          loading: false,
          error: true,
          status: val.code as any,
          content: [
            {
              text: {
                value: val.message,
                annotations: [],
              },
              type: 'text',
            },
          ],
          id: 'temp-id',
          created_at: new Date().valueOf(),
        },
      ],
      true,
      false
    );
  }

  const introduction = async () => {
    // create msg and display
    const msg: CreateMessageParams = {
      threadId: threadIdRef.current as string,
      body: {
        content: `Hi, I am ${profile?.name} from the company ${profile?.company}. I would like to ask you some questions about your expierence as a Designer, Leader, Programmer.`,
        role: 'user' as 'user' | 'assistant',
      },
    };

    // optimistic update
    optimisticUpdate(msg.body.content as string);

    // create msg and display
    const resp = await msgClientRef.current?.createMessage(msg);

    // run (request a response)
    const runResp = await runPollUpdate({
      threadId: threadIdRef.current as string,
      params: {
        assistant_id: assistantIdRef.current as string,
        stream: false,
      },
    });
  };

  const runPollUpdate = async (runParams: RunCreateParams): Promise<Run> => {
      // run (request a response)
      const runResp = await runner.run(runParams, {
        name: profile?.name as string,
        company: profile?.company as string,
      });
  
      // keep checking until run is completed (!! this might timeout)
      const completedRun = await pollRunCompletion(threadIdRef.current!, runResp);
  
      // update messages
      await msgClientRef.current?.updateMessages(threadIdRef.current as string, 'onSubmit', msgClientRef.current?.setMessagesFn);

      // add run error
      console.log(`🚀 FINAL => runPollUpdate => completedRun:`, completedRun)
      if (completedRun.last_error) setRunError(completedRun);

      if ((completedRun as any).error?.error?.message) {
        const er = (completedRun as any).error.error.message;
        setRunError({
          last_error: {
            message: er,
            code: 'Unknown Error [9291]' as any,
          }
        }as any);
      }
  
      // return run
      return completedRun;
    };

  return {
    assistantLoading,
    optimisticUpdate,
    runPollUpdate,
    setRunError,
  };
}