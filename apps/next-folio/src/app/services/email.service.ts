const sig = `[ email.service.ts ] ::: `;

interface EmailOptions {
  to: string[];
  subject: string;
  textBody?: string;
  htmlBody?: string;
  from?: string;
  replyTo?: string;
  tag?: string;
  metadata?: Record<string, string>;
}

interface EmailResponse {
  success: boolean;
  messagesSent?: number;
  results?: any[];
  error?: string;
  details?: any;
}

/**
 * Sends an email to a list of recipients using the Postmark API
 * @param options - Email configuration options
 * @returns Promise with the API response
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResponse> {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Sends a contact notification email to admin
 * @param requestedInfo - The information that was requested but not available
 * @param userMessage - Optional message from the user
 * @returns Promise with the API response
 */
export async function sendContactNotification(
  requestedInfo: string,
  userMessage?: string
): Promise<EmailResponse> {
  const subject = `🚨🚨🚨 Portfolio Contact Request: ${requestedInfo}`;
  
  const textBody = `
New contact request from portfolio website:

Requested Information: ${requestedInfo}

${userMessage ? `User Message: ${userMessage}` : ''}

Please follow up with this inquiry.

---
Sent from Omar Habash Portfolio Website
  `.trim();

  const htmlBody = `
<h2>New Contact Request</h2>
<p><strong>Requested Information:</strong> ${requestedInfo}</p>

${userMessage ? `<p><strong>User Message:</strong> ${userMessage}</p>` : ''}

<p>Please follow up with this inquiry.</p>

<hr>
<p><small>Sent from Omar Habash Portfolio Website</small></p>
  `.trim();

  // The API route will handle determining the admin email from environment variables
    console.log(sig, `process.env.ADMIN_EMAIL:`, process.env.ADMIN_EMAIL)
  return sendEmail({
    to: [process.env.ADMIN_EMAIL || ''], // Empty array - API will use adminEmail from env
    subject,
    textBody,
    htmlBody,
    tag: 'portfolio-contact',
    metadata: {
      source: 'portfolio-website',
      requestType: 'data-not-found',
      requestedInfo,
    },
  });
} 