# Email Setup Guide

This guide explains how to set up the email functionality for the portfolio's contact system.

## Required Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Email Configuration
# Get your Postmark server token from https://account.postmarkapp.com/servers
POSTMARK_SERVER_TOKEN=your_postmark_server_token_here

# Admin email address to receive contact notifications
ADMIN_EMAIL=admin@example.com

# Optional: Default from email address (if not provided, will use ADMIN_EMAIL)
DEFAULT_FROM_EMAIL=noreply@example.com
```

## Setup Instructions

### 1. Get Postmark Server Token

1. Sign up for a Postmark account at https://postmarkapp.com
2. Create a new server in your Postmark account
3. Go to the "API Tokens" tab under your server
4. Copy the "Server Token" value

### 2. Set Up Sender Signature

1. In your Postmark account, go to "Sender Signatures"
2. Add and verify the email address you want to use as the "from" address
3. This should match your `DEFAULT_FROM_EMAIL` or `ADMIN_EMAIL`

### 3. Configure Environment Variables

Create a `.env.local` file in the `apps/next-folio` directory with the required variables:

```bash
POSTMARK_SERVER_TOKEN=your_actual_server_token
ADMIN_EMAIL=your_admin_email@domain.com
DEFAULT_FROM_EMAIL=noreply@yourdomain.com
```

## How It Works

1. When a user asks for information not available in the portfolio data, the AI uses the `dataNotFound` action
2. The user can click "Contact Omar Directly" to send a notification email
3. The email is sent to the `ADMIN_EMAIL` address using the Postmark API
4. The email includes:
   - The information that was requested
   - Metadata about the request
   - A professional notification format

## API Endpoints

- `POST /api/email/send` - Sends emails using Postmark batch API
- Accepts multiple recipients, subject, text/HTML body, and metadata

## Email Service Functions

- `sendEmail(options)` - Generic email sending function
- `sendContactNotification(requestedInfo, userMessage?)` - Specific function for contact notifications

## Error Handling

- Invalid configuration shows appropriate error messages
- Failed email sends are logged and displayed to the user
- Success states provide feedback that the email was sent

## Testing

To test the email functionality:

1. Set up your environment variables
2. Ask the AI for information not in the portfolio (e.g., "What's your favorite color?")
3. Click the "Contact Omar Directly" button
4. Check your admin email for the notification 