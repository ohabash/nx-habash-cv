import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    console.log('🔵 Sending to webhook:', url);

    const response = await fetch(
      'https://fn9kenzie9iqbu.app.n8n.cloud/webhook/visit',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      }
    );

    console.log('✅ Webhook:', response.status, response.statusText);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook failed:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

