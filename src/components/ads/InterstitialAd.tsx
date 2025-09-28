import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle } from 'lucide-react';
import { useAds } from '@/contexts/AdContext';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'pt' | 'es' | 'en';
}

const translations = {
  en: {
    skip: "Skip Ad",
    errorTitle: "Ad Error",
    errorMessage: "The ad couldn't load.",
    continue: "Continue",
    loading: "Loading..."
  },
  es: {
    skip: "Saltar Anuncio",
    errorTitle: "Error de Anuncio", 
    errorMessage: "El anuncio no se pudo cargar.",
    continue: "Continuar",
    loading: "Cargando..."
  },
  pt: {
    skip: "Pular Anúncio",
    errorTitle: "Erro do Anúncio",
    errorMessage: "O anúncio não pôde ser carregado.",
    continue: "Continuar",
    loading: "Carregando..."
  }
};

export const InterstitialAd = ({ isOpen, onClose, language }: InterstitialAdProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { incrementInterstitialCount, resetInterstitialCounter, logEvent, isAdsEnabled } = useAds();
  const t = translations[language];
  
  // Don't render if ads are disabled
  if (!isAdsEnabled()) {
    return null;
  }

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setCountdown(5);
      
      // Simulate ad loading
      const loadTimer = setTimeout(() => {
        // 85% success rate for demo
        if (Math.random() > 0.15) {
          setIsLoading(false);
          incrementInterstitialCount();
          resetInterstitialCounter();
          
          // Start countdown for skip button
          const countdownTimer = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(countdownTimer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          return () => clearInterval(countdownTimer);
        } else {
          setHasError(true);
          setIsLoading(false);
          logEvent('ad_interstitial_error');
        }
      }, 1500);
      
      return () => clearTimeout(loadTimer);
    }
  }, [isOpen, incrementInterstitialCount, resetInterstitialCounter, logEvent]);

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg h-96 p-0 overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">{t.loading}</p>
            </div>
          </div>
        )}
        
        {hasError && (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t.errorTitle}</h3>
            <p className="text-muted-foreground mb-6">{t.errorMessage}</p>
            <Button onClick={handleClose} className="bg-primary">
              {t.continue}
            </Button>
          </div>
        )}
        
        {!isLoading && !hasError && (
          <>
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                disabled={countdown > 0}
                className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 p-0 rounded-full"
              >
                {countdown > 0 ? countdown : <X className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-2xl font-bold text-muted-foreground mb-2">Advertisement</div>
                <div className="text-sm text-muted-foreground">300x250 Interstitial Ad Space</div>
                <div className="text-xs text-muted-foreground mt-4">
                  {countdown > 0 ? `Skip available in ${countdown}s` : 'Click X to skip'}
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default InterstitialAd;
