'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function URLTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.toString()) {
      fetch('/api/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: window.location.href }),
      });
    }
  }, [searchParams]);

  return null;
}

