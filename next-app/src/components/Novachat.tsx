'use client';

import { useEffect } from 'react';

export default function Novachat() {
  useEffect(() => {
    // Check if script already exists to avoid duplicates during HMR
    if (document.getElementById('novachat-script')) return;

    const script = document.createElement('script');
    script.id = 'novachat-script';
    script.src = 'https://cnpm-group-1.onrender.com/script.umd.cjs';
    script.async = true;
    script.setAttribute('data-workspace-id', '5');
    script.setAttribute('data-widget-token', 'c43666f8f1774e2cb1f8c5962780adf0');
    script.setAttribute('data-api-url', 'https://cnpm-group-1.onrender.com/api/v1');

    const link = document.createElement('link');
    link.id = 'novachat-css';
    link.rel = 'stylesheet';
    link.href = 'https://cnpm-group-1.onrender.com/script.css';

    document.head.appendChild(link);
    document.body.appendChild(script);

    return () => {
      // Optional: Cleanup script on unmount
      // const existingScript = document.getElementById('novachat-script');
      // if (existingScript) existingScript.remove();
    };
  }, []);

  return null;
}
