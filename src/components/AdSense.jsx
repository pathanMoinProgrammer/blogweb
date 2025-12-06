'use client';

import { useEffect, useRef } from 'react';

const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-xxxxxxxxxxxxxxxx';

export function AdSenseUnit({ 
  slot = '', 
  format = 'auto', 
  responsive = true,
  className = '' 
}) {
  const adRef = useRef(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

export function InArticleAd({ slot = '' }) {
  return (
    <div className="my-6">
      <AdSenseUnit 
        slot={slot} 
        format="fluid" 
        className="min-h-[250px]" 
      />
    </div>
  );
}

export function SidebarAd({ slot = '' }) {
  return (
    <div className="sticky top-4">
      <AdSenseUnit 
        slot={slot} 
        format="vertical" 
        className="min-h-[600px]" 
      />
    </div>
  );
}

export function BannerAd({ slot = '' }) {
  return (
    <AdSenseUnit 
      slot={slot} 
      format="horizontal" 
      className="min-h-[90px] w-full" 
    />
  );
}

export default AdSenseUnit;
