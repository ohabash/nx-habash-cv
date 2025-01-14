import { useContext, useEffect } from "react";
import { ChatContext } from "./chat.context";
import { useChatRun } from "./runner.hook";
import { RunCreateParams } from "./chat.interface";
import { pollRunCompletion } from "./runner.actions";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { CreateMessageParams } from "./messages.interface";
import { ProfileService } from "../profile/profile.service";
import { GlobalContext } from "@/global.context";

interface CannedResp {
  assistantLoading: () => void;
  optimisticUpdate: (value: string) => void;
  runPollUpdate: (runParams: RunCreateParams) => Promise<Run>;
}
interface Props {
}

export const useCannedResponses = (): CannedResp => {
  const chatContext = useContext(ChatContext);
  const globalContext = useContext(GlobalContext);
  const profile = globalContext?.profile;
  const runner = useChatRun();
  let threadId = chatContext?.thread.threadId;
  let assistantId = chatContext?.assistant.assistant?.id;
  let msgClient = chatContext?.messageClient!;

  useEffect(() => {
    threadId = chatContext?.thread.threadId;
    assistantId = chatContext?.assistant.assistant?.id;
    msgClient = chatContext?.messageClient!;
  }, [chatContext]);

  const assistantLoading = (value = 'Let me think about that...') => {
    msgClient.setMessagesFn(
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
    msgClient.setMessagesFn(
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

  const introduction = async () => {
    // create msg and display
    const msg: CreateMessageParams = {
      threadId: threadId as string,
      body: {
        content: `Hi, I am ${profile?.name} from the company ${profile?.company}. I would like to ask you some questions about your expierence as a Designer, Leader, Programmer.`,
        role: 'user' as 'user' | 'assistant',
      },
    };

    // optimistic update
    optimisticUpdate(msg.body.content as string);

    // create msg and display
    const resp = await msgClient.createMessage(msg);

    // run (request a response)
    let runResp = await runPollUpdate({
      threadId: threadId as string,
      params: {
        assistant_id: assistantId as string,
        stream: false,
      },
    });
  };

  const runPollUpdate = async (runParams: RunCreateParams): Promise<Run> => {
      // run (request a response)
      let runResp = await runner.run(runParams);
  
      // keep checking until run is completed (!! this might timeout)
      const completedRun = await pollRunCompletion(threadId!, runResp);
  
      // update messages
      await msgClient.updateMessages(threadId as string, 'onSubmit', msgClient.setMessagesFn);
  
      // return run
      return completedRun;
    };

  return {
    assistantLoading,
    optimisticUpdate,
    runPollUpdate,
  };
}