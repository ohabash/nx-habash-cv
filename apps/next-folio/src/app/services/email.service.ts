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

export interface PostmarkError {
  ErrorCode: number;
  Message: string;
}

/**
 * Parses Postmark error details to provide user-friendly error messages
 * 
 * @param details - Array of Postmark error details
 * @returns User-friendly error message
 */
export function parsePostmarkErrors(details: PostmarkError[]): string {
  if (!details || !Array.isArray(details)) {
    return 'Email service error occurred.';
  }
  
  const postmarkErrors = details.filter((detail: PostmarkError) => detail.ErrorCode);
  if (postmarkErrors.length === 0) {
    return 'Email service error occurred.';
  }
  
  const errorCode = postmarkErrors[0].ErrorCode;
  const errorMessage = postmarkErrors[0].Message;
  
  switch (errorCode) {
    case 412:
      return 'Email domain not approved. Please use a different email address or contact support.';
    case 300:
      return 'Invalid email format. The message could not be processed due to formatting issues.';
    case 406:
      return 'Email address is not valid. Please check the email format.';
    case 401:
      return 'Email service authentication failed. Please contact support.';
    case 422:
      return 'Email content is invalid. Please check your message.';
    default:
      return errorMessage || 'Email service error occurred.';
  }
}

interface EmailResponse {
  success: boolean;
  messagesSent?: number;
  results?: any[];
  error?: string;
  details?: PostmarkError[];
}

/**
 * Sends an email to a list of recipients using the Postmark API
 * @param options - Email configuration options
 * @returns Promise with the API response containing user-friendly error messages
 */
export async function __sendEmail(options: EmailOptions): Promise<EmailResponse> {
  console.log(sig,`sendEmail => options:`, options)
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    const result = await response.json();
    console.log(sig, 'Server response:', result);

    // If server explicitly returns success: false, return that
    if (result.success === false) {
      console.error(sig, 'Server returned error:', result.error);
      console.error(sig, 'Error details:', result.details);
      
      // Parse Postmark-specific errors for user-friendly messages
      const userFriendlyError = result.details ? 
        parsePostmarkErrors(result.details) : 
        (result.error || 'Email sending failed');
      
      return {
        success: false,
        error: userFriendlyError,
        details: result.details,
      };
    }

    // If HTTP status is not ok, it's also an error
    if (!response.ok) {
      console.error(sig, 'HTTP error:', response.status, result);
      return {
        success: false,
        error: result.error || `HTTP ${response.status}: Failed to send email`,
        details: result.details,
      };
    }

    // Check if result has success property, if not assume success
    if (result.success === undefined) {
      result.success = true;
    }

    return result;
  } catch (error) {
    console.error(sig, 'Email service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}



export async function sendEmail(options: EmailOptions): Promise<EmailResponse> {
  console.log(sig, `sendEmail => options:`, options);
  try {
    const response = await fetch('/api/email/sendN8n', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    const result = await response.json();
    console.log(sig, 'Server response:', result);

    // If server explicitly returns success: false, return that
    if (result.success === false) {
      console.error(sig, 'Server returned error:', result.error);
      return {
        success: false,
        error: result.error || 'Email sending failed',
        details: result.details,
      };
    }

    // If HTTP status is not ok, it's also an error
    if (!response.ok) {
      console.error(sig, 'HTTP error:', response.status, result);
      return {
        success: false,
        error: result.error || `HTTP ${response.status}: Failed to send email`,
        details: result.details,
      };
    }

    // Check if result has success property, if not assume success
    if (result.success === undefined) {
      result.success = true;
    }

    return result;
  } catch (error) {
    console.error(sig, 'Email service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Truncates metadata values to comply with Postmark limits
 * Field names: max 20 chars
 * Field values: max 80 chars
 */
function truncateMetadata(metadata: Record<string, string>): Record<string, string> {
  return Object.entries(metadata).reduce((acc, [key, value]) => {
    // Truncate key to 20 chars
    const truncatedKey = key.slice(0, 20);
    // Truncate value to 80 chars
    const truncatedValue = value.slice(0, 80);
    acc[truncatedKey] = truncatedValue;
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Generates the text body for a contact notification email
 * @param requestedInfo - The information that was requested but not available
 * @param userMessage - Optional message from the user
 * @returns Formatted text body for the email
 */
function emailBody(requestedInfo: string, userMessage?: string): string {
  return `
New contact request from portfolio website:

Requested Information: ${requestedInfo}

${userMessage ? `User Message: ${userMessage}` : ''}

Please follow up with this inquiry.

---
Sent from Omar Habash Portfolio Website
  `.trim();
}

/**
 * Sends a contact notification email to admin
 * @param requestedInfo - The information that was requested but not available
 * @param userMessage - Optional message from the user
 * @returns Promise with the API response containing user-friendly error messages
 */
export async function sendContactNotification(
  requestedInfo: string,
  userMessage?: string
): Promise<EmailResponse> {
  console.log(sig,`requestedInfo:`, requestedInfo)
  const subject = `🚨🚨🚨 Portfolio Contact Request`;
  
  const textBody = emailBody(requestedInfo, userMessage);

  const htmlBody = `
<h2>New Contact Request</h2>

<div style="margin-bottom: 10px;">
  <strong>Requested Information:</strong>
  <pre>${requestedInfo}</pre>
</div>

${userMessage ? `<p><strong>User Message:</strong> ${userMessage}</p>` : ''}

<p>Please follow up with this inquiry.</p>

<hr>
<p><small>Sent from Omar Habash Portfolio Website</small></p>
  `.trim();

  // The API route will handle determining the admin email from environment variables
  console.log(sig, `process.env.ADMIN_EMAIL:`, process.env.ADMIN_EMAIL)
  
  // Create metadata with truncated values
  const metadata = truncateMetadata({
    source: 'portfolio-website',
    requestType: 'contact-form',
    summary: requestedInfo // Using summary instead of requestedInfo for clarity
  });

  return sendEmail({
    to: [], // Empty array - API will use adminEmail from env
    subject,
    textBody,
    htmlBody,
    tag: 'portfolio-contact',
    metadata
  });
} 