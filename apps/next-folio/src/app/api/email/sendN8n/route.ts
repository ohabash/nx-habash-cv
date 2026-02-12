import { NextRequest } from "next/server";

const sig = `[ api/email/sendN8n/route.ts ] ::: `;

interface SendEmailParams {
  to: string[];
  subject: string;
  textBody?: string;
  htmlBody?: string;
  from?: string;
  replyTo?: string;
  tag?: string;
  metadata?: Record<string, string>;
}

export async function POST(req: NextRequest) {
  try {
    const options = await req.json() as SendEmailParams;
    
    console.log(sig, 'Sending to n8n webhook:', options);

    const response = await fetch(
      'https://fn9kenzie9iqbu.app.n8n.cloud/webhook/portfolio-contact',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      }
    );

    const result = await response.json();
    console.log(sig, 'n8n webhook response:', result);

    if (!response.ok) {
      console.error(sig, 'HTTP error:', response.status, result);
      return Response.json({ 
        success: false,
        error: result.error || `HTTP ${response.status}: Failed to send email`,
      }, { status: response.status });
    }

    return Response.json({ 
      success: true,
      messagesSent: 1,
      results: [result],
    }, { status: 200 });

  } catch (error) {
    console.error(sig, 'Email sending error:', error);
    return Response.json({ 
      success: false,
      error: "Internal server error", 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
















