import OpenAI from "openai";

export async function POST() {
  console.log("[API] Creating thread...");
  const openai = new OpenAI();

  try {
    const thread = await openai.beta.threads.create();
    return Response.json(thread);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
