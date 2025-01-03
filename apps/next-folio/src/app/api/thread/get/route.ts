import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  // find threadId
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get('threadId');
  
  // If no threadId is provided, return an error
  if (!threadId) return Response.json({ error: 'No thread id provided' }, { status: 400 });
  
  // client
  const openai = new OpenAI();

  // fetch // error
  try {
    const thread = await openai.beta.threads.retrieve(threadId);
    return Response.json(thread);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
