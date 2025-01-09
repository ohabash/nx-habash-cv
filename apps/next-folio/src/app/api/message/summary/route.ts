import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const messages = searchParams.get("messages");

  if (!messages)
    return Response.json({ error: "please provide messages as a string" }, { status: 400 });

  const openai = new OpenAI();

  try {
    // const response = await openai.beta.threads.messages.list(threadId);
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Please refer to assistant as omar. Please provide a summary in under 10 words. ${messages}`,
    });
    return Response.json(response);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
