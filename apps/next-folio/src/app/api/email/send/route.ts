import { NextRequest } from "next/server";
const sig = `[ api/email/send/route.ts ] ::: `;
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

interface PostmarkMessage {
  From: string;
  To: string;
  Subject: string;
  TextBody?: string;
  HtmlBody?: string;
  ReplyTo?: string;
  Tag?: string;
  Metadata?: Record<string, string>;
  MessageStream: string;
}

export async function POST(req: NextRequest) {
  try {
    const reQ = await req.json();
    const {
      to,
      subject,
      textBody,
      htmlBody,
      from,
      replyTo,
      tag,
      metadata,
    } = reQ as SendEmailParams;
    

    // alway include admin email in the to array
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      to.push(adminEmail);
    }
    
    // Filter out empty strings and invalid emails
    const validRecipients = to.filter(email => email && email.trim() !== '');
    
    console.log(sig, `process.env.ADMIN_EMAIL:`, process.env.ADMIN_EMAIL)
    console.log(sig, 'Sending email to:', validRecipients);
    
    // Check if we have valid recipients
    if (validRecipients.length === 0) {
      return Response.json({ error: "No valid recipients specified" }, { status: 400 });
    }

    // console.log(sig, 'Sending email reQ:', reQ);

    if (!subject) {
      return Response.json({ error: "Subject is required" }, { status: 400 });
    }

    if (!textBody && !htmlBody) {
      return Response.json({ error: "Either textBody or htmlBody is required" }, { status: 400 });
    }
    
    // Check for required environment variables
    const postmarkServerToken = process.env.POSTMARK_SERVER_TOKEN;
    console.log(sig,`postmarkServerToken:`, postmarkServerToken)
    if (!postmarkServerToken) {
      return Response.json({ error: "Postmark server token not configured" }, { status: 500 });
    }

    // Default from address - use environment variable or default
    const defaultFrom = process.env.DEFAULT_FROM_EMAIL || process.env.ADMIN_EMAIL;
    console.log(sig,`defaultFrom:`, defaultFrom)
    // console.log(sig,`process.env.DEFAULT_FROM_EMAIL:`, process.env)
    if (!defaultFrom && !from) {
      return Response.json({ error: "From address not configured" }, { status: 500 });
    }

    // Prepare batch messages for Postmark
    const payload = (email: string) => ({
      From: from || defaultFrom!,
      To: email,
      Subject: subject,
      TextBody: textBody,
      HtmlBody: htmlBody,
      ReplyTo: replyTo,
      Tag: tag,
      Metadata: metadata,
      MessageStream: 'outbound',
    });
    const messages: PostmarkMessage[] = validRecipients.map(email => {
      console.log(sig, `⚠️⚠️⚠️⚠️ POST => payload:`, payload(email));
      return payload(email)
    });

    // Send via Postmark batch API
    const response = await fetch("https://api.postmarkapp.com/email/batch", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": postmarkServerToken
      },
      body: JSON.stringify(messages)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(sig, 'Postmark error:', errorData);
      return Response.json({ 
        error: "Failed to send email", 
        details: errorData 
      }, { status: response.status });
    }

    const result = await response.json();
    console.log(sig, 'Postmark response:', result);

    // Check for errors in the batch response
    const errors = result.filter((msg: any) => msg.ErrorCode && msg.ErrorCode !== 0);
    
    if (errors.length > 0) {
      console.error(sig, 'Email sending errors:', errors);
      return Response.json({ 
        success: false,
        error: "Failed to send one or more emails", 
        details: errors 
      }, { status: 400 });
    }

    const successCount = result.filter((msg: any) => !msg.ErrorCode || msg.ErrorCode === 0).length;
    console.log(sig, 'Emails sent successfully:', successCount);

    return Response.json({ 
      success: true, 
      messagesSent: successCount,
      results: result 
    });

  } catch (error) {
    console.error(sig, 'Email sending error:', error);
    return Response.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 