'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function isBot(): boolean {
  if (typeof navigator === 'undefined') return true;
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Known bot signatures for link preview crawlers
  const botPatterns = [
    'facebot',
    'applebot',
    'discordbot',
    'slackbot',
    'twitterbot',
    'whatsapp',
    'linkedinbot',
    'telegrambot',
    'IndeedBot',
    'YandexBot',
    'BingBot',
    'GoogleBot',
    'BaiduBot',
    'YahooBot',
    'DuckDuckGoBot',
    'SogouBot',
    'BingPreview',
    // Additional common bots and crawlers
    'bot',
    'crawler',
    'spider',
    'curl',
    'wget',
    'python',
    'go-http-client',
    'facebookexternalhit',
    'facebot',
    'applebot',
    'discordbot',
    'slackbot',
    'twitterbot',
    'whatsapp',
    'linkedinbot',
    'telegrambot',
  ];
  
  return botPatterns.some(pattern => userAgent.includes(pattern));
}

export function URLTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track if there are search params and the request is from a real user
    if (searchParams.toString() && !isBot()) {
      fetch('/api/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: window.location.href }),
      });
    }
  }, [searchParams]);

  return null;
}

