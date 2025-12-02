import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract geo data from Vercel's automatic headers
    const geo = {
      ip: request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip'),
      country: request.headers.get('x-vercel-ip-country'),
      countryRegion: request.headers.get('x-vercel-ip-country-region'),
      city: request.headers.get('x-vercel-ip-city'),
      latitude: request.headers.get('x-vercel-ip-latitude'),
      longitude: request.headers.get('x-vercel-ip-longitude'),
    };

    const payload = { ...body, geo };
    
    console.log('🔵 Sending to webhook:', body.url, geo.city, geo.country);

    const response = await fetch(
      'https://fn9kenzie9iqbu.app.n8n.cloud/webhook/visit',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    console.log('✅ Webhook:', response.status, response.statusText);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook failed:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

