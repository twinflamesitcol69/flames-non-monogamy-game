import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAds } from '@/contexts/AdContext';

interface BannerAdProps {
  language: 'pt' | 'es' | 'en';
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
  const { logEvent } = useAds();
  const t = translations[language];

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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (autoCollapseTimer) {
      clearTimeout(autoCollapseTimer);
      setAutoCollapseTimer(null);
    }
  };

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
          
          <div className="h-16 md:h-20 flex items-center justify-center bg-gradient-to-r from-purple-50 to-pink-50 text-muted-foreground">
            {/* Placeholder for actual ad content */}
            <div className="text-center">
              <div className="text-sm font-medium">Advertisement</div>
              <div className="text-xs opacity-60">320x50 Banner Ad Space</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};