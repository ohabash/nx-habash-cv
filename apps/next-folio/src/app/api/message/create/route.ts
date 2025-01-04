import { NextRequest } from "next/server";
import OpenAI from "openai";
import { MessageCreateParams } from "openai/resources/beta/threads/messages";

export interface CreateMessageParams {
  threadId: string;
  body: MessageCreateParams;
}

export async function POST(req: NextRequest) {
  const { body, threadId } = (await req.json()) as CreateMessageParams;

  if (!threadId || !body) return Response.json({ error: "Invalid message params provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const threadMessage = await openai.beta.threads.messages.create(threadId, body);
    return Response.json(threadMessage);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
