import { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAds } from '@/contexts/AdContext';

interface BannerAdProps {
  language: 'pt' | 'es' | 'en';
}

// Declare adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const translations = {
  en: {
    expand: "Show Ad",
    collapse: "Hide Ad"
  },
  es: {
    expand: "Mostrar Anuncio",
    collapse: "Ocultar Anuncio"
  },
  pt: {
    expand: "Mostrar Anúncio", 
    collapse: "Ocultar Anúncio"
  }
};

export const BannerAd = ({ language }: BannerAdProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [autoCollapseTimer, setAutoCollapseTimer] = useState<NodeJS.Timeout | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const { logEvent, adState, isAdsEnabled } = useAds();
  const t = translations[language];
  
  // Don't render if ads are disabled
  if (!isAdsEnabled()) {
    return null;
  }

  // Check for test mode
  const isTestMode = new URLSearchParams(window.location.search).get('adtest') === '1';

  useEffect(() => {
    // Auto-collapse after 10 seconds on small screens
    const timer = setTimeout(() => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    }, 10000);
    
    setAutoCollapseTimer(timer);
    logEvent('ad_banner_impression');

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [logEvent]);

  useEffect(() => {
    // Load AdSense ad only if consent is given
    if (adState.hasConsent && adRef.current && !adLoaded && !adError) {
      try {
        // Initialize adsbygoogle if not available
        window.adsbygoogle = window.adsbygoogle || [];
        
        // Push the ad configuration
        window.adsbygoogle.push({});
        setAdLoaded(true);
      } catch (error) {
        console.error('AdSense banner failed to load:', error);
        setAdError(true);
      }
    }
  }, [adState.hasConsent, adLoaded, adError]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (autoCollapseTimer) {
      clearTimeout(autoCollapseTimer);
      setAutoCollapseTimer(null);
    }
  };

  // Fixed height to prevent CLS - mobile: 56px, desktop: 90px
  const bannerHeight = 'h-14 md:h-[90px]';

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border transition-transform duration-300 ${
      isCollapsed ? 'transform translate-y-full' : ''
    }`}>
      {isCollapsed && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="absolute -top-8 right-4 bg-white border border-b-0 rounded-t-md h-8 px-2 text-xs"
        >
          <ChevronUp className="w-3 h-3 mr-1" />
          {t.expand}
        </Button>
      )}
      
      {!isCollapsed && (
        <>
          <Button
            variant="ghost" 
            size="sm"
            onClick={toggleCollapse}
            className="absolute top-1 right-1 h-6 w-6 p-0 text-muted-foreground hover:text-foreground md:hidden"
          >
            <ChevronDown className="w-3 h-3" />
          </Button>
          
          <div className={`${bannerHeight} flex items-center justify-center overflow-hidden`}>
            {adState.hasConsent ? (
              <div ref={adRef} className="w-full h-full flex items-center justify-center">
                <ins 
                  className="adsbygoogle"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  data-ad-client="ca-pub-7997489223643022"
                  data-ad-slot="1030982111"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                  {...(isTestMode && { 'data-adtest': 'on' })}
                />
              </div>
            ) : (
              // Placeholder when consent not given - same height to prevent CLS
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-50 to-pink-50 text-muted-foreground">
                <div className="text-center">
                  <div className="text-sm font-medium">Advertisement</div>
                  <div className="text-xs opacity-60">Consent required</div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};