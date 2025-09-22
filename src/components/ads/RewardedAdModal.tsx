import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, AlertTriangle } from 'lucide-react';
import { useAds } from '@/contexts/AdContext';

interface RewardedAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  language: 'pt' | 'es' | 'en';
  targetLevel: 2 | 3;
}

const translations = {
  en: {
    title: "Ready for the next level?",
    description: "Watch a short ad to unlock it now.",
    watchAd: "Watch Ad",
    cancel: "Cancel",
    errorTitle: "Ad Error",
    errorMessage: "The ad didn't load. Try again?",
    retry: "Retry",
    maybeLater: "Maybe later",
    loading: "Loading ad..."
  },
  es: {
    title: "¿Listo para el siguiente nivel?",
    description: "Mira un anuncio corto para desbloquearlo ahora.",
    watchAd: "Ver Anuncio",
    cancel: "Cancelar",
    errorTitle: "Error de Anuncio",
    errorMessage: "El anuncio no se cargó. ¿Intentar de nuevo?",
    retry: "Reintentar",
    maybeLater: "Tal vez más tarde",
    loading: "Cargando anuncio..."
  },
  pt: {
    title: "Pronto para o próximo nível?",
    description: "Assista a um anúncio curto para desbloqueá-lo agora.",
    watchAd: "Assistir Anúncio",
    cancel: "Cancelar",
    errorTitle: "Erro do Anúncio",
    errorMessage: "O anúncio não carregou. Tentar novamente?",
    retry: "Tentar Novamente",
    maybeLater: "Talvez mais tarde",
    loading: "Carregando anúncio..."
  }
};

export const RewardedAdModal = ({ isOpen, onClose, onSuccess, language, targetLevel }: RewardedAdModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const { unlockLevel, logEvent } = useAds();
  const t = translations[language];

  const handleWatchAd = async () => {
    console.log('handleWatchAd called', { targetLevel });
    setIsLoading(true);
    logEvent('ad_rewarded_started', { targetLevel });

    try {
      // Simulate ad loading and completion
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure (90% success rate for demo)
      if (Math.random() > 0.1) {
        console.log('Ad completed successfully, unlocking level', targetLevel);
        unlockLevel(targetLevel);
        logEvent('ad_rewarded_complete', { targetLevel });
        onSuccess();
        onClose();
      } else {
        throw new Error('Ad failed to complete');
      }
    } catch (error) {
      console.log('Ad failed:', error);
      logEvent('ad_rewarded_error', { targetLevel, error: error.message });
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setShowError(false);
    handleWatchAd();
  };

  if (showError) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              {t.errorTitle}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t.errorMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center space-x-4">
            <Button onClick={handleRetry} className="bg-primary">
              {t.retry}
            </Button>
            <Button onClick={onClose} variant="outline">
              {t.maybeLater}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t.title}</DialogTitle>
          <DialogDescription className="text-center">
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center space-x-4">
          <Button 
            onClick={handleWatchAd} 
            disabled={isLoading}
            className="bg-primary"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {t.loading}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {t.watchAd}
              </>
            )}
          </Button>
          <Button onClick={onClose} variant="outline" disabled={isLoading}>
            {t.cancel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};