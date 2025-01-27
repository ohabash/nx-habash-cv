import { RunCreateParams } from "@/components/chat/chat.interface";
import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { params, threadId } = (await req.json()) as RunCreateParams;

  if (!threadId) return Response.json({ error: "No thread id provided" }, { status: 400 });
  if (!params.assistant_id) return Response.json(
    { error: 'No  assistant id provided' },
    { status: 400 }
  );

  const openai = new OpenAI();

  try {
    console.log(`🚀 => POST => threadId, params:`, threadId, params)
    const run = await openai.beta.threads.runs.create(threadId, params);
    return Response.json(run);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
